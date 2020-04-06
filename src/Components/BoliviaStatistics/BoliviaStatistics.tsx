import * as React from 'react';
import XforceAPI from "../../Services/XforceAPI";
import MapChart from "../MapChart/MapChart";

// STYLES
import "./BoliviaStatistics.css";

class BoliviaStatistics extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        // XforceAPI call rest for statistics
        //this.setState({
        //    emergencyNumbers: EMERGENCY_NUMBERS //(res && res.data) || []
        //});
    }

    render() {
        return (
            <div className="bolivia-statistics" >
                <div className="bolivia-statistics map">
                    <MapChart />
                </div>
                <div className="bolivia-statistics general-data">
                    <div className="wrapper">
                        <div className="table">
                            <div className="row header">
                                <div className="cell">
                                    Confirmados
                                </div>
                                <div className="cell">
                                    Personas Recuperadas
                                </div>
                                <div className="cell">
                                    Muertes
                                </div>
                            </div>

                            <div className="row">
                                <div className="cell" data-title="Casos Confirmados">
                                    183
                                </div>
                                <div className="cell" data-title="Personas Recuperadas">
                                    2
                                </div>
                                <div className="cell" data-title="Muertes">
                                    11
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BoliviaStatistics;