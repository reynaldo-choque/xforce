import * as React from 'react';
import XforceAPI from "../../Services/XforceAPI";
import MapChart from "../MapChart/MapChart";

// STYLES
import "./BoliviaStatistics.css";
import boliviaStatisticsData from "../../data/boliviaStatisticsData.json";

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
        const {data: {generalInfo}} = boliviaStatisticsData;
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
                                    {generalInfo.casosConfirmados}
                                </div>
                                <div className="cell" data-title="Personas Recuperadas">
                                    {generalInfo.personasRecuperadas}
                                </div>
                                <div className="cell" data-title="Muertes">
                                    {generalInfo.muertes}
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