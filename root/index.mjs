//! CLI 
// npm install commander 모듈 설치
// git & pakahe.json 사용 및 활용 
import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';

const ROOT_TAG_CHOICES = ['<div id="root"></div>', ''];
const DEFAULT_TITLE = 'My HTML File';

program
  .option('-t, --title <title>', 'title of HTML file')
  .option('--no-root-tag', 'exclude the root tag in HTML body')
  .arguments('<content>')
  .action((content) => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'filename',
          message: '파일명을 입력하세요:',
        },
      ])
      .then((answers) => {
        const filename = answers.filename;
        const title = program.title || DEFAULT_TITLE;
        const rootTag = program.rootTag ? ROOT_TAG_CHOICES[0] : ROOT_TAG_CHOICES[1];

        const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title}</title>
          </head>
          <body>
            ${rootTag}
            <p>${content}</p>
          </body>
        </html>
        `;

        const dir = './result';
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }

        const filepath = `${dir}/${filename}.html`;

        fs.writeFile(filepath, html, (err) => {
          if (err) throw err;
          console.log(`파일이 생성되었습니다: ${filepath}`);
        });
      });
  });

program.parse(process.argv);