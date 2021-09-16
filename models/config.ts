import { createConnection, ConnectionOptions, Connection } from "typeorm";
import Business from "./business";
import Department from "./department";
import Permission from "./permission";
import Role from "./role";
import Content from "./manual/content";
import Manual from "./manual/manual";
import Policy from "./manual/policy";
import Section from "./manual/section";
import ManualAssignment from "./manual/manual_assignment";
import User from "./user/user";
import UserRole from "./user/user_role";
import DBLogger from "../util/logs/db_logger";
import Quiz from "./quiz/quiz";
import QuizSection from "./quiz/section";
import Question from "./quiz/question";
import Answer from "./quiz/answer";
import Attempt from "./quiz/attempt";
import Result from "./quiz/result";
import Read from "./manual/read";
import Event from "./event";
import dotenv from "dotenv";
dotenv.config();

export const connection: ConnectionOptions = {
    database: process.env.DB ?? "",
    host: process.env.DB_URL ?? "",
    username: process.env.DB_USER ?? "",
    password: process.env.DB_PWD ?? "",
    // enforce strict typing by only applying
    // a small subset of the potential database types
    type: (process.env.DB_TYPE as "mysql" | "postgres") ?? "",
    entities: [
        Business,
        User,
        Department,
        Permission,
        Role,
        UserRole,
        Manual,
        ManualAssignment,
        Section,
        Policy,
        Content,
        Quiz,
        QuizSection,
        Question,
        Answer,
        Attempt,
        Result,
        Read,
        Event,
    ],
    logging: true,
    logger: new DBLogger(),
};

export const devConnection: ConnectionOptions = {
    database: process.env.DB ? process.env.DB + "_dev" : "",
    host: process.env.DB_URL ?? "",
    username: process.env.DB_USER ?? "",
    password: process.env.DB_PWD ?? "",
    // enforce strict typing by only applying
    // a small subset of the potential database types
    type: (process.env.DB_TYPE as "mysql" | "postgres") ?? "",
    entities: [
        Business,
        User,
        Department,
        Permission,
        Role,
        UserRole,
        Manual,
        ManualAssignment,
        Section,
        Policy,
        Content,
        Quiz,
        QuizSection,
        Question,
        Answer,
        Attempt,
        Result,
        Read,
        Event,
    ],
    logging: true,
    logger: new DBLogger(),
};

export const testConnection: ConnectionOptions = {
    database: process.env.DB ? process.env.DB + "_test" : "",
    host: process.env.DB_URL ?? "",
    username: process.env.DB_USER ?? "",
    password: process.env.DB_PWD ?? "",
    // enforce strict typing by only applying
    // a small subset of the potential database types
    type: (process.env.DB_TYPE as "mysql" | "postgres") ?? "",
    entities: [
        Business,
        User,
        Department,
        Permission,
        Role,
        UserRole,
        Manual,
        ManualAssignment,
        Section,
        Policy,
        Content,
        Quiz,
        QuizSection,
        Question,
        Answer,
        Attempt,
        Result,
        Read,
        Event,
    ],
    logging: true,
    logger: new DBLogger(),
};

export default async (env?: "test" | "dev"): Promise<Connection> =>
    await createConnection(
        env === "test"
            ? testConnection
            : env === "dev"
            ? devConnection
            : connection
    );
