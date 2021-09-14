
const kafkaConfig = {
    clientId: 'jsonToKafka',
    kafka_topic: 'topic-test', //yourtopic
    brokers: ['localhost:9092'],
    connectionTimeout: 3000,
    authenticationTimeout: 1000,
    reauthenticationThreshold: 10000,
    };

module.exports = kafkaConfig;