import inquirer from "inquirer";
//type: 'list',   name: ' ‘.  message: ' ', choices: ['','','' ]
//type: * input, number , confirm , list, rawest, checkbox, password

let todos = [];

function addTodo() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'task',
        message: '새로운 할 일을 입력하세요: ',
      },
    ])
    .then((answer) => {
      const newTodo = {
        task: answer.task,
        completed: false,
      };
      todos.push(newTodo);
      console.log(`"${answer.task}" 항목이 추가되었습니다.`);
      askUser();
    });
}

function listTodos() {
  console.log('----- 할 일 목록 -----');
  todos.forEach((todo, index) => {
    const status = todo.completed ? '[v]' : '[ ]';
    console.log(`${index + 1}. ${status} ${todo.task}`);
  });
  askUser();
}

function completeTodo() {
  inquirer
    .prompt([
      {
        type: 'number',
        name: 'index',
        message: '완료 처리할 항목의 번호를 입력하세요: ',
      },
    ])
    .then((answer) => {
      const index = answer.index - 1;
      if (index >= 0 && index < todos.length) {
        todos[index].completed = true;
        console.log(`"${todos[index].task}" 항목이 완료 처리되었습니다.`);
      } else {
        console.log('잘못된 번호를 입력하셨습니다.');
      }
      askUser();
    });
}

function askUser() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: '다음 중 하나를 선택하세요:',
        choices: [
          { name: '새로운 할 일 추가', value: addTodo },
          { name: '할 일 목록 출력', value: listTodos },
          { name: '할 일 완료 처리', value: completeTodo },
          { name: '종료', value: () => console.log('안녕히 가세요!') },
        ],
      },
    ])
    .then((answer) => {
      answer.action();
    });
}

askUser();
