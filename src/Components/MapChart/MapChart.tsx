import React from "react";
// @ts-ignore
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";

//CONSTANTS
import boliviaMapGeo from "../../utils/Bolivia.json";
import {BOLIVIA_CAPITAL_DEPARTMENT_COORDINATES} from "../../utils/MapConstants";

import boliviaGraphicsData from "../../data/boliviaGraphicsData.json";
import boliviaStatisticsData from "../../data/boliviaStatisticsData.json";

console.log(boliviaGraphicsData.data);

import { v4 as uuidv4 } from 'uuid';

const MapChart = () => {
    const {data: {generalInfo}} = boliviaStatisticsData;
    console.log(generalInfo);
    return (
        <React.Fragment>
            <ComposableMap
                projection="geoAzimuthalEqualArea"
                projectionConfig={{
                    rotate: [64, 16, 0],
                    scale: 2450
                }}
            >
                <Geographies geography={boliviaMapGeo}>
                    {({ geographies }) =>
                        geographies
                            .filter(d => d.properties.country === "Bolivia")
                            .map(geo => (
                                <Geography
                                    key={uuidv4()}
                                    geography={geo}
                                    fill={geo.properties.color || "red"}
                                    stroke="#cb410b"
                                />
                            ))
                    }
                </Geographies>
                {BOLIVIA_CAPITAL_DEPARTMENT_COORDINATES.map(({ name, coordinates, markerOffset }) => (
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
                            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                        </g>
                        <text
                            textAnchor="middle"
                            y={markerOffset}
                            style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "10px", fontWeight: "bold"}}
                        >
                            {name}
                        </text>
                    </Marker>
                ))}

                {boliviaGraphicsData.data.map(({ name, coordinates, markerOffset, radioInfection }) => (
                    <Marker key={uuidv4()} coordinates={coordinates}>
                        <circle r={radioInfection} fill="#ff0000" stroke="#cc0000" strokeWidth={1} opacity={0.5} />
                    </Marker>
                ))}
            </ComposableMap>
        </React.Fragment>
    );
};

export default MapChart;