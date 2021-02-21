"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redis_1 = require("./redis");
const cors_1 = __importDefault(require("cors"));
const Buildschema_1 = __importDefault(require("./schema/Buildschema"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection().then(() => console.log('db connected'));
    const schema = yield Buildschema_1.default;
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
    });
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    app.use(cors_1.default({
        credentials: true,
        origin: 'http://localhost:1234',
    }));
    app.use(express_session_1.default({
        store: new RedisStore({
            client: redis_1.redis,
        }),
        name: 'qid',
        secret: 'asdfjkl;1234',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 365 * 1,
        },
    }));
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => console.log('live @ http://localhost:4000/graphql'));
}))();
