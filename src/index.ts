import schema from './schema'
import { ApolloServer } from 'apollo-server'
import * as mongoose from 'mongoose'
import { config } from 'dotenv'
config();
const {
    PORT,
    LOCAL_DB,
    ATLAS_DB
} = process.env;

mongoose.connect(ATLAS_DB, {useNewUrlParser: true, useUnifiedTopology: true});

const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true
});


server.listen({ port: PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});