import React, { Component } from 'react';
import TeamList from './TeamList';
import axios from 'axios'

class PandaTeamsList extends Component {
state={
    teamInfo:[]
}


    componentDidMount = () => {
        axios.get('/api/v1/teams/').then(res => {
            this.setState({ teamInfo: res.data })
        })
    }

    // readPandaTeams = async () => {

    //     teamobj = axios.get('/api/v1/teams')

    //     for (var property in teamobj) {
    //         if (teamobj.acronym(property)) {
    //           return TeamList.acronym?
    //         }
    //     }
    // }

    // .map

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
                                <button onClick={()=>{this.post(team)} }>ADD</button>
                            </div>
                            
                        )
                    })
                }

            </div>
        );
    }
}

export default PandaTeamsList;