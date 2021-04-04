import schema from './schema'
import { ApolloServer } from 'apollo-server'
import { config } from 'dotenv'
import { connect } from './mongooseConnection'
config();
const {
    PORT,
} = process.env;

connect();

const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true
});


server.listen({ port: PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});