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
import {BOLIVIA_DEPARTMENT_COORDINATES, BOLIVIA_PLACES_WITH_INFECTED_PEOPLE} from "../../utils/MapConstants";


const MapChart = () => {
    return (
        <React.Fragment>
            <ComposableMap
                projection="geoAzimuthalEqualArea"
                projectionConfig={{
                    rotate: [60, 17, 0],
                    scale: 2000
                }}
            >
                <Geographies geography={boliviaMapGeo}>
                    {({ geographies }) =>
                        geographies
                            .filter(d => d.properties.NAME === "Bolivia")
                            .map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#EAEAEC"
                                    stroke="#D6D6DA"
                                />
                            ))
                    }
                </Geographies>
                {BOLIVIA_DEPARTMENT_COORDINATES.map(({ name, coordinates, markerOffset }) => (
                    <Marker key={name} coordinates={coordinates}>
                        <svg
                            fill="none"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            transform="translate(-12, -24)"
                        >
                            <circle cx="12" cy="10" r="3" color="black"/>
                            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                        </svg>
                        <text
                            textAnchor="middle"
                            y={markerOffset}
                            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                        >
                            {name}
                        </text>
                    </Marker>
                ))}
                {BOLIVIA_PLACES_WITH_INFECTED_PEOPLE.map(({ name, coordinates, markerOffset }) => (
                    <Marker key={name} coordinates={coordinates}>
                        <svg stroke="red" fill="red" stroke-width="15" opacity="0.6">
                            <circle cx="13" cy="14" r="6" fill="red" />
                        </svg>
                    </Marker>
                ))}
            </ComposableMap>
        </React.Fragment>
    );
};

export default MapChart;