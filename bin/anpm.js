#!/usr/bin/env node

/**
* anpm.js
*/

var program = require('commander');
var path = require('path');
var fs = require('fs');

program
  .version('0.0.1')
  .parse(process.argv);

// console.log(program.args);

const spawn = require('child_process').spawn;
const apm = spawn('apm', program.args);

apm.stdout.on('data', (data) => {
  console.log(`${data}`);
});

apm.stderr.on('data', (data) => {
  console.log(`${data}`);
});

apm.on('close', (code) => {
  console.log(`------\napm exited with code ${code}`);

  if (code === 0) {
    const spawn2 = require('child_process').spawn;
    const myPackagesFilePath = path.join(process.env['HOME'], '.atom', 'my-packages.txt');
    const updateMyPackages = spawn('apm', ['list', '--installed', '--bare']);
    updateMyPackages.stdout.on('data', (data2) => {
      console.log(`${data2}`);
      fs.writeFile(myPackagesFilePath, data2);
    });
    updateMyPackages.stderr.on('data', (data2) => {
      console.log(`${data2}`);
    });
    updateMyPackages.on('close', (code2) => {
      console.log(`------\napm exited with code ${code2}`);
    });
  }
});
