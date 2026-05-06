const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'ui', 'popup');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.vue'));

const oldStr = 'class="p-1.5 rounded-md cursor-pointer transition-all"';
const newStr = 'class="p-1.5 rounded-md cursor-pointer transition-all focus:outline-none hover:!bg-transparent"';

files.forEach(f => {
  const fp = path.join(dir, f);
  let content = fs.readFileSync(fp, 'utf8');
  if (content.includes(oldStr)) {
    content = content.split(oldStr).join(newStr);
    fs.writeFileSync(fp, content);
    console.log('Fixed:', f);
  } else {
    console.log('Skip:', f);
  }
});

console.log('Done!');
