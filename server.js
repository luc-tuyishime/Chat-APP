const { ApolloServer, gql } = require("apollo-server");

// The GraphQL schema (Routes)
const typeDefs = gql`
    type User {
        username: String!
        email: String!
    }

    type Query {
        getUsers: [User]!
    }
`;

// A map of functions which return data for the schema. (Handler of the routes)
const resolvers = {
    Query: {
        getUsers: () => {
            const users = [
                {
                    username: "lucas",
                    email: "lucas@gmail.com"
                },
                {
                    username: "samantha",
                    email: "samantha@gmail.com"
                }
            ];

            return users;
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
