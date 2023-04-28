import inquirer from 'inquirer';

// 할 일 목록을 저장할 배열
let todos = [];

// 새로운 할 일을 추가하는 함수
async function addTodo() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'task',
      message: '새로운 할 일을 입력하세요: ',
    },
  ]);
  const newTodo = {
    task: answer.task,
    completed: false,
  };
  todos.push(newTodo);
  console.log(`"${answer.task}" 항목이 추가되었습니다.`);
}

// 등록된 모든 할 일을 출력하는 함수
function listTodos() {
  console.log('----- 할 일 목록 -----');
  todos.forEach((todo, index) => {
    const status = todo.completed ? '[v]' : '[ ]';
    console.log(`${index + 1}. ${status} ${todo.task}`);
  });
}

// 특정 할 일을 완료 처리하는 함수
async function completeTodo() {
  const answer = await inquirer.prompt([
    {
      type: 'number',
      name: 'index',
      message: '완료 처리할 항목의 번호를 입력하세요: ',
    },
  ]);
  const index = answer.index - 1;
  if (index >= 0 && index < todos.length) {
    todos[index].completed = true;
    console.log(`"${todos[index].task}" 항목이 완료 처리되었습니다.`);
  } else {
    console.log('잘못된 번호를 입력하셨습니다.');
  }
}

// 특정 할 일을 삭제하는 함수
async function deleteTodo() {
  const answer = await inquirer.prompt([
    {
      type: 'number',
      name: 'index',
      message: '삭제할 항목의 번호를 입력하세요: ',
    },
  ]);
  const index = answer.index - 1;
  if (index >= 0 && index < todos.length) {
    const deletedTodo = todos.splice(index, 1)[0];
    console.log(`"${deletedTodo.task}" 항목이 삭제되었습니다.`);
  } else {
    console.log('잘못된 번호를 입력하셨습니다.');
  }
}

// 사용자로부터 입력을 받아 기능을 실행하는 함수
async function askUser() {
  while (true) {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'command',
        message: '원하는 기능을 선택하세요: ',
        choices: ['추가하기', '목록보기', '완료하기', '삭제하기', '종료하기'],
      },
    ]);
    switch (answer.command) {
      case '추가하기':
        await addTodo();
        break;
      case '목록보기':
        listTodos();
        break;
      case '완료하기':
        await completeTodo();
        break;
      case '삭제하기':
        await deleteTodo();
        break;
      case '종료하기':
        console.log('프로그램을 종료합니다.');
        return;
    }
  }
}

askUser();