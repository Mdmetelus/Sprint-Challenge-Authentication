import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';


class Users extends Component {
    state ={
        jokes: []
    }


    async componentDidMount() {
        const endpoint = `${process.env.REACT_APP_API_URL}/api/jokes`;

        console.log('endpoint', endpoint);
        
        try {
            const token = localStorage.getItem('jwt');
            const requestOptions = {
                headers: {
                    authorization: token,
                },
            };
            const response = await axios.get(endpoint, requestOptions);
            this.setState({ joked: response.data.joke, 
                // newId: uuid() 
            });


        } catch (error) {
            console.error('we ran into an issue getting the jokes');
        }
    }


  render() {
    return (
      <div className="usersList">
      <h2>List of Users</h2>
      <ul>
          {this.state.map(u => (
              <li key={u.id}>{u.joke}</li>
          ))}
      </ul>
        
      </div>
    );
  }
}

export default Users;