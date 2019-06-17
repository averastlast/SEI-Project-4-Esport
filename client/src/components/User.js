import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class User extends Component {

    state = {
        fav_team: [],
        newFavTeam: {
            name: '',
        },
        user: {
            id: '',
            user_name: '',
            email: '',
            password: ''
        },
        redirectToHome: false,
        isEditFormDisplayed: false,
        isFavTeamFormDisplayed: false
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
        axios.delete(`/api/v1/users/${this.props.match.params.id}/`).then(res => {
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
        const cloneUser = { ...this.state.user }
        // let inside = cloneUser.user
        cloneUser[e.target.name] = e.target.value
        // cloneUser.user = inside
        this.setState({ user: cloneUser })
    }

    handleTeamChange = (e) => {
        const cloneNewFavTeam = { ...this.state.newFavTeam }
        cloneNewFavTeam[e.target.name] = e.target.value
        this.setState({ newFavTeam: cloneNewFavTeam })
    }

    updateUser = (e) => {
        e.preventDefault()
        console.log('trying to update')
        axios
            .put(`/api/v1/users/${this.props.match.params.id}/`, {
                user_name: this.state.user.user_name,
                email: this.state.user.email,
                password: this.state.user.password,

            })
            .then(() => {
                this.setState({ isEditFormDisplayed: false })
                this.fetchUser()
            })
    }

    toggleFavTeamForm = () => {
        this.setState((state, props) => {
            return ({ isFavTeamFormDisplayed: !state.isFavTeamFormDisplayed })
        })
    }

    createFavTeam = (e) => {
        e.preventDefault()
        axios
            .post('/api/v1/fav_teams/', {
                name: this.state.newFavTeam.name,
                user: this.state.user.id
            })
            .then(res => {
                const favteamsList = [...this.state.fav_team]
                favteamsList.unshift(res.data)
                this.setState({
                    newFavTeam: {
                        name: ''
                    },
                    isUserFormDisplayed: false,
                    fav_team: favteamsList
                })
            })
    }

    deleteFavTeam = (teamID) => {
        axios.delete(`/api/v1/fav_teams/${teamID}/`).then(res => {
            const userId = this.props.match.params.id;
            this.fetchUser(userId)
        })
    }

    render() {
        if (this.state.redirectToHome) {
            return (<Redirect to="/" />)
        }
        return (
            <div>
                <div className='title'>{this.state.user.user_name}</div>
                {this.state.fav_team.map(favteam => (
                    <div key={favteam.id}>
                        <div className='subtitle'>{favteam.name}</div>
                        <button className='deleteButton' onClick={() => { this.deleteFavTeam(favteam.id) }}>DELETE</button>
                    </div>
                ))}
            <div>
                <button className='button' onClick={this.toggleFavTeamForm}>Add favorite team</button>
                {
                    this.state.isFavTeamFormDisplayed
                        ? <form onSubmit={this.createFavTeam}>
                            <div><p class='subtitle'>New favorite team Form:</p></div>

                            <div>
                                <label htmlFor="name">Team name:</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleTeamChange}
                                    value={this.state.newFavTeam.name}
                                />
                            </div>

                            <button className='button'>Create</button>
                        </form>
                        : null
                }
        </div>
        <div>
                <button className='button' onClick={this.toggleEditForm}>Edit</button>
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateUser}>
                            <div className='formsubtitle'>Edit User Form:</div>
                            <div>
                                <label htmlFor="user_name">Name:</label>
                                <input
                                    id="user_name"
                                    type="text"
                                    name="user_name"
                                    onChange={this.handleChange}
                                    value={this.state.user.user_name}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <textarea
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={this.state.user.email}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <textarea
                                    id="password"
                                    type="number"
                                    name="password"
                                    onChange={this.handleChange}
                                    value={this.state.user.password}
                                />
                            </div>
                            <button className='button'>Update</button>
                        </form>
                        : <div className='editbox'>
                            <p className='formsubtitle'>Edit this user:</p>
                            <p>
                                Name: {this.state.user.user_name}
                            </p>
                            <p>
                                Email: {this.state.user.email}
                            </p>
                            <p>
                                Password: {this.state.user.password}
                            </p>
                            <button className='deleteButton' onClick={this.deleteUser}>Delete</button>
                        </div>
                }
            </div>
            </div>
        );
    }
}

export default User;