const playwright = require('playwright');
const fs = require('fs').promises;
const path = require('path');

async function navigateAndScreenshot(url, environment, dimensions){
    console.log(environment)
    const browser = await playwright[environment].launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.setViewportSize(dimensions);

    await page.goto(url);
    await page.screenshot({ path: `./storage/navigateAndScreenshot/${environment}-${dimensions.width}x${dimensions.height}.png` });
    await browser.close();

    return 'data:image/png;base64,' + await fs.readFile(path.join(__dirname, `../storage/navigateAndScreenshot/${environment}-${dimensions.width}x${dimensions.height}.png`), 'base64')
}  

module.exports = navigateAndScreenshot;