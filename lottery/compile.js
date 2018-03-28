// inbox/compile.js

//helps build a path between compile.js to Inbox.sol with cross-platform
const path = require('path');
//  fs = file system module
const fs = require('fs');

//  solidity compiler
const solc = require('solc');



//__dirname is a Node constant or current working dir
const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');

//  utf8 file encoding
const source = fs.readFileSync(lotteryPath, 'utf8');

//  compile the inbox contract. 1 = number of contracts to compile

// { contracts:
//   { ':Inbox':
//      { assembly: [Object],

module.exports = solc.compile(source, 1).contracts[':Lottery'];
