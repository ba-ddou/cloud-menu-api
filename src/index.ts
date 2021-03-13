import schema from './schema'
import { ApolloServer } from 'apollo-server'
import * as mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/cloudMenuDb', {useNewUrlParser: true, useUnifiedTopology: true});

const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true
});


server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});