//  lottery-react/src/App.js

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    // the provider from Metamask does not require us to specify
    // where the call is from. Uses the default account in Metamask
    // from: accounts[0] is not required

    await this.updateStatus();
  }

  updateStatus = async () => {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState(
      {
        manager: manager,
        players: players,
        balance: balance,
      });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ message: "Waiting on transaction success.." });

    // enter user into lottery
    // NOTE: web3 requires the account address to be used when sending ether
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: "You have been entered!" });

    await this.updateStatus();
  }

  onPickWinner = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "Waiting on transaction success" });
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    this.setState({ message: "A winner has been picked!" });

    await this.updateStatus();
  }

  render() {
    web3.eth.getAccounts().then(console.log);
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}.
        There are currently {this.state.players.length} entered,
        competing to win {web3.utils.fromWei(this.state.balance, "ether")} ether.
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })} />
            <button>Enter</button>
          </div>
        </form>
        <hr />
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onPickWinner}>Pick a winner</button>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
