import amqp from 'amqplib';
import type { Connection, Channel } from 'amqplib';

let connection: Connection;

const connect = async () => {
    if (connection) return;

    connection = await amqp.connect('amqp://rabbitmq:5672');
};

const bind = async (queue?: string) => {
    const channel = await connection.createChannel();

    if (queue) {
        await channel.assertQueue(queue);
    }

    return channel;
};

const unbind = async (channel: Channel) => {
    return channel.close();
}

const send = async (queue: string, content: string) => {
    const channel = await connection.createChannel();

    return channel.sendToQueue(queue, Buffer.from(content));
}

export const useRabbitMQ = async () => {
    await connect();

    return { bind, unbind, send };
};
