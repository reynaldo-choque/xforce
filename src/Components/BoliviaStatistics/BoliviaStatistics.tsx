import * as React from 'react';
import XforceAPI from "../../Services/XforceAPI";
import MapChart from "../MapChart/MapChart";

// STYLES
import "./BoliviaStatistics.css"
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
                    <table id="customers">
                        <tr>
                            <th>Departamento</th>
                            <th>Infectados</th>
                            <th>Recuperados</th>
                        </tr>
                        <tr>
                            <td>La Paz</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Oruro</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Potosí</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Tarija</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Chuquisaca</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Cochabamba</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Santa Cruz</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Beni</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Pando</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default BoliviaStatistics;