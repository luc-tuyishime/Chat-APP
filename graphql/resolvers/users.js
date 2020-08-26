const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const { JWT_SECRET } = require("../../config/env.json");

// A map of functions which return data for the schema. (Handler of the routes)

module.exports = {
    Query: {
        getUsers: async (_, __, { user }) => {
            try {
                if (!user) throw new AuthenticationError("Unauthenticated");

                const users = await User.findAll({
                    where: { username: { [Op.ne]: user.username } }
                });
                return users;
            } catch (e) {
                console.log(e);
                throw e;
            }
        },
        login: async (_, args) => {
            const { username, password } = args;
            let errors = {};
            try {
                if (username.trim() === "")
                    errors.username = "username must not be empty";
                if (password === "") errors.password = "password must not be empty";

                if (Object.keys(errors).length > 0) {
                    throw new UserInputError("Bad input", { errors });
                }

                const user = await User.findOne({
                    where: { username }
                });

                if (!user) {
                    errors.username = "User not found";
                    throw new UserInputError("user not found", { errors });
                }

                const correctPassword = await bcrypt.compare(password, user.password);
                if (!correctPassword) {
                    errors.password = "password is incorrect";
                    throw new UserInputError("Password is incorrect", { errors });
                }

                const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

                return {
                    ...user.toJSON(),
                    createdAt: user.createdAt.toISOString(),
                    token
                };
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    },
    Mutation: {
        register: async (_, args) => {
            let { username, email, password, confirmPassword } = args;
            let errors = {};

            try {
                // TODO: Validate Input data
                if (email.trim() === "") errors.email = "Email must not be empty";
                if (username.trim() === "")
                    errors.username = "Username must not be empty";
                if (password.trim() === "")
                    errors.password = "Password must not be empty";
                if (confirmPassword.trim() === "")
                    errors.confirmPassword = "Repeat password must not be empty";

                if (password !== confirmPassword)
                    errors.confirmPassword = "Passwords must match";

                // TODO: Check if username / Email exist
                // const userByUsername = await User.findOne({ where: { username } });
                // const userByEmail = await User.findOne({ where: { email } });

                // if (userByUsername) errors.username = "User is taken";
                // if (userByEmail) errors.email = "Email is taken";

                if (Object.keys(errors).length > 0) {
                    throw errors;
                }

                // Hash Password
                password = await bcrypt.hash(password, 6);

                // Create User
                const user = await User.create({
                    username,
                    email,
                    password
                });

                // TODO: Return user
                return user;
            } catch (err) {
                if (err.name === "SequelizeUniqueConstraintError") {
                    err.errors.forEach(
                        (e) => (errors[e.path] = `${e.path} is already taken`)
                    );
                } else if (err.name === "SequelizeValidationError") {
                    err.errors.forEach((e) => (errors[e.path] = e.message));
                }
                throw new UserInputError("Bad input", { errors });
            } // Try and Catch because we are doing some async stuff
        }
    }
};
