const crossSpawn = require('cross-spawn');
const spawn = crossSpawn.sync;
const chalk = require('chalk');
const red = chalk.red;
const green = chalk.green;

function isWindows() {
  if (typeof process === 'undefined' || !process) {
    return false;
  }
  return process.platform === 'win32' || process.env.OSTYPE === 'cygwin' || process.env.OSTYPE === 'msys';
}

function getNpmPrefix() {
  const result = spawn(
    'npm',
    ['config', 'get', 'prefix']
  );
  const stdout = result.stdout;
  const error = result.error;
  if (error) {
    console.log(red(error));
    return;
  }
  return stdout.toString().trim();
}

function downloadByNpm(callback, template) {
  console.log(green('start download'));
  console.log(`git@github.com:closertb/${template}.git`);
  const result = spawn(
    'git',
    ['clone', `git@github.com:closertb/${template}.git`],
    { stdio: 'inherit' }
  );
  const error = result.error;
  if (error) {
    console.log(red(error));
    return;
  }
  callback && callback();
}
const currentPath = process.cwd().replace(/\\/g, '/') + '/';


module.exports = {
  downloadByNpm,
  isWindows,
  currentPath,
};