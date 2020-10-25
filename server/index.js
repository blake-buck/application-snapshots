async function runTest(url, environment, dimensions, scriptFile){
    const script = require('./scripts/' + scriptFile);

    return await script(url, environment, dimensions);
}

// runTest('https://row-board-task.com', 'chromium', {width:1200, height:800}, 'navigateAndScreenshot');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('/storage'));

app.post('/test-script/run', async (req, res) => {
    const {url, environment, dimensions, scriptFile} = req.body;
    const results = await runTest(url, environment, dimensions, scriptFile);
    res.status(200).send({results});
});

app.post('/test-script/run/collection', async (req, res) => {
    // console.log(req.body);
    const {baseUrl, tests, devices} = req.body;
    let testResults = [];

    for(let i=0; i<tests.length; i++){
        const test = tests[i];
        for(let j=0; j< devices.length; j++){
            const device = devices[j];

            const {path, script} = test;
            const {width, height, environment} = device;
            console.log(baseUrl+path);
            testResults.push(runTest(baseUrl+path, environment, {width:+width, height:+height}, script));
        }
    }

    testResults = await Promise.all(testResults);

    console.log('TEST RESULTS');
    console.log(testResults);
    res.status(200).send({testResults});
})



app.listen(9090, () => console.log('listening on port 9090'));