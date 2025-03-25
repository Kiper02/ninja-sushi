import { Kafka } from 'kafkajs';

export default defineNitroPlugin((nitroApp) => {
    const kafka = new Kafka({
        clientId: 'ninja-sushi',
        brokers: ['localhost:9092', 'localhost:9094', 'localhost:9096']
    });

    nitroApp.kafka = kafka;
    nitroApp.kafkaProducer = kafka.producer();
    nitroApp.kafkaConsumer = kafka.consumer({ groupId: 'ninja-group' });

    nitroApp.hooks.hook('close', async () => {
        await nitroApp.kafkaProducer?.disconnect();
        await nitroApp.kafkaConsumer?.disconnect();
    });
});