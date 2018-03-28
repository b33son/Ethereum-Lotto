// lottery-react/src/web3.js

import Web3 from 'web3';

// use the provider created by Metamask chrome extension
// preconfigured to connect to Rinkeby. Has access to accounts
const web3 = new Web3(window.web3.currentProvider);

export default web3;