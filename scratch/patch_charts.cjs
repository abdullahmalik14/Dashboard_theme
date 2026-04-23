const fs = require('fs');
const path = 'd:/projects/Dashboard_theme/public/chartsHandler.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Auto-instantiation at the end
if (!content.includes('window.chartsHandler = new ChartsHandler()')) {
    content += '\n\n// Auto-instantiate the singleton\nwindow.chartsHandler = new ChartsHandler();\n';
}

// 2. Config merge in renderChartInstance
// Match: await this.instantiateChart(chartInstanceId, chartHostElement, {
//        styleConfig,
const regex = /(await this\.instantiateChart\(chartInstanceId, chartHostElement, \{[\r\n\s]+)styleConfig,/g;
content = content.replace(regex, '$1styleConfig: Object.assign({}, baseConfig, styleConfig),');

// 3. Fix the destructuring mess if any (just in case)
content = content.replace(/styleConfig: Object\.assign\(\{\}, baseConfig, styleConfig\),/g, (match, offset, str) => {
    // If it's inside a const { ... } = chartContext, fix it back
    const slice = str.substring(offset - 100, offset);
    if (slice.includes('const {')) {
        return 'styleConfig,';
    }
    return match;
});

fs.writeFileSync(path, content);
console.log('Successfully patched chartsHandler.js');
