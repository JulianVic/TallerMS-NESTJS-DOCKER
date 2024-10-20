import "dotenv/config";
import * as joi from "joi";

interface EnvironmentVariables {
    PORT: number;
    NATS_SERVERS: string[];
}

const environmentSchema = joi.object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
}).unknown();

const { error, value } = environmentSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(","),
});

if(error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const environmentVariables: EnvironmentVariables = value;

export const environments = {
    port: environmentVariables.PORT,
    natsServers: environmentVariables.NATS_SERVERS,
}