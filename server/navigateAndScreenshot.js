const playwright = require('playwright');

async function navigateAndScreenshot(url, environment, dimensions){
    const browser = await playwright[environment].launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.setViewportSize(dimensions);

    await page.goto(url);
    await page.screenshot({ path: `./storage/navigateAndScreenshot/${environment}-${dimensions.width}x${dimensions.height}.png` });
    await browser.close();

    return `/storage/navigateAndScreenshot/${environment}-${dimensions.width}x${dimensions.height}.png`
}  

module.exports = navigateAndScreenshot;