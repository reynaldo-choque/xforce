import * as React from 'react';
import ReactTooltip from "react-tooltip";
import {StatisticsContext} from '../../utils/Constants';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ComposedChart, Area, Bar
} from 'recharts';

import MapChart from "../MapChart/MapChart";

// STYLES
import "./BoliviaStatistics.css";

import loading_icon from "../../images/loading.gif";
import { v4 as uuidv4 } from 'uuid';
import { Grid, Paper } from '@material-ui/core';
interface IStat {
    data: any
}

/*
 import React, { PureComponent } from 'react';
 import {
 ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
 } from 'recharts';

 const data = [
 {
 name: 'Page A', uv: 590, pv: 800, amt: 1400,
 },
 {
 name: 'Page B', uv: 868, pv: 967, amt: 1506,
 },
 {
 name: 'Page C', uv: 1397, pv: 1098, amt: 989,
 },
 {
 name: 'Page D', uv: 1480, pv: 1200, amt: 1228,
 },
 {
 name: 'Page E', uv: 1520, pv: 1108, amt: 1100,
 },
 {
 name: 'Page F', uv: 1400, pv: 680, amt: 1700,
 },
 ];

 export default class Example extends PureComponent {
 static jsfiddleUrl = 'https://jsfiddle.net/alidingling/shjsn5su/';

 render() {
 return (
 <ComposedChart
 layout="vertical"
 width={500}
 height={400}
 data={data}
 margin={{
 top: 20, right: 20, bottom: 20, left: 20,
 }}
 >
 <CartesianGrid stroke="#f5f5f5" />
 <XAxis type="number" />
 <YAxis dataKey="name" type="category" />
 <Tooltip />
 <Legend />
 <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" />
 <Bar dataKey="pv" barSize={20} fill="#413ea0" />
 <Line dataKey="uv" stroke="#ff7300" />
 </ComposedChart>
 );
 }
 }

*/

class BoliviaStatistics extends React.Component<any, any> {
    static contextType = StatisticsContext;
    mounted = false;

    state = {
        chartSize: 200,
        bottomChartSize: 600,
        tooltipContent: ""
    };

    constructor(props: any) {
        super(props);
        // eslint-disable-next-line
        this.handleWindowResize();
    }

    componentWillMount() { this.mounted = true; }
    componentWillUnmount() { this.mounted = false; }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();
        this.convertDataToJson();
    }

    convertDataToJson = () => {
        if(this.context) {
            //let obj: MyObj = JSON.parse(data.toString());
            //decodeURIComponent(escape(atob(this.context)))
            let jsonData: IStat = JSON.parse(decodeURIComponent(escape(atob(this.context))));
            return jsonData;
        }
        return null;
    }

    editTooltip = (department) => {
        const jsonData = this.convertDataToJson();
        if(jsonData){
            const {data: { byDepartment }} = jsonData;
            if(department) {
                const depInfo = byDepartment.find(dep => dep.name == department);
                if(depInfo) {
                    this.setState({
                        tooltipContent: department
                        + "<br /> Confirmados: "
                        + depInfo.casosConfirmados
                        + "<br /> Recuperados "
                        + depInfo.personasRecuperadas
                        + "<br /> Decesos "
                        + depInfo.muertes
                    });
                }
            } else {
                this.setState({
                    tooltipContent: ""
                });
            }
        }
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
        if(this.mounted) {
            this.setState({
                chartSize: width,
                bottomChartSize:  window.innerWidth * 90 / 100
            });
        }
    }


    render() {
        const jsonData = this.convertDataToJson();
        if(jsonData) {
            const {data: {generalInfo, byDepartment, hystoricByDay, graphicCoordinates}} = jsonData;
            byDepartment.sort((depA, depB) => depA.casosConfirmados < depB.casosConfirmados ? 1 : -1 );
            return (
                <React.Fragment>
                    <Grid container spacing={3} className="gridBox">
                        <Grid item xs>
                        <Paper className="current">Confirmados<br/>{generalInfo.casosConfirmados}</Paper>
                        </Grid>
                        <Grid item xs>
                        <Paper className="good">Recuperados<br/>{generalInfo.personasRecuperadas}</Paper>
                        </Grid>
                        <Grid item xs>
                        <Paper className="bad">Decesos<br/>{generalInfo.muertes}</Paper>
                        </Grid>
                    </Grid>
                    <div className="bolivia-statistics" >
                        <div className="bolivia-statistics map">
                            <MapChart
                                dataTip={this.state.tooltipContent}
                                dataTipFn={this.editTooltip}
                            />
                            <ReactTooltip html={true} style={{padding: "0" }} />
                        </div>

                        <div className="bolivia-statistics general-data">

                            <div className="wrapper-department">
                                <table>
                                    <thead>
                                    <tr>
                                        <th key={uuidv4()}>Departmento</th>
                                        <th key={uuidv4()}>Confirmados</th>
                                        <th key={uuidv4()}>Recuperados</th>
                                        <th key={uuidv4()}>Decesos</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        byDepartment.map(department => (
                                            <tr key={uuidv4()}>
                                                <td key={uuidv4()}>{department.name}</td>
                                                <td key={uuidv4()}>{department.casosConfirmados}</td>
                                                <td key={uuidv4()}>{department.personasRecuperadas}</td>
                                                <td key={uuidv4()}>{department.muertes}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                                <div className="wrapper-sinple-chart">
                                    <LineChart width={3*window.innerWidth/10} height={Math.min(350, window.innerHeight)} data={hystoricByDay}
                                               margin={{top: 20, right: 5, left: -25, bottom: 5}}>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <Tooltip />
                                        <Legend />
                                        <CartesianGrid strokeDasharray="1 1"/>
                                        <Line type="monotone" dataKey="casos" stroke="orange" dot={{ stroke: 'orange', strokeWidth: 1 }} activeDot={{r: 1}}/>
                                        <Line type="monotone" name="decesos" dataKey="muertes" stroke="purple" dot={{ stroke: 'purple', strokeWidth: 1 }} activeDot={{r: 1}}/>
                                        <Line type="monotone" dataKey="recuperados" stroke="green" dot={{ stroke: 'green', strokeWidth: 1 }} activeDot={{r: 1}}/>
                                    </LineChart>
                                    <ComposedChart
                                        layout="vertical"
                                        width={3*window.innerWidth/10}
                                        height={400}
                                        data={byDepartment}
                                        margin={{
                                            top: 20, right: 20, bottom: 20, left: 40,
                                        }}
                                    >
                                        <CartesianGrid stroke="#f5f5f5" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="name" type="category" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar name="Casos Confirmados" dataKey="casosConfirmados" barSize={20} fill="#413ea0" />
                                    </ComposedChart>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-chart">
                        <LineChart width={8*window.innerWidth/10} height={Math.min(400, window.innerHeight)} data={hystoricByDay}
                                   margin={{top: 20, right: 5, left: -15, bottom: 5}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip />
                            <Legend />
                            <CartesianGrid strokeDasharray="1 1"/>
                            <Line type="monotone" dataKey="casos" stroke="orange" dot={{ stroke: 'orange', strokeWidth: 1 }} activeDot={{r: 1}}/>
                            <Line type="monotone" name="decesos" dataKey="muertes" stroke="purple" dot={{ stroke: 'purple', strokeWidth: 1 }} activeDot={{r: 1}}/>
                            <Line type="monotone" dataKey="recuperados" stroke="green" dot={{ stroke: 'green', strokeWidth: 1 }} activeDot={{r: 1}}/>
                        </LineChart>

                        <ComposedChart
                            layout="vertical"
                            width={8*window.innerWidth/10}
                            height={400}
                            data={byDepartment}
                            margin={{
                                top: 20, right: 20, bottom: 20, left: 60,
                            }}
                        >
                            <CartesianGrid stroke="#f5f5f5" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" />
                            <Tooltip />
                            <Legend />
                            <Bar name="Casos Confirmados" dataKey="casosConfirmados" barSize={20} fill="#ea6153" />
                        </ComposedChart>
                    </div>
                </React.Fragment>
            );

        } else {
            return (
                    <div style={{top: "50%", position: "absolute"}}>
                        <img src={loading_icon} style={{maxWidth: "10%", maxHeight: "10%"}} />
                        <div><b> Cargando...</b></div>
                    </div>
            );
        }

    }
}

export default BoliviaStatistics;