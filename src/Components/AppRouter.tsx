import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from "react";
import NavBar from './NavBar';
import DiagnosticComponent from "./DiagnosticComponent";
import RiskFactors from './RiskFactors/RiskFactors';
import EmergencyNumbers from "./EmergencyNumbers/EmergencyNumbers";


const AppRouter = () => {
    return(
        <div>
            <Router>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={DiagnosticComponent} />
                    <Route path="/factores" component={RiskFactors} />
                    <Route path="/numerosEmergencia" component={EmergencyNumbers} />
                    {/*<Route path="/edit-user" component={EditUserComponent} />*/}
                </Switch>
            </Router>
        </div>
    )
}

export default AppRouter;