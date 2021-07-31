import schema from './schema'
import { ApolloServer } from 'apollo-server-express'
import { config } from 'dotenv'
import { connect } from './mongooseConnection'
import authentication from './middlewares/authentication'
import * as express from 'express'
import * as cookieParser from 'cookie-parser'

config();
const {
    PORT,
} = process.env;

connect();

const server = new ApolloServer({
    schema,
    introspection: true,
    playground: {
        settings: {
            "request.credentials": "include"
        }
    },
    context: ({ req, res }) => {
        const { user } = req;
        console.log("🚀 ~ file: index.ts ~ line 26 ~ user", user);
        return { user, req, res }
    }
});
const app = express();
app.use(cookieParser());
app.use(authentication);
server.applyMiddleware({ app });

app.listen({ port: PORT || 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});

// server.listen({ port: PORT || 4000 }).then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
// });