import * as React from 'react';
import ReactTooltip from "react-tooltip";
import {StatisticsContext} from '../../utils/Constants';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
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
                                    <LineChart width={this.state.chartSize} height={Math.min(350, window.innerHeight)} data={hystoricByDay}
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