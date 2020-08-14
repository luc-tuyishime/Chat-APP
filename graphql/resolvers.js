const { User } = require("../models");
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
    }
};
