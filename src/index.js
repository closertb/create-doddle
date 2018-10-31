const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const utils = require('./utils');

const red = chalk.red;
const green = chalk.green;
const { currentPath, downloadByNpm } = utils;
let forceDel = false;
let tempName;
let projectName;

// 重写package.json
async function rewriteJson() {
  try {
    const path = currentPath + projectName + '/package.json';
    const isExist = await fs.pathExists(path);
    if (!isExist) {
      return;
    }
    const json = await fs.readJson(path);
    json.name = projectName;
    json.description = `this project is based on ${tempName}`;
    await fs.writeJson(path, json, { spaces: '\t' });
    console.log(green('format package.json success!'));
  } catch (err) {
    console.error(red(err));
  }
}

// 删除不相关的文件
async function unrelatedFileRemove(parentFile, callback) {
  try {
    await fs.remove(parentFile + '/.git');
    await fs.remove(parentFile + '/package-lock.json');
    callback && callback();
    rewriteJson();
    console.log(green('remove unrelated file success!'));
  } catch (err) {
    console.error(red(err));
  }
}

// 重命名gitClone下来的文件为项目文件名
async function renameFile() {
  const oldPath = currentPath + tempName;
  const nowPath = currentPath + projectName;
  try {
    await fs.rename(oldPath, nowPath);
    unrelatedFileRemove(nowPath);
  } catch (error) {
    console.error(red(error));
  }
}

async function create(temp, project, force = false) {
  tempName = temp;
  projectName = project;
  forceDel = force;
  const file = currentPath + projectName;
  try {
    const res = await fs.pathExists(file);
    if (res) {
      console.log(chalk.red('Error, In this directory, the file name already exsits !'));
      return;
    }
    const tempExists = await fs.pathExists(currentPath + tempName);
    if (tempExists) {
      if (forceDel) {
        console.log(green('remove first and download again'));
        await fs.remove(tempExists);
        downloadByNpm(renameFile, tempName);
      } else {
        console.log(green('rename'));
        renameFile();
      }
    } else {
      console.log(green('download and copy'));
      downloadByNpm(renameFile, tempName);
    }
  } catch (err) {
    console.error(red(err));
  }
}


module.exports = create;