
// #!/usr/bin/env node

const excute = require('../src/index');
const commander = require('commander');

/* program.version('v' + require('../package.json').version, '-v, --version')
  .command('create-project <templateName> <projectName>')
  .arguments('<templateName>')
  .arguments('<projectName>')
  .alias('cp')
  .description('create new reactTemplate myProject')
  .action(function (__templateName, projectName) {
    console.log("文件成功生成");
  }) */

const program = new commander.Command('create-project')
  .version('v' + require('../package.json').version, '-v, --version')
  .arguments('<templateName>')
  .arguments('<projectName>')
  .alias('cp')
  .description('create new reactTemplate myProject')
  .action(function (__templateName, projectName) {
    console.log(__templateName, projectName, "文件成功生成");
  });

program.parse(process.argv)


/* if (program.args.length === 0) {
  console.log(program);
  program.help()
} */