async function runTest(url, environment, dimensions, scriptFile, deviceName, testName){
    const script = require('./scripts/' + scriptFile);

    return await script(url, environment, dimensions, deviceName, testName);
}

const fs = require('fs').promises;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('/storage'));

app.post('/test-script/run', async (req, res) => {
    const {url, environment, dimensions, scriptFile} = req.body;
    const results = await runTest(url, environment, dimensions, scriptFile);
    res.status(200).send({testResults:[results]});
});

app.post('/test-script/run/collection', async (req, res) => {
    const {baseUrl, tests, devices} = req.body;
    let testResults = [];

    for(let i=0; i<tests.length; i++){
        const test = tests[i];
        for(let j=0; j< devices.length; j++){
            const device = devices[j];

            const {path, script} = test;
            const {width, height, environment} = device;
            testResults.push(runTest(baseUrl+path, environment, {width:+width, height:+height}, script, device.name, test.name));
        }
    }

    testResults = await Promise.all(testResults);

    res.status(200).send({testResults});
});

app.get('/test-suites', async (req, res) => {
    const suites = await fs.readFile('./storage/suites/suites.json', {encoding:'utf8'});
    console.log(suites);
    res.status(200).json(suites)
});
app.get('/test-suite/:id', async (req, res) => {
    
});
app.post('/test-suite');
app.put('/test-suite/:id');
app.delete('/test-suite/:id');

app.listen(9090, () => console.log('listening on port 9090'));