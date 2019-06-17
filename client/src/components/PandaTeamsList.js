import React, { Component } from 'react';
import axios from 'axios'

class PandaTeamsList extends Component {
    state = {
        teamInfo: [],
        TeamList: [],
        isPandaTeamDataDisplayed: false
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
                window.location.reload()
            })
    }

    togglePandaTeamData = () => {
        this.setState((state, props) => {
            return ({ isPandaTeamDataDisplayed: !state.isPandaTeamDataDisplayed })
        })
    }

    render() {
        return (
            <div>
                <div className='title'>OverWatch Teams Pool:</div>

                <div>
                    <button className='button' onClick={this.togglePandaTeamData}>See OW Teams</button>
                    {
                        this.state.isPandaTeamDataDisplayed
                            ? <div>
                                {
                                    this.state.teamInfo.map((team, i) => {
                                        return (
                                            <div class='textunit' key={i}>
                                                <p>Team Name:{team.name}</p>
                                                <p>Team Acronym:{team.acronym}</p>
                                                <p>Team logo:</p><img src={team.image_url} alt="OW team logo" />
                                                <button onClick={() => { this.postTeamData(team) }}>ADD</button>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                            : null
                    }
                </div>
            </div>
        );
    }
}

export default PandaTeamsList;