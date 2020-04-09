import * as React from 'react';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import XforceAPI from "../../Services/XforceAPI";
import MapChart from "../MapChart/MapChart";

// STYLES
import "./BoliviaStatistics.css";
import boliviaStatisticsData from "../../data/boliviaStatisticsData.json";

class BoliviaStatistics extends React.Component<any, any> {
    state = {
        chartSize: 200,
        bottomChartSize: 600
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        // XforceAPI call rest for statistics
        //this.setState({
        //});

        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();
    }

    handleWindowResize = () => {
        console.log("resize", window.innerWidth);
        let width = window.innerWidth;

        if(width >= 1920)
            width = 450;
        else if (width >= 1600)
            width = width * 25 / 100;
        else if (width >= 1300)
            width = width * 29 / 100;
        else if (width >= 1000)
            width = width * 35 / 100;
        else
            width = width * 36 / 100;
        this.setState({
            chartSize: width,
            bottomChartSize:  window.innerWidth - 100
        });
    }

    render() {
        const {data: {generalInfo, byDepartment, hystoricByDay}} = boliviaStatisticsData;
        return (
            <React.Fragment>
                <div className="bolivia-statistics" >
                    <div className="bolivia-statistics map">
                        <MapChart />
                    </div>
                    <div className="bolivia-statistics general-data">
                        <div className="wrapper">
                            <div className="table-general-info">
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
                        <div className="wrapper-department">
                            <table>
                                <thead>
                                <tr>
                                    <th>Departmento</th>
                                    <th>Confirmados</th>
                                    <th>Recuperad@s</th>
                                    <th>Muertes</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    byDepartment.map(department => (
                                        <tr>
                                            <td>{department.name}</td>
                                            <td>{department.casosConfirmados}</td>
                                            <td>{department.personasRecuperadas}</td>
                                            <td>{department.muertes}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                                <tfoot>
                                    <th>Total Bolivia</th>
                                    <th>{generalInfo.casosConfirmados}</th>
                                    <th>{generalInfo.personasRecuperadas}</th>
                                    <th>{generalInfo.muertes}</th>
                                </tfoot>
                            </table>
                            <div className="wrapper-sinple-chart">
                                <LineChart width={this.state.chartSize} height={300} data={hystoricByDay}
                                           margin={{top: 20, right: 5, left: -25, bottom: 5}}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip />
                                    <Legend />
                                    <CartesianGrid strokeDasharray="1 1"/>
                                    <Line type="monotone" dataKey="casos" stroke="orange" dot={{ stroke: 'orange', strokeWidth: 1 }} activeDot={{r: 1}}/>
                                    <Line type="monotone" dataKey="muertes" stroke="purple" dot={{ stroke: 'purple', strokeWidth: 1 }} activeDot={{r: 1}}/>
                                </LineChart>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-chart">
                    <LineChart width={this.state.bottomChartSize} height={300} data={hystoricByDay}
                               margin={{top: 20, right: 5, left: 5, bottom: 5}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="1 1"/>
                        <Line type="monotone" dataKey="casos" stroke="orange" dot={{ stroke: 'orange', strokeWidth: 1 }} activeDot={{r: 1}}/>
                        <Line type="monotone" dataKey="muertes" stroke="purple" dot={{ stroke: 'purple', strokeWidth: 1 }} activeDot={{r: 1}}/>
                    </LineChart>
                </div>
                <div className="bolivia-statistics by-department">
                    <table>
                        <thead>
                        <tr>
                            <th>Departmento</th>
                            <th>Confirmados</th>
                            <th>Recuperad@s</th>
                            <th>Muertes</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            byDepartment.map(department => (
                                <tr>
                                    <td>{department.name}</td>
                                    <td>{department.casosConfirmados}</td>
                                    <td>{department.personasRecuperadas}</td>
                                    <td>{department.muertes}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default BoliviaStatistics;