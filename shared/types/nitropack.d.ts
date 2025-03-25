import 'nitropack'

declare module 'nitropack' {
    interface NitroApp {
        kafka: Kafka;
        kafkaProducer?: Kafka['producer'];
        kafkaConsumer?: Kafka['consumer'];
    }
}