'use strict';

// pug-cli の代替。github:pugjs/pug-cli#master を参照する回避策を取って
// いたが、それでもpug@2系に固定されたままでセキュリティ修正版(3.x)へ
// 上げられていなかったため撤去した。
// index.pug を build/index.html へレンダリングする(README.md の
// include:markdown-it 経由の変更も追うため、リポジトリ直下を監視する)。

const fs = require('fs');
const path = require('path');
const pug = require('pug');

const FILE = path.join(__dirname, 'index.pug');
const OUT = path.join(__dirname, 'build', 'index.html');

const watch = process.argv.includes('--watch');
const pretty = process.argv.includes('--pretty');

function build() {
  try {
    const html = pug.renderFile(FILE, { pretty });
    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    fs.writeFileSync(OUT, html);
    console.log('  rendered ' + OUT);
  } catch (e) {
    console.error(e.stack || e.message || e);
  }
}

build();

if (watch) {
  console.log('  watching ' + __dirname);
  fs.watch(__dirname, { recursive: true }, (eventType, filename) => {
    if (filename && (filename.endsWith('.pug') || filename.endsWith('.md'))) {
      build();
    }
  });
}
