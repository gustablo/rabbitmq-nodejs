import { useRabbitMQ } from './infra/rabbitmq';

async function main() {
    const { bind, send } = await useRabbitMQ();

    const channel = await bind('test-queue');

    channel.consume('test-queue', msg => {
        if (msg !== null) {
            console.log('received:', msg.content.toString());
            channel.ack(msg);
        }
    });

    await send('test-queue', 'hello world');
}

main();
