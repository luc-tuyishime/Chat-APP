const userResolvers = require("./users");
const messageResolvers = require("./messages");

module.exports = {
    Message: {
        createdAt: (parent) => parent.createdAt.toISOString() // Format dates on Messages
    },
    // User: {
    //     createdAt: (parent) => parent.createdAt.toISOString() // Format dates on Users
    // },
    Query: {
        ...userResolvers.Query,
        ...messageResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...messageResolvers.Mutation
    }
};
