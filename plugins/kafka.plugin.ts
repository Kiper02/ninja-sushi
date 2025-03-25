import { Kafka } from 'kafkajs';

export default defineNuxtPlugin(async (nuxtApp) => {
    const kafka = new Kafka({
        clientId: 'ninja-sushi',
        brokers: [`PLAINTEXT://kafka:29092`],
    });

    const producer = kafka.producer();
    const consumer = kafka.consumer({ groupId: 'ninja-sushi' });

    await producer.connect();
    await consumer.connect();

    console.log('Kafka connected');

    nuxtApp.provide('kafka', {
        producer,
        consumer,
    });

    nuxtApp.hook('app:error', async () => {
        await producer.disconnect();
        await consumer.disconnect();
        console.log('Kafka disconnected');
    });
});