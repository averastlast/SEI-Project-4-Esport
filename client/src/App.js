// App.js
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import UserList from "./components/UserList";
import User from "./components/User";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">

                    <div>
                        <h1>Team App</h1>
                        <div>
                            <div><Link to="/">All Users</Link></div>
                        </div>
                    </div>

                    <Switch>
                      <Route exact path="/" component={UserList}/>
                      <Route path="/user/:id" component={User}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;