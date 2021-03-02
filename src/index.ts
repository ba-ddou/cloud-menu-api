import schema from './schema'
import { ApolloServer } from 'apollo-server'


const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true
});


server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});