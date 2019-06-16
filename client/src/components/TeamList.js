import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PandaTeamsList from './PandaTeamsList';

class TeamList extends Component {
    state = {
        error: '',
        allTeams: [],
        teamInfo: []
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

    getOWTeams = async () => {
        try {
            const res = await axios.get(PandaTeamsList);
            this.setState({teamInfo: res.data});
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

   
    
    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <h1>All Teams</h1>
                {this.props.teamInfo}

                {/* {
                    this.state.allTeams.map(team => (
                    <div key={team.id}>
                        <Link to={`/owteams/${team.id}`} >{team.name}</Link>
                    </div>
                    ))
                } */}
            
                {
                    this.props.teamInfo.map((team, i) => {
                        return (
                            <div class='textunit' key={i}>
                                <p>{team.name}</p>
                                <p>{team.acronym}</p>
                                <p>{team.image_url}</p>
                                <button onClick={()=>{this.post(team)} }>ADD</button>
                            </div>
                            
                        )
                    })
                }

<PandaTeamsList/>
            </div>
        );
    }
}

export default TeamList;