import { Command } from 'commander';

const program = new Command();

program
.command('hello')
.description('Outputs "Hello, World!"')
.action(() => console.log('Hello, World!'));
// node heeeun.mjs hello 

program.parse(process.argv);

// commander 모듈을 사용하기. 
// Command 객체를 생성하고, program이라는 변수에 할당한다.
// program 객체의 command 메서드를 사용하여 hello라는 명령어를 등록했다
// description 메서드를 사용하여 해당 명령어에 대한 설명을 추가했다
// action 메서드를 사용하여 해당 명령어가 실행될 때 실행될 코드를 작성한다.
// 마지막으로 program 객체의 parse 메서드를 호출하여, 프로그램이 실행될 때 입력된 명령어와 인자를 파싱한다.

