import React, { Component } from 'react';
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
    // reload page!!
    postTeamData = (teamObj) => {
        console.log(teamObj)
        axios
            .post('/api/v1/owteams/', teamObj)
            .then((res) => {
                console.log(res)
            }) 
    }
    
    render() {
        console.log(this.state.teamInfo);
        return (
            <div>
                <div class='title'>OverWatch Teams Pool:</div>
                
                {
                    this.state.teamInfo.map((team, i) => {
                        return (
                            <div class='textunit' key={i}>
                                <p>{team.name}</p>
                                <p>{team.acronym}</p>
                                <img src={team.image_url} alt="OW team logo"/>
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