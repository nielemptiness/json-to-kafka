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


        for (const key in json.data) {
            if (Object.hasOwnProperty.call(json.data, key)) {
                const element = json.data[key];
                await producer.send({
                    topic: topic,
                    messages: [ 
                        { 
                            key: JSON.stringify(element.key),
                            value: JSON.stringify(element.value) 
                        } 
                    ]
                }); 
                console.log("wrote elem with key " + element.key);
            }
        }
    }
    catch (error) {
        console.log('failed on insert');
        console.log(error);
    }
    finally {
        await producer.disconnect();
        console.log("disconnected!");
    }
}

module.exports = Produce; 