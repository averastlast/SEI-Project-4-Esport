// App.js
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import UserList from "./components/UserList";
import TeamList from "./components/TeamList";
import User from "./components/User";
import owlogoPic from './components/appimg/overwatchLogo.png'
import "./App.css";



class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div><Link to="/"><img className='icon' src={owlogoPic} alt="OW logo"/></Link></div>
                    <div>
                    <div className='title'>Select your Team!</div>
                    <div className='subtitle'>Create your user profile and then select your favorite team!</div>
                    </div>

                    <Switch>
                      <Route exact path="/" component={UserList}/>
                      <Route path="/user/:id" component={User}/>
                      <Route exact path="/teams/" component={TeamList}/>
                    </Switch>
                    
                    <div className='link'>
                    <Link to="/">Home</Link>
                    <Link to="/teams/">Teams</Link>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;