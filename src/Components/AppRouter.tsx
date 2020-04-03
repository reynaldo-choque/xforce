import { HashRouter, Route, Switch } from 'react-router-dom'
import React from "react";
import NavBar from './NavBar';
import DiagnosticComponent from "./DiagnosticComponent";
import RiskFactors from './RiskFactors/RiskFactors';
import Symptoms from './Symptoms/Symptoms';
import EmergencyNumbers from "./EmergencyNumbers/EmergencyNumbers";


const AppRouter = () => {
    return(
        <div>
            <HashRouter>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={DiagnosticComponent} />
                    <Route path="/factores" component={RiskFactors} />
                    <Route path="/sintomas" component={Symptoms} />
                    <Route path="/numerosEmergencia" component={EmergencyNumbers} />
                    {/*<Route path="/edit-user" component={EditUserComponent} />*/}
                </Switch>
            </HashRouter>
        </div>
    )
}

export default AppRouter;