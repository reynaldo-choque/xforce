import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListUserComponent from "./ListComponent";
// import AddUserComponent from "./user/AddUserComponent";
// import EditUserComponent from "./user/EditUserComponent";
import React from "react";
import NavBar from './NavBar';


const AppRouter = () => {
    return(
        <div>
            <Router>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={ListUserComponent} />
                    {/*<Route path="/users" component={ListUserComponent} />*/}
                    {/*<Route path="/add-user" component={AddUserComponent} />*/}
                    {/*<Route path="/edit-user" component={EditUserComponent} />*/}
                </Switch>
            </Router>
        </div>
    )
}

export default AppRouter;