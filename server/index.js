async function runTest(url, environment, dimensions, scriptFile){
    const script = require('./' + scriptFile);

    return await script(url, environment, dimensions);
}

runTest('https://row-board-task.com', 'chromium', {width:1200, height:800}, 'navigateAndScreenshot');