// inbox/deploy.js

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  "relief drift focus position maze jump argue brand welcome sword horn normal",
  "https://rinkeby.infura.io/7UFOqzP5nOuSOUL53akU"
);

const web3 = new Web3(provider);

//  a function is required in order to use the 
//  async await format rather than a promise
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from accounts[0]: ", accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  console.log(interface);
  console.log("Contract deployed to ", result.options.address);
};
deploy();