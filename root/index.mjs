//! CLI command-line interface
//* .option등 익숙하지 않은것들 확인하기. 
// npm install commander.js 모듈 설치
// git & pakage.json 사용 및 활용 
import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';

const ROOT_TAG_CHOICES = ['<div id="root"></div>', ''];
const DEFAULT_TITLE = 'My HTML File';

program //! .option 등등 처음 봄  
//옵션으로 -t , —title  , —no—root-tag 정의,  인자  <content> 정의하기
  .option('-t, --title <title>', 'title of HTML file')
  .option('--no-root-tag', 'exclude the root tag in HTML body')
  .arguments('<content>')
  //  program.action() 메소드에서 inquirer를 사용하여서 사용자로부터 파일명 입력받기     
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
//현재 dir 경로에 result  이름의 폴더나 파일이 존재하지 않는지 확인한다.
// '!' 연사자를 사용해서 폴더가 존재하지 안흔 경우 true 로 변환된다. 
// fs.mkdirSync(dir);: fs.mkdirSync() 함수를 사용하여 dir 경로에 해당하는 폴더를 생성한다. //! <- 무슨 말일까?
// mkdirSync() 함수는 동기적으로 실행되어, 폴더를 생성하고 나서야 다음 코드로 진행한다. 

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