const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { UserInputError } = require("apollo-server");
// A map of functions which return data for the schema. (Handler of the routes)

module.exports = {
    Query: {
        getUsers: async () => {
            try {
                const users = await User.findAll();
                return users;
            } catch (e) {
                console.log(e);
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
