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

        json.data.forEach(element => async () => {
            console.log("Started iterating over json...");
            //(async () => {
                await producer.send({
                        topic: topic,
                        messages: [ 
                            { 
                                key: element.key,
                                value: JSON.stringify(element.value) 
                            } 
                        ]
                    });
                      
            //})(); 
        });
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