const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    
    await page.goto('http://localhost:5173/dashboard/orders', {waitUntil: 'networkidle0'});
    
    // Evaluate in page
    await page.evaluate(async () => {
       const el = Array.from(document.querySelectorAll('span, div, h2, h3, p')).find(e => e.textContent.includes('Total Earnings'));
       if(el) {
           const clickable = el.closest('div[class*="cursor-pointer"]') || el.parentElement;
           if(clickable) clickable.click();
       }
    });
    
    await new Promise(r => setTimeout(r, 2000));
    await browser.close();
})();
