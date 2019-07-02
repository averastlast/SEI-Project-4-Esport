import React, { Component } from 'react';
import axios from 'axios';
import PandaTeamsList from './PandaTeamsList';

class TeamList extends Component {
    state = {
        error: '',
        allTeams: []
    }

    componentDidMount() {
        this.fetchTeams();
    }

    fetchTeams = async () => {
        try {
            const res = await axios.get('/api/v1/owteams/');
            this.setState({ allTeams: res.data });
        }
        catch (err) {
            console.log(err)
            this.setState({ error: err.message })
        }
    }

    deleteTeam = (teamID) => {
        axios.delete(`/api/v1/owteams/${teamID}/`).then(res => {
            window.location.reload()
        })
    }

    // NEED TO WRITE reload page!!

    render() {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <div className='title'>Favorite OW Teams</div>

                <div>

                    {
                        this.state.allTeams.map((team, i) => {
                            return (
                                <div className='teams' key={i}>
                                    <img className='logoimg' src={team.image_url} alt="OW team logo" />
                                    <div className='teaminfobox'>
                                        <p>Name: {team.name}</p>
                                        <p>Acronym: {team.acronym}</p>

                                        <button className='deleteButton' onClick={() => { this.deleteTeam(team.id) }}>Delete Favorite Team</button>
                                    </div>
                                </div>

                            )
                        })
                    }

                </div>


                <PandaTeamsList />



            </div>
        );
    }
}

export default TeamList;