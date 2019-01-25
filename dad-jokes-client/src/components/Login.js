import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    state = {
        username: '',
        password: '',
        error: '',
    };
    
    handleInputChange = event => {
          const { name, value } = event.target;
  
          this.setState({ [name]: value });
    };
    
    handleSubmit = event => {
          event.preventDefault();
  
          const endpoint = `${process.env.REACT_APP_API_URL}/api/login`;
  
          axios
              .post(endpoint, this.state)
              .then(res => {
                  localStorage.setItem('jwt', res.data.token);
              })
              .catch(err => console.err(err));
    };
    
  
    componentDidMount() {
        const endpoint = `${process.env.REACT_APP_API_URL}/api/login`;
  
      axios.get(endpoint).then(res=> {
          console.log(res.data);
  
      }).catch(err=> {
          console.error('ERROR', err);
      })
  }
  
  
  
    render() {
      return (
        <div className="Login">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlfor='username'>Username</label>
            <input name="username"
              value={this.state.username}
              placeholder="Username"
                          onChange={this.handleInputChange}
                          type="text"/></div>
  
          <div>
            <label htmlfor='password'>Password</label>
            <input name="password"
                          value={this.state.password}
                          onChange={this.handleInputChange}
                          type="password"
              placeholder="Password"/></div>
  
            <div><button type="submit">Login</button></div>
  
  
            
        </form>
          
        </div>
      );
    };
  }
  
  export default Login;
  