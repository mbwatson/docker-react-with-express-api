import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApiTest from './components/ApiTestCard'

class App extends Component {
    render() {
        return (
            <div>
                <img src={logo} className="App-logo" alt="logo" />
                <div className="App">
                    <ApiTest endpoint="http://localhost:3030/test" />
                </div>
            </div>
        );
    }
}

export default App;
