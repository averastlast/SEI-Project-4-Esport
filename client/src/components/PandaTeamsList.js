import React, { Component } from 'react';
import TeamList from './TeamList';
import axios from 'axios'

class PandaTeamsList extends Component {
state={
    teamInfo:{}
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
        return (
            <div>
                im a panda PandaTeamsList
                
            </div>
        );
    }
}

export default PandaTeamsList;