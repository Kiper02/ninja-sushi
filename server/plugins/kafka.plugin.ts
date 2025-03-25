import { Kafka } from 'kafkajs'
import { setNitroApp } from "#shared/utils/kafka-instance.util";

export default defineNitroPlugin(async (nitroApp) => {
    const kafka = new Kafka({
        clientId: 'ninja-sushi',
        brokers: ['localhost:9092', 'localhost:9094', 'localhost:9096']
    });

    const producer = kafka.producer();
    const consumer = kafka.consumer({ groupId: 'ninja-group' });

    nitroApp.kafka = kafka;
    nitroApp.kafkaProducer = producer;
    nitroApp.kafkaConsumer = consumer;
    setNitroApp(nitroApp);

    await producer.connect();
    await consumer.connect();

    await consumer.subscribe({ topic: 'payment-events-topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({topic, message}) => {
            if (!message.value) {
                console.error('Получено сообщение с пустым value');
                return;
            }

            const value = JSON.parse(message?.value.toString());
            if(topic === 'payment-events-topic') {
                // Приходит платеж и я вызываю контроллер обработки платежа
                console.log('ПЛАТЕЖКА', value);
            }
        }
    });

    nitroApp.hooks.hook('close', async () => {
        await producer.disconnect();
        await consumer.disconnect();
    });
});