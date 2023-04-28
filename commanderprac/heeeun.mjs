import { Command } from 'commander';

const program = new Command();

program
.command('hello')
.description('Outputs "Hello, World!"')
.action(() => console.log('Hello, World!'));

program.parse(process.argv);