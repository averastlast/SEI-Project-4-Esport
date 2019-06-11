import React, { Component } from 'react';
import axios from 'axios';

class User extends Component {

    state = {
        userInfo: {
            user: {
                _id: '',
                user_name: '',
                email: '',
                password: ''
            },
            fav_team: {
                _id: '',
                name: '',
                rival_team: {
                    _id: '',
                    name: ''
                }
            }
        },
        redirectToHome: false,
        isEditFormDisplayed: false
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        this.fetchUser(userId)
    }

    fetchUser = async (userId) => {
        try {
            const userResponse = await axios.get(`/api/v1/users/${userId}`)
            this.setState({
                user: userResponse.data,
                fav_team: userResponse.data.fav_team,
                rival_team: userResponse.data.rival_team,
            })
        }
        catch (error) {
            console.log(error)
            this.setState({ error: error.message })
        }
    }

    deleteUser = () => {
        axios.delete(`/api/v1/users/${this.props.match.params.id}`).then(res => {
            this.setState({ redirectToHome: true })
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    //this only changes user info, does not go to team selections

    handleChange = (e) => {
        const cloneUser = { ...this.state.userInfo }

        let inside = cloneUser.user

        inside[e.target.name] = e.target.value

        cloneUser.user = inside

        this.setState({ userInfo: cloneUser })
    }

    updateUser = (e) => {
        e.preventDefault()
        axios
            .put(`/api/v1/users/${this.props.match.params.id}`, {
                user_name: this.state.userInfo.user.user_name,
                email: this.state.userInfo.user.email,
                password: this.state.userInfo.user.password
            })
            .then(() => {
                this.setState({ isEditFormDisplayed: false })
                this.getUser()
            })
    }

    render() {
        return (
            <div>
                {/* Is this mapping right? */}
                <h1>{this.state.user.user_name}</h1>
                {this.state.fav_teams.map(fav_team => (
                    <div key={fav_team.id}>
                        <h4>{fav_team.name}</h4>
                    </div>
                ))}
                {this.state.rival_teams.map(rival_team => (
                    <div key={rival_team.id}>
                        <h4>{rival_team.name}</h4>
                    </div>
                ))}




                <button class='button' onClick={this.toggleEditForm}>Edit</button>
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateUser}>
                            <p class='userform'>Edit User Form:</p>
                            <div>
                                <label htmlFor="user_name">Name:</label>
                                <input
                                    id="user_name"
                                    type="text"
                                    name="user_name"
                                    onChange={this.handleChange}
                                    value={this.state.userInfo.user.user_name}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <textarea
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={this.state.emailInfo.email.email}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <textarea
                                    id="password"
                                    type="number"
                                    name="password"
                                    onChange={this.handleChange}
                                    value={this.state.userInfo.user.password}
                                />
                            </div>
                            <button class='button'>Update</button>
                        </form>
                        : <div class='editbox'>
                            <p class='userform'>Edit this user:</p>
                            <p>
                                Name: {this.state.userInfo.user.user_name}
                            </p>
                            <p>
                                Email: {this.state.userInfo.user.email}
                            </p>
                            <p>
                                Password: {this.state.userInfo.user.password}
                            </p>
                            <button class='deleteButton' onClick={this.deleteUser}>Delete</button>
                        </div>
                }



            </div>
        );
    }
}

export default User;