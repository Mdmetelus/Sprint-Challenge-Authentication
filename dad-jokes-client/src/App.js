import React, { Component } from 'react';
import { NavLink, Route }from 'react-router-dom';
import Home from './components/Home';
import Jokes from './components/Jokes';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <nav>
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/jokes">Jokes</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>

          </nav>

          <main>
            <Route path="/" component={Home} />
            <Route path="/jokes" component={Jokes} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </main>
        
        </header>
      </div>
    );
  }
}

export default App;
