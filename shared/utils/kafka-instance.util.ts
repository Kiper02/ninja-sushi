import type { NitroApp } from 'nitropack'

let nitroApp: NitroApp

export function setNitroApp(app: NitroApp) {
    nitroApp = app
}

export function getKafkaProducer() {
    return nitroApp.kafkaProducer
}

export function getKafkaConsumer() {
    return nitroApp.kafkaConsumer
}