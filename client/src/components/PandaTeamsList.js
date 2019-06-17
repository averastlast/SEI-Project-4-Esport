import React, { Component } from 'react';
import TeamList from './TeamList';
import axios from 'axios'

class PandaTeamsList extends Component {
state={
    teamInfo:[],
    TeamList: []
}

    componentDidMount = () => {
        axios.get('/api/v1/teams/').then(res => {
            this.setState({ teamInfo: res.data })
        })
    }

    postTeamData = (teamObj) => {
        console.log(teamObj)
        axios
            .post('/api/v1/owteams/', teamObj)
            .then((res) => {
                console.log(res)
            }) 
    }
    // createOWTeams = (e) => {
    //     axios
    //         .post('/api/v1/owteams/', {
    //             name: this.state.TeamList.name,
    //             acronym: this.state.TeamList.acronym,
    //             image_url: this.state.TeamList.image_url
    //         })
    //         .then(res => {
    //             const usersList = [...this.state.TeamList]
    //             usersList.unshift(res.data)
    //             this.setState({
    //                 newUser: {
    //                     user_name: '',
    //                     email: '',
    //                     password: ''
    //                 },
    //                 isUserFormDisplayed: false,
    //                 allUsers: usersList
    //             })
    //         })
    // }

    render() {
        console.log(this.state.teamInfo);
        return (
            <div>
                im a panda PandaTeamsList
                
                {
                    this.state.teamInfo.map((team, i) => {
                        return (
                            <div class='textunit' key={i}>
                                <p>{team.name}</p>
                                <p>{team.acronym}</p>
                                <img src={team.image_url}/>
                                <button onClick={()=>{this.postTeamData(team)} }>ADD</button>
                            </div>
                            
                        )
                    })
                }

            </div>
        );
    }
}

export default PandaTeamsList;