import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class UserList extends Component {
    state = {
        error: '',
        allUsers: [],
        newUser: {
            user_name: '',
            email: '',
            password: ''
        },
        isUserFormDisplayed: false
    }

    componentDidMount(){
        this.fetchUsers();
    }

    fetchUsers = async () => {
        try {
            const res = await axios.get('/api/v1/users');
            this.setState({allUsers: res.data});
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    toggleUserForm = () => {
        this.setState((state, props) => {
            return ({ isUserFormDisplayed: !state.isUserFormDisplayed })
        })
    }

    handleChange = (e) => {
        const cloneNewUser = { ...this.state.newUser }
        cloneNewUser[e.target.name] = e.target.value
        this.setState({ newUser: cloneNewUser })
    }

    createUser = (e) => {
        e.preventDefault()
        axios
            .post('/api/v1/users/', {
                user_name: this.state.newUser.user_name,
                email: this.state.newUser.email,
                password: this.state.newUser.password
            })
            .then(res => {
                const usersList = [...this.state.allUsers]
                usersList.unshift(res.data)
                this.setState({
                    newUser: {
                        user_name: '',
                        email: '',
                        password: ''
                    },
                    isUserFormDisplayed: false,
                    allUsers: usersList
                })
            })
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <div className='subtitle'>Users List:</div>
                {
                    this.state.allUsers.map(user => (
                    <div className='subtitle' key={user.id}>
                        <Link to={`/user/${user.id}`} >{user.user_name}</Link>
                    </div>
                    ))
                }
            
            <button className='button' onClick={this.toggleUserForm}>Add new user</button>
                {
                    this.state.isUserFormDisplayed
                        ? <form onSubmit={this.createUser}>
                            <div><p class='subtitle'>New User Form:</p></div>
                            <div>
                                <label htmlFor="user_name">User Name:</label>
                                <input
                                    id="user_name"
                                    type="text"
                                    name="user_name"
                                    onChange={this.handleChange}
                                    value={this.state.newUser.user_name}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={this.state.newUser.email}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input
                                    id="password"
                                    type="text"
                                    name="password"
                                    onChange={this.handleChange}
                                    value={this.state.newUser.password}
                                />
                            </div>
                            <button class='button'>Create</button>
                        </form>
                        : null
                }

            </div>
        );
    }
}

export default UserList;