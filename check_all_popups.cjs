const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    
    await page.goto('http://localhost:5173/dashboard/orders', {waitUntil: 'networkidle0'});
    
    const clickElement = async (text) => {
       await page.evaluate(async (txt) => {
           const el = Array.from(document.querySelectorAll('span, div, h2, h3, p')).find(e => e.textContent.includes(txt));
           if(el) {
               const clickable = el.closest('div[class*="cursor-pointer"]') || el.parentElement;
               if(clickable) clickable.click();
           }
       }, text);
       await new Promise(r => setTimeout(r, 1000));
       
       // check for 'x' button or close button to close popup
       await page.evaluate(async () => {
           const closeBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerHTML.includes('svg'));
           // usually the last svg button or top right button
           const closeBtn = closeBtns.find(b => b.closest('.bg-white.rounded-xl'));
           if (closeBtn) closeBtn.click();
       });
       await new Promise(r => setTimeout(r, 1000));
    };

    console.log("Checking Total Earnings popup...");
    await clickElement('Total Earnings');
    
    console.log("Checking Subscribers popup...");
    await clickElement('Subscribers');

    console.log("Checking Fans popup...");
    await clickElement('Fans');

    console.log("Checking Contributors popup...");
    await clickElement('Contributors');

    console.log("Checking Likes popup...");
    await clickElement('Likes');

    console.log("All popups checked.");
    await browser.close();
})();
