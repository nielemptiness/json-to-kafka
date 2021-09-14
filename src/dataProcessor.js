const { readFileSync } = require('fs');
const path = require('path');
const jsonPath = 'src/inputData.json';

function getJsonData() {

    var fileLoc = path.resolve(jsonPath);
    let rawdata = readFileSync(fileLoc, 'utf8');
    
    if(rawdata == null) throw "can't get input data!";

    let data = JSON.parse(rawdata);
    
    if(data == null) throw "can't parse json!"

    return data;
};

module.exports = getJsonData;
