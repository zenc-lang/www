const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const tests = [
    { name: 'Videos Title', rx: /<h2 class="section-title">Community Videos<\/h2>/ },
    { name: 'Videos Desc', rx: /<p class="section-desc">Watch tutorials, reviews, and deep-dives created by the Zen C community\.<\/p>/ },
    { name: 'Roadmap Title', rx: /<h2 class="section-title">The Path Forward<\/h2>/ },
    { name: 'Sponsors Title', rx: /<h2 class="section-title">Sustain the Project<\/h2>/ }
];

for (const t of tests) {
    const match = html.match(t.rx);
    console.log(`${t.name}: ${match ? 'MATCH' : 'FAIL'}`);
}
