import React, { Component } from 'react';
import axios from 'axios';
import PandaTeamsList from './PandaTeamsList';

class TeamList extends Component {
    state = {
        error: '',
        allTeams: [],
    }

    componentDidMount(){
        this.fetchTeams();
    }

    fetchTeams = async () => {
        try {
            const res = await axios.get('/api/v1/owteams');
            this.setState({allTeams: res.data});
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    deleteTeam = (teamID) => {
        axios.delete(`/api/v1/owteams/${teamID}/`).then(res => {
            this.setState({ redirectToHome: true })
        })
    }   
    
    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <h1>All Teams</h1>
                <p>Pick your favorite</p>
                <div>
                
                {
                    this.state.allTeams.map((team, i) => {
                        return (
                            <div class='textunit' key={i}>
                                <p>{team.name}</p>
                                <p>{team.acronym}</p>
                                <img src={team.image_url} alt="OW team logo"/>
                                <button className='deleteButton' onClick={()=>{this.deleteTeam(team.id)} }>DELETE</button> 
                            </div>
                            
                        )
                    })
                }

            </div>



                <PandaTeamsList/>


                
            </div>
        );
    }
}

export default TeamList;