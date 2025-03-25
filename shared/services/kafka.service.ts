import { getKafkaProducer } from "#shared/utils/kafka-instance.util";

class KafkaService {
    public async sendMessage(topic: string, key: string, message: any): Promise<void> {
        const producer = getKafkaProducer();
        await producer.send({
            topic,
            messages: [{ key, value: JSON.stringify(message) }]
        });
    }
}

export default new KafkaService();