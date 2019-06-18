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
        teamObj.acronym = teamObj.acronym || '';
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
                <div className='title'>Pick more OverWatch teams!</div>

                <div>
                    <button className='button' onClick={this.togglePandaTeamData}>See Teams</button>
                    {
                        this.state.isPandaTeamDataDisplayed
                            ? <div>
                                {
                                    this.state.teamInfo.map((team, i) => {
                                        return (
                                            <div className='teams' key={i}>
                                                <img className='logoimg' src={team.image_url} alt="OW team logo" />
                                                <div className='teaminfobox'>
                                                    <div>Team Profile:</div>
                                                    <p>{team.name}</p>
                                                    <p>Acronym:{team.acronym}</p>
                                                    {/* Need to add a failsafe code for if there is no data for this field, if empty will not add team */}
                                                    <button className='button' onClick={() => { this.postTeamData(team) }}>Add Favorite Team</button>
                                                </div>
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
// Change test
export default PandaTeamsList;