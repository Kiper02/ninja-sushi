export interface IProducerMessage {
    message: IMessage[];
}

interface IMessage {
    value: string;
}