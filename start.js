const Produce = require('./src/kafkaProducer');

(async () => {
    await Produce();
    })().catch(console.error);
