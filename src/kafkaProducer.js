const { Kafka } = require('kafkajs');
const getJsonData = require('../src/dataProcessor');
const config = require('./kafkaConfig');

async function Produce() {
    var json = getJsonData();

    const kafka = new Kafka(config);
    const producer = kafka.producer();
    let topic = config.kafka_topic;

    try {
        await producer.connect();
        console.log('connected!');

        json.data.forEach(element => {
            console.log("Started iterating over json...");
            (async () => {
                await producer.send({
                        topic: topic,
                        messages: [ { value: JSON.stringify(element) } ]
                    });
                      
            })().catch(console.error); 
        });
    }
    catch (error) {
        console.log('failed on insert');
        console.log(error);
        throw "err";
    }
    finally {
        await producer.disconnect();
        console.log("disconnected!");
    }
}

(async () => {
   await Produce();
   })(); 