import React from "react";
import ReactTooltip from 'react-tooltip';

// @ts-ignore
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";

//CONSTANTS
import boliviaMapGeo from "../../utils/Bolivia.json";
import {StatisticsContext} from '../../utils/Constants';
import {BOLIVIA_CAPITAL_DEPARTMENT_COORDINATES} from "../../utils/MapConstants";

import {v4 as uuidv4} from 'uuid';

interface IStat {
    data: any
}

class MapChart extends React.Component<any, any> {
    static contextType = StatisticsContext;
    mounted = false;

    state = {
        mapWidth: 800,
        mapHeight: 600,
        mapScale: 2450,
        rotate_X: 60,
        rotate_Y: 16,
        fillColor: null
    };

    constructor(props: any) {
        super(props);
        this.handleWindowResize();
    }

    componentWillMount() { this.mounted = true; }
    componentWillUnmount() { this.mounted = false; }

    componentDidMount() {
        // XforceAPI call rest for statistics
        //this.setState({
        //});

        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();
    }

    convertDataToJson = () => {
        if(this.context) {
            //let obj: MyObj = JSON.parse(data.toString());
            let jsonData: IStat = JSON.parse(decodeURIComponent(escape(atob(this.context))));
            return jsonData;
        }
        return null;
    }

    handleWindowResize = () => {
        console.log("resize", window.innerWidth);
        let X = window.innerWidth;

        if (X > 800) {
            if(this.mounted) {
                this.setState({
                    mapWidth: 800,
                    mapHeight: 600,
                    mapScale: 2450,
                    rotate_X: 61,
                    rotate_Y: 16
                });
            }
        } else {
            if(this.mounted) {
                this.setState({
                    mapHeight: X/2,
                    mapScale: 2*X,
                    mapWidth: X/2,
                    rotate_X: 64,
                    rotate_Y: 16
                });
            }
        }
    }

    getPercentageByDepartment = (byDepartment, name) => {
        if(byDepartment && name) {
            const depInfo = byDepartment.find(dep => dep.name == name);
            const total = byDepartment.reduce( (currentTotal, {casosConfirmados}) => currentTotal + casosConfirmados  ,0);
            return 100 * depInfo.casosConfirmados / total;
        }
        return 0;
    }

    render() {
        const base = this;
        const jsonData = this.convertDataToJson();
        if(jsonData){
            const {data: { graphicCoordinates, byDepartment }} = jsonData;
            return (
                <React.Fragment>
                    <ComposableMap
                        data-tip={this.props.dataTip}
                        width={this.state.mapWidth}
                        height={this.state.mapHeight}
                        projection="geoAzimuthalEqualArea"
                        projectionConfig={{
                            rotate: [this.state.rotate_X, this.state.rotate_Y, 0],
                            scale: this.state.mapScale
                        }}
                    >
                        <Geographies geography={boliviaMapGeo}>
                            {({geographies}) =>
                                geographies
                                    .filter(d => d.properties.country === "Bolivia")
                                    .map(geo => {
                                        let percentage = base.getPercentageByDepartment(byDepartment, geo.properties.name);
                                        percentage = Math.ceil((100 - percentage) / 2);
                                        return(
                                        <Geography
                                            key={uuidv4()}
                                            geography={geo}
                                            stroke="#909090"
                                            
                                            fill= {`rgb(${Math.floor(255-percentage/5)},${170+percentage},${percentage*3})`}
                                            style={{
                                                hover: {
                                                    fill: "#ffefcc",
                                                    outline: "none"
                                                },
                                                pressed: {
                                                    fill: "#ffefcc",
                                                    outline: "none"
                                                }
                                            }}
                                            onMouseEnter={() => {
                                                this.props.dataTipFn(geo.properties.name);
                                            }}
                                            onMouseLeave={() => {
                                                 this.props.dataTipFn(null);
                                            }}
                                        />);
                                    })
                            }
                        </Geographies>

                        {window.innerWidth >= 650 && BOLIVIA_CAPITAL_DEPARTMENT_COORDINATES.map(({name, coordinates, markerOffset}) => {
                            const factorSize = window.innerWidth / 1920;
                            const fontSize = Math.ceil( Math.max(7, 10 * factorSize) );
                            return (
                            <Marker key={uuidv4()} coordinates={coordinates}>
                                <g
                                    fill="none"
                                    stroke="#000000"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    transform="translate(-12, -19)"
                                >
                                    <circle cx="12" cy="10" r="3" />
                                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"  />
                                </g>
                                <text
                                    textAnchor="middle"
                                    y={markerOffset}
                                    style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: `${fontSize}px`, fontWeight: "bold"}}
                                >
                                    {name}
                                </text>
                            </Marker>);
                        })}

                        {graphicCoordinates.map(({name, coordinates, markerOffset, radioInfection}) => {
                            const factorSize = window.innerWidth / 1500;
                            return (<Marker key={uuidv4()} coordinates={coordinates}>
                                <circle r={ Math.max(2, radioInfection * factorSize)  } fill="#ff0000" stroke="#cc0000" strokeWidth={1} opacity={0.6}/>
                            </Marker>);
                        })}
                    </ComposableMap>
                </React.Fragment>
            );
        }
    }
}

export default MapChart;