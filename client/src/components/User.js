import React, {Component} from 'react';
import axios from 'axios';

class User extends Component {

    state = {
            user: {},
            fav_team: [],
            rival_team: []
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
            this.setState({error: error.message})
        }
    }

    render() {
        return (
            <div>
                
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
            </div>
        );
    }
}

export default User;