import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactMapGL, {Layer, Source} from 'react-map-gl';
import {Editor, DrawPolygonMode, EditingMode} from 'react-map-gl-draw';
import ControlPanel from "../../components/ControlPanel";
import {getEditHandleStyle, getFeatureStyle} from "../../components/mapstyle";
import './Mappa.css';
import '../../components/mapbox-gl-draw.css';
import {
    faBiking, faBorderAll,
    faBuilding, faBullhorn,
    faPen,
    faRoad,
    faSatellite, faServer,
    faStreetView,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AddressSearchBar from "../../components/AddressSearchBar";
import RoomsController from "../../components/RoomsController/RoomsController";
import PlanEditor from "../../components/PlanEditor/PlanEditor";
import AppFooter from "../../components/AppFooter/AppFooter";
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import Pin from "../../components/Pin";
import NoisePin from "../../components/NoisePin";
import Container from "react-bootstrap/Container";
import AppBar from "../../components/AppBar/AppBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Helm from "../../components/Helm/Helm";

const TOKEN = 'pk.eyJ1IjoibG9yZXR0bzI1IiwiYSI6ImNqbnowdWh1cjBnZ2IzdmxqdXBtdHI5YW8ifQ.jwI7jHDNA9gbdaNiUrUxwQ'; // Set your mapbox token here

const Mappa = (props) => {

    //const editorRef = useRef(null);
    //mapbox://styles/loretto25/ckgz470510xp41aoh005z593v
    // const [mapStyle, setMapStyle] = useState(
    //     {
    //         "version": 8,
    //         "name": "Basic",
    //         "metadata": {
    //             "mapbox:autocomposite": true
    //         },
    //         "sources": {
    //             "mapbox": {
    //                 "url": "mapbox://mapbox.mapbox-streets-v7",
    //                 "type": "vector"
    //             }
    //         },
    //         "sprite": "mapbox://sprites/mapbox/basic-v8",
    //         "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    //         "layers": [
    //             {
    //                 "id": "background",
    //                 "type": "background",
    //                 "paint": {
    //                     "background-color": "#dedede"
    //                 },
    //                 "interactive": true
    //             },
    //             {
    //                 "id": "landuse_overlay_national_park",
    //                 "type": "fill",
    //                 "source": "mapbox",
    //                 "source-layer": "landuse_overlay",
    //                 "filter": [
    //                     "==",
    //                     "class",
    //                     "national_park"
    //                 ],
    //                 "paint": {
    //                     "fill-color": "#d2edae",
    //                     "fill-opacity": 0.75
    //                 },
    //                 "interactive": true
    //             },
    //             {
    //                 "id": "landuse_park",
    //                 "type": "fill",
    //                 "source": "mapbox",
    //                 "source-layer": "landuse",
    //                 "filter": [
    //                     "==",
    //                     "class",
    //                     "park"
    //                 ],
    //                 "paint": {
    //                     "fill-color": "#d2edae"
    //                 },
    //                 "interactive": true
    //             },
    //             {
    //                 "id": "waterway",
    //                 "type": "line",
    //                 "source": "mapbox",
    //                 "source-layer": "waterway",
    //                 "filter": [
    //                     "all",
    //                     [
    //                         "==",
    //                         "$type",
    //                         "LineString"
    //                     ],
    //                     [
    //                         "in",
    //                         "class",
    //                         "river",
    //                         "canal"
    //                     ]
    //                 ],
    //                 "paint": {
    //                     "line-color": "#a0cfdf",
    //                     "line-width": {
    //                         "base": 1.4,
    //                         "stops": [
    //                             [
    //                                 8,
    //                                 0.5
    //                             ],
    //                             [
    //                                 20,
    //                                 15
    //                             ]
    //                         ]
    //                     }
    //                 },
    //                 "interactive": true
    //             },
    //             {
    //                 "id": "water",
    //                 "type": "fill",
    //                 "source": "mapbox",
    //                 "source-layer": "water",
    //                 "paint": {
    //                     "fill-color": "#a0cfdf"
    //                 },
    //                 "interactive": true
    //             },
    //             {
    //                 "id": "building",
    //                 "type": "fill",
    //                 "source": "mapbox",
    //                 "source-layer": "building",
    //                 "paint": {
    //                     "fill-color": "#0029ff"
    //                 },
    //                 "interactive": true
    //             },
    //             {
    //                 "interactive": true,
    //                 "layout": {
    //                     "line-cap": "butt",
    //                     "line-join": "miter"
    //                 },
    //                 "filter": [
    //                     "all",
    //                     [
    //                         "==",
    //                         "$type",
    //                         "LineString"
    //                     ],
    //                     [
    //                         "all",
    //                         [
    //                             "in",
    //                             "class",
    //                             "motorway_link",
    //                             "street",
    //                             "street_limited",
    //                             "service",
    //                             "track",
    //                             "pedestrian",
    //                             "path",
    //                             "link"
    //                         ],
    //                         [
    //                             "==",
    //                             "structure",
    //                             "tunnel"
    //                         ]
    //                     ]
    //                 ],
    //                 "type": "line",
    //                 "source": "mapbox",
    //                 "id": "tunnel_minor",
    //                 "paint": {
    //                     "line-color": "#efefef",
    //                     "line-width": {
    //                         "base": 1.55,
    //                         "stops": [
    //                             [
    //                                 4,
    //                                 0.25
    //                             ],
    //                             [
    //                                 20,
    //                                 30
    //                             ]
    //                         ]
    //                     },
    //                     "line-dasharray": [
    //                         0.36,
    //                         0.18
    //                     ]
    //                 },
    //                 "source-layer": "road"
    //             },
    //             {
    //                 "interactive": true,
    //                 "layout": {
    //                     "line-cap": "butt",
    //                     "line-join": "miter"
    //                 },
    //                 "filter": [
    //                     "all",
    //                     [
    //                         "==",
    //                         "$type",
    //                         "LineString"
    //                     ],
    //                     [
    //                         "all",
    //                         [
    //                             "in",
    //                             "class",
    //                             "motorway",
    //                             "primary",
    //                             "secondary",
    //                             "tertiary",
    //                             "trunk"
    //                         ],
    //                         [
    //                             "==",
    //                             "structure",
    //                             "tunnel"
    //                         ]
    //                     ]
    //                 ],
    //                 "type": "line",
    //                 "source": "mapbox",
    //                 "id": "tunnel_major",
    //                 "paint": {
    //                     "line-color": "#fff",
    //                     "line-width": {
    //                         "base": 1.4,
    //                         "stops": [
    //                             [
    //                                 6,
    //                                 0.5
    //                             ],
    //                             [
    //                                 20,
    //                                 30
    //                             ]
    //                         ]
    //                     },
    //                     "line-dasharray": [
    //                         0.28,
    //                         0.14
    //                     ]
    //                 },
    //                 "source-layer": "road"
    //             },
    //             {
    //                 "interactive": true,
    //                 "layout": {
    //                     "line-cap": "round",
    //                     "line-join": "round"
    //                 },
    //                 "filter": [
    //                     "all",
    //                     [
    //                         "==",
    //                         "$type",
    //                         "LineString"
    //                     ],
    //                     [
    //                         "all",
    //                         [
    //                             "in",
    //                             "class",
    //                             "motorway_link",
    //                             "street",
    //                             "street_limited",
    //                             "service",
    //                             "track",
    //                             "pedestrian",
    //                             "path",
    //                             "link"
    //                         ],
    //                         [
    //                             "in",
    //                             "structure",
    //                             "none",
    //                             "ford"
    //                         ]
    //                     ]
    //                 ],
    //                 "type": "line",
    //                 "source": "mapbox",
    //                 "id": "road_minor",
    //                 "paint": {
    //                     "line-color": "#efefef",
    //                     "line-width": {
    //                         "base": 1.55,
    //                         "stops": [
    //                             [
    //                                 4,
    //                                 0.25
    //                             ],
    //                             [
    //                                 20,
    //                                 30
    //                             ]
    //                         ]
    //                     }
    //                 },
    //                 "source-layer": "road"
    //             },
    //             {
    //                 "interactive": true,
    //                 "layout": {
    //                     "line-cap": "round",
    //                     "line-join": "round"
    //                 },
    //                 "filter": [
    //                     "all",
    //                     [
    //                         "==",
    //                         "$type",
    //                         "LineString"
    //                     ],
    //                     [
    //                         "all",
    //                         [
    //                             "in",
    //                             "class",
    //                             "motorway",
    //                             "primary",
    //                             "secondary",
    //                             "tertiary",
    //                             "trunk"
    //                         ],
    //                         [
    //                             "in",
    //                             "structure",
    //                             "none",
    //                             "ford"
    //                         ]
    //                     ]
    //                 ],
    //                 "type": "line",
    //                 "source": "mapbox",
    //                 "id": "road_major",
    //                 "paint": {
    //                     "line-color": "#fff",
    //                     "line-width": {
    //                         "base": 1.4,
    //                         "stops": [
    //                             [
    //                                 6,
    //                                 0.5
    //                             ],
    //                             [
    //                                 20,
    //                                 30
    //                             ]
    //                         ]
    //                     }
    //                 },
    //                 "source-layer": "road"
    //             },
    //             {
    //                 "interactive": true,
    //                 "layout": {
    //                     "line-cap": "butt",
    //                     "line-join": "miter"
    //                 },
    //                 "filter": [
    //                     "all",
    //                     [
    //                         "==",
    //                         "$type",
    //                         "LineString"
    //                     ],
    //                     [
    //                         "all",
    //                         [
    //                             "in",
    //                             "class",
    //                             "motorway_link",
    //                             "street",
    //                             "street_limited",
    //                             "service",
    //                             "track",
    //                             "pedestrian",
    //                             "path",
    //                             "link"
    //                         ],
    //                         [
    //                             "==",
    //                             "structure",
    //                             "bridge"
    //                         ]
    //                     ]
    //                 ],
    //                 "type": "line",
    //                 "source": "mapbox",
    //                 "id": "bridge_minor case",
    //                 "paint": {
    //                     "line-color": "#dedede",
    //                     "line-width": {
    //                         "base": 1.6,
    //                         "stops": [
    //                             [
    //                                 12,
    //                                 0.5
    //                             ],
    //                             [
    //                                 20,
    //                                 10
    //                             ]
    //                         ]
    //                     },
    //                     "line-gap-width": {
    //                         "base": 1.55,
    //                         "stops": [
    //                             [
    //                                 4,
    //                                 0.25
    //                             ],
    //                             [
    //                                 20,
    //                                 30
    //                             ]
    //                         ]
    //                     }
    //                 },
    //                 "source-layer": "road"
    //             },
    //             {
    //                 "interactive": true,
    //                 "layout": {
    //                     "line-cap": "butt",
    //                     "line-join": "miter"
    //                 },
    //                 "filter": [
    //                     "all",
    //                     [
    //                         "==",
    //                         "$type",
    //                         "LineString"
    //                     ],
    //                     [
    //                         "all",
    //                         [
    //                             "in",
    //                             "class",
    //                             "motorway",
    //                             "primary",
    //                             "secondary",
    //                             "tertiary",
    //                             "trunk"
    //                         ],
    //                         [
    //                             "==",
    //                             "structure",
    //                             "bridge"
    //                         ]
    //                     ]
    //                 ],
    //                 "type": "line",
    //                 "source": "mapbox",
    //                 "id": "bridge_major case",
    //                 "paint": {
    //                     "line-color": "#dedede",
    //                     "line-width": {
    //                         "base": 1.6,
    //                         "stops": [
    //                             [
    //                                 12,
    //                                 0.5
    //                             ],
    //                             [
    //                                 20,
    //                                 10
    //                             ]
    //                         ]
    //                     },
    //                     "line-gap-width": {
    //                         "base": 1.55,
    //                         "stops": [
    //                             [
    //                                 4,
    //                                 0.25
    //                             ],
    //                             [
    //                                 20,
    //                                 30
    //                             ]
    //                         ]
    //                     }
    //                 },
    //                 "source-layer": "road"
    //             },
    //             {
    //                 "interactive": true,
    //                 "layout": {
    //                     "line-cap": "round",
    //                     "line-join": "round"
    //                 },
    //                 "filter": [
    //                     "all",
    //                     [
    //                         "==",
    //                         "$type",
    //                         "LineString"
    //                     ],
    //                     [
    //                         "all",
    //                         [
    //                             "in",
    //                             "class",
    //                             "motorway_link",
    //                             "street",
    //                             "street_limited",
    //                             "service",
    //                             "track",
    //                             "pedestrian",
    //                             "path",
    //                             "link"
    //                         ],
    //                         [
    //                             "==",
    //                             "structure",
    //                             "bridge"
    //                         ]
    //                     ]
    //                 ],
    //                 "type": "line",
    //                 "source": "mapbox",
    //                 "id": "bridge_minor",
    //                 "paint": {
    //                     "line-color": "#efefef",
    //                     "line-width": {
    //                         "base": 1.55,
    //                         "stops": [
    //                             [
    //                                 4,
    //                                 0.25
    //                             ],
    //                             [
    //                                 20,
    //                                 30
    //                             ]
    //                         ]
    //                     }
    //                 },
    //                 "source-layer": "road"
    //             },
    //             {
    //                 "interactive": true,
    //                 "layout": {
    //                     "line-cap": "round",
    //                     "line-join": "round"
    //                 },
    //                 "filter": [
    //                     "all",
    //                     [
    //                         "==",
    //                         "$type",
    //                         "LineString"
    //                     ],
    //                     [
    //                         "all",
    //                         [
    //                             "in",
    //                             "class",
    //                             "motorway",
    //                             "primary",
    //                             "secondary",
    //                             "tertiary",
    //                             "trunk"
    //                         ],
    //                         [
    //                             "==",
    //                             "structure",
    //                             "bridge"
    //                         ]
    //                     ]
    //                 ],
    //                 "type": "line",
    //                 "source": "mapbox",
    //                 "id": "bridge_major",
    //                 "paint": {
    //                     "line-color": "#fff",
    //                     "line-width": {
    //                         "base": 1.4,
    //                         "stops": [
    //                             [
    //                                 6,
    //                                 0.5
    //                             ],
    //                             [
    //                                 20,
    //                                 30
    //                             ]
    //                         ]
    //                     }
    //                 },
    //                 "source-layer": "road"
    //             },
    //             {
    //                 "interactive": true,
    //                 "layout": {
    //                     "line-cap": "round",
    //                     "line-join": "round"
    //                 },
    //                 "filter": [
    //                     "all",
    //                     [
    //                         "==",
    //                         "$type",
    //                         "LineString"
    //                     ],
    //                     [
    //                         "all",
    //                         [
    //                             "<=",
    //                             "admin_level",
    //                             2
    //                         ],
    //                         [
    //                             "==",
    //                             "maritime",
    //                             0
    //                         ]
    //                     ]
    //                 ],
    //                 "type": "line",
    //                 "source": "mapbox",
    //                 "id": "admin_country",
    //                 "paint": {
    //                     "line-color": "#8b8a8a",
    //                     "line-width": {
    //                         "base": 1.3,
    //                         "stops": [
    //                             [
    //                                 3,
    //                                 0.5
    //                             ],
    //                             [
    //                                 22,
    //                                 15
    //                             ]
    //                         ]
    //                     }
    //                 },
    //                 "source-layer": "admin"
    //             },
    //             {
    //                 "interactive": true,
    //                 "minzoom": 5,
    //                 "layout": {
    //                     "icon-image": "{maki}-11",
    //                     "text-offset": [
    //                         0,
    //                         0.5
    //                     ],
    //                     "text-field": "{name_en}",
    //                     "text-font": [
    //                         "Open Sans Semibold",
    //                         "Arial Unicode MS Bold"
    //                     ],
    //                     "text-max-width": 8,
    //                     "text-anchor": "top",
    //                     "text-size": 11,
    //                     "icon-size": 1
    //                 },
    //                 "filter": [
    //                     "all",
    //                     [
    //                         "==",
    //                         "$type",
    //                         "Point"
    //                     ],
    //                     [
    //                         "all",
    //                         [
    //                             "==",
    //                             "scalerank",
    //                             1
    //                         ],
    //                         [
    //                             "==",
    //                             "localrank",
    //                             1
    //                         ]
    //                     ]
    //                 ],
    //                 "type": "symbol",
    //                 "source": "mapbox",
    //                 "id": "poi_label",
    //                 "paint": {
    //                     "text-color": "#666",
    //                     "text-halo-width": 1,
    //                     "text-halo-color": "rgba(255,255,255,0.75)",
    //                     "text-halo-blur": 1
    //                 },
    //                 "source-layer": "poi_label"
    //             },
    //             {
    //                 "interactive": true,
    //                 "layout": {
    //                     "symbol-placement": "line",
    //                     "text-field": "{name_en}",
    //                     "text-font": [
    //                         "Open Sans Semibold",
    //                         "Arial Unicode MS Bold"
    //                     ],
    //                     "text-transform": "uppercase",
    //                     "text-letter-spacing": 0.1,
    //                     "text-size": {
    //                         "base": 1.4,
    //                         "stops": [
    //                             [
    //                                 10,
    //                                 8
    //                             ],
    //                             [
    //                                 20,
    //                                 14
    //                             ]
    //                         ]
    //                     }
    //                 },
    //                 "filter": [
    //                     "all",
    //                     [
    //                         "==",
    //                         "$type",
    //                         "LineString"
    //                     ],
    //                     [
    //                         "in",
    //                         "class",
    //                         "motorway",
    //                         "primary",
    //                         "secondary",
    //                         "tertiary",
    //                         "trunk"
    //                     ]
    //                 ],
    //                 "type": "symbol",
    //                 "source": "mapbox",
    //                 "id": "road_major_label",
    //                 "paint": {
    //                     "text-color": "#666",
    //                     "text-halo-color": "rgba(255,255,255,0.75)",
    //                     "text-halo-width": 2
    //                 },
    //                 "source-layer": "road_label"
    //             },
    //             {
    //                 "interactive": true,
    //                 "minzoom": 8,
    //                 "layout": {
    //                     "text-field": "{name_en}",
    //                     "text-font": [
    //                         "Open Sans Semibold",
    //                         "Arial Unicode MS Bold"
    //                     ],
    //                     "text-max-width": 6,
    //                     "text-size": {
    //                         "stops": [
    //                             [
    //                                 6,
    //                                 12
    //                             ],
    //                             [
    //                                 12,
    //                                 16
    //                             ]
    //                         ]
    //                     }
    //                 },
    //                 "filter": [
    //                     "all",
    //                     [
    //                         "==",
    //                         "$type",
    //                         "Point"
    //                     ],
    //                     [
    //                         "in",
    //                         "type",
    //                         "town",
    //                         "village",
    //                         "hamlet",
    //                         "suburb",
    //                         "neighbourhood",
    //                         "island"
    //                     ]
    //                 ],
    //                 "type": "symbol",
    //                 "source": "mapbox",
    //                 "id": "place_label_other",
    //                 "paint": {
    //                     "text-color": "#666",
    //                     "text-halo-color": "rgba(255,255,255,0.75)",
    //                     "text-halo-width": 1,
    //                     "text-halo-blur": 1
    //                 },
    //                 "source-layer": "place_label"
    //             },
    //             {
    //                 "interactive": true,
    //                 "layout": {
    //                     "text-field": "{name_en}",
    //                     "text-font": [
    //                         "Open Sans Bold",
    //                         "Arial Unicode MS Bold"
    //                     ],
    //                     "text-max-width": 10,
    //                     "text-size": {
    //                         "stops": [
    //                             [
    //                                 3,
    //                                 12
    //                             ],
    //                             [
    //                                 8,
    //                                 16
    //                             ]
    //                         ]
    //                     }
    //                 },
    //                 "maxzoom": 16,
    //                 "filter": [
    //                     "all",
    //                     [
    //                         "==",
    //                         "$type",
    //                         "Point"
    //                     ],
    //                     [
    //                         "==",
    //                         "type",
    //                         "city"
    //                     ]
    //                 ],
    //                 "type": "symbol",
    //                 "source": "mapbox",
    //                 "id": "place_label_city",
    //                 "paint": {
    //                     "text-color": "#666",
    //                     "text-halo-color": "rgba(255,255,255,0.75)",
    //                     "text-halo-width": 1,
    //                     "text-halo-blur": 1
    //                 },
    //                 "source-layer": "place_label"
    //             },
    //             {
    //                 "interactive": true,
    //                 "layout": {
    //                     "text-field": "{name_en}",
    //                     "text-font": [
    //                         "Open Sans Regular",
    //                         "Arial Unicode MS Regular"
    //                     ],
    //                     "text-max-width": 10,
    //                     "text-size": {
    //                         "stops": [
    //                             [
    //                                 3,
    //                                 14
    //                             ],
    //                             [
    //                                 8,
    //                                 22
    //                             ]
    //                         ]
    //                     }
    //                 },
    //                 "maxzoom": 12,
    //                 "filter": [
    //                     "==",
    //                     "$type",
    //                     "Point"
    //                 ],
    //                 "type": "symbol",
    //                 "source": "mapbox",
    //                 "id": "country_label",
    //                 "paint": {
    //                     "text-color": "#666",
    //                     "text-halo-color": "rgba(255,255,255,0.75)",
    //                     "text-halo-width": 1,
    //                     "text-halo-blur": 1
    //                 },
    //                 "source-layer": "country_label"
    //             }
    //         ]
    //     }
    // );

    const [mapStyle, setMapStyle] = useState(
        "mapbox://styles/loretto25/ckgz470510xp41aoh005z593v"
    );


    const visibleEditor = useSelector(state => state.visibleEditor);
    const [noiseSources, setNoiseSource] = useState([]);
    const selectedBuilding = useSelector(state => state.selectedBuilding);
    const loading = useSelector(state => state.loading);
    const dispatch = useDispatch();
    // const inputEl = useCallback(node => {
    //     if (node !== null) {
    //         setHeight(node.getBoundingClientRect().height);
    //     }
    // }, []);

    const mapRef = useRef();

    //43.941260, 10.910654
    const [state, setState] = useState(
        {
            viewport: {
                latitude: 43.941260,
                longitude: 10.910654,
                zoom: 14,
                // bearing: -60,
                // pitch: 60
            },
            mode: null,
            selectedFeatureIndex: null,
            editorNode: null,
            home: [43.941260, 10.910654]
        }
    );

    const editorRef = useCallback(node => {
        if (node !== null) {
            setState({...state, editorNode: node})
        }
    }, []);

    const _updateViewport = (viewport) => {
        setState({...state, viewport});
    };

    const _onSelect = (options) => {
        setState({...state, selectedFeatureIndex: options && options.selectedFeatureIndex});
        console.log(options.selectedFeatureIndex);
    };


    const _onDelete = () => {
        const selectedIndex = state.selectedFeatureIndex;
        if (selectedIndex !== null && selectedIndex >= 0) {
            state.editorNode.deleteFeatures(selectedIndex);
        }
    };

    const _onMapClick = (event) => {
        const features = event.features;
        const feature = features[0];
        if(feature.layer.id === "building"){
            console.log(feature);
            const points = feature.geometry.coordinates[0];
            console.log(points);
            var building = {
                points: points
            }

            dispatch({
                type: "UPDATEBUILDING",
                selectedBuilding: building
            })
        }
    }

    const _onUpdate = ({editType}) => {
        if (editType === 'addFeature') {
            setState({...state, mode: new EditingMode()});
        }
    };

    const formatPoints = (points) => {
        var payload = [];
        for (var i = 0; i < points.length; i++){
            var point = {
                x: points[i][1],
                y: points[i][0]
            }

            payload = [...payload, point];
        }

        //aggiungo un punto per avere ultimo lato

        payload = [...payload, {
            x: points[0][1],
            y: points[0][0]
        }];

        return payload;
    }

    const computeColor = (exposure) => {

    }

    const fetchExposure = () => {
        const url = "https://z5a0ny9hyh.execute-api.eu-central-1.amazonaws.com/test";

        axios.post(url, {points: formatPoints(selectedBuilding.points)})
            .then(function (response){
                console.log(response)
                console.log(response.data.sides);
                var sides = response.data.sides;
                for(var i = 0; i < sides.length; i++){
                    sides[i] = {...sides[i], id: i, rooms: []}
                }

                console.log(sides);
                dispatch({
                    type: "UPDATESIDES",
                    sides: sides
                })

            }).catch(function (error) {
                console.log(error);
            });

    }
    //api per calcolo esposizione con aequora
    //https://z5a0ny9hyh.execute-api.eu-central-1.amazonaws.com/test

    const onExposureCompute = () => {
        fetchExposure();
    }

    const fetchNoise = () => {
        const url = "https://mo2qbzkp35.execute-api.eu-central-1.amazonaws.com/test?address=Via Torquato Tasso 21/A Pistoia&radius=300";

        axios.get(url)
            .then(function (response) {
                // handle success
                console.log(response.data.sources);
                setNoiseSource(response.data.sources);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    const onNoiseClick = () => {
       fetchNoise();
    }

    const _renderDrawTools = () => {
        // copy from mapbox
        return (
            <div className="mapboxgl-ctrl-top-right">
                <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
                    {/*<button*/}
                    {/*    className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon"*/}
                    {/*    title="Polygon tool (p)"*/}
                    {/*    onClick={() => setState({...state, mode: new DrawPolygonMode()})}*/}
                    {/*/>*/}

                    <button onClick={()=> setMapStyle("mapbox://styles/mapbox/satellite-v9")}>
                        <FontAwesomeIcon icon={faSatellite}/>
                    </button>
                    <button onClick={()=> setMapStyle("mapbox://styles/loretto25/ckgz470510xp41aoh005z593v")}>
                        <FontAwesomeIcon icon={faRoad}/>
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faBuilding}/>
                    </button>
                    <button onClick={() => dispatch({type: "EDITORVISIBLE", visible: !visibleEditor})}>
                        <FontAwesomeIcon icon={faBorderAll}/>
                    </button>
                    <button onClick={onNoiseClick}>
                        <FontAwesomeIcon icon={faBullhorn}/>
                    </button>
                    <button onClick={onExposureCompute}>
                        <FontAwesomeIcon icon={faServer}/>
                    </button>
                    <button onClick={() => setState({...state, mode: new DrawPolygonMode()})}>
                        <FontAwesomeIcon icon={faPen}/>
                    </button>

                    <button onClick={_onDelete}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>

                    {/*<button*/}
                    {/*    className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash"*/}
                    {/*    title="Delete"*/}
                    {/*    //onClick={_onDelete}*/}
                    {/*/>*/}
                </div>
            </div>
        );
    };

    const _renderControlPanel = () => {
        const features = state.editorNode && state.editorNode.getFeatures();
        let featureIndex = state.selectedFeatureIndex;
        if (features && featureIndex === null) {
            featureIndex = features.length - 1;
        }
        const polygon = features && features.length ? features[featureIndex] : null;
        return <ControlPanel containerComponent={props.containerComponent} polygon={polygon} />;
    };

    const paintLayer = {
        'fill-extrusion-color': '#0D47A1',
        'fill-extrusion-height': [
            "interpolate", ["linear"], ["zoom"],
            15, 0,
            15.05, ["get", "height"]
        ],
        'fill-extrusion-base': [
            "interpolate", ["linear"], ["zoom"],
            15, 0,
            15.05, ["get", "min_height"]
        ],
        'fill-extrusion-opacity': 0.5
    };

    const parkLayer = {
        id: 'landuse_park',
        type: 'fill',
        source: 'landuse',
        'source-layer': 'landuse',
        filter: ['==', 'class', 'park']
    };

    const buildingLayer = {
        id: '3d-buildings',
        type: 'fill-extrusion',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true']
    };

    useEffect(()=> {
        console.log("map ref")


    }, [])

    const EMPTY_STYLE = {
        version: 8,
        sources: {},
        layers: []
    };

    const geojson = {
        type: 'FeatureCollection',
        features: [
            {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
        ]
    };

    return (
        <div>
            {
                visibleEditor ? <RoomsController styleClass="visible-controller"/> : <RoomsController styleClass="hidden-controller"/>
            }
            {
                visibleEditor ? <PlanEditor  styleClass="visible-controller"/> : <PlanEditor  styleClass="hidden-controller"/>
            }
            <AppBar></AppBar>
            <Container fluid style={{padding: 0}}>
                <ReactMapGL
                    ref={mapRef}
                    {...state.viewport}
                    width="100%"
                    height="100vh"
                    mapStyle={mapStyle}
                    onViewportChange={viewport => setState({...state, viewport})}
                    mapboxApiAccessToken={TOKEN}
                    onClick={_onMapClick}
                >
                    <Pin lat={state.home[0]} lng={state.home[1]}/>

                    {
                        noiseSources.map((source, i) => (
                            <NoisePin key={i} lat={source.lat} lng={source.lng}/>
                        ))
                    }
                    {/*<Layer*/}
                    {/*    id="3d-buildings"*/}
                    {/*    sourceId="composite"*/}
                    {/*    sourceLayer="building"*/}
                    {/*    filter={['==', 'extrude', 'true']}*/}
                    {/*    type="fill-extrusion"*/}
                    {/*    minzoom={14}*/}
                    {/*    paint={paintLayer}*/}
                    {/*    source="mapbox"*/}
                    {/*/>*/}
                    {/*<Source id='edifici' type='fill-extrusion' />*/}
                    {/*<Layer*/}
                    {/*    id='contours'*/}
                    {/*    type='line'*/}
                    {/*    source='edifici'*/}
                    {/*    source-layer='edifici'*/}
                    {/*    paint={{*/}
                    {/*        'fill-extrusion-color': '#0D47A1',*/}
                    {/*        'fill-extrusion-height': [*/}
                    {/*            "interpolate", ["linear"], ["zoom"],*/}
                    {/*            15, 0,*/}
                    {/*            15.05, ["get", "height"]*/}
                    {/*        ],*/}
                    {/*        'fill-extrusion-base': [*/}
                    {/*            "interpolate", ["linear"], ["zoom"],*/}
                    {/*            15, 0,*/}
                    {/*            15.05, ["get", "min_height"]*/}
                    {/*        ],*/}
                    {/*    }}*/}
                    {/*    filter={['==', 'extrude', 'true']}*/}
                    {/*/>*/}

                    <Source id="my-data" type="geojson" data={geojson}>
                        <Layer
                            id="point"
                            type="circle"
                            paint={{
                                'circle-radius': 10,
                                'circle-color': '#007cbf'
                            }} />
                    </Source>

                    {/*{*/}
                    {/*    noiseSources.map((source, i) => (*/}
                    {/*        <Source key={i} id={"my-data-" + i} type="geojson" data={*/}
                    {/*            {*/}
                    {/*                type: 'FeatureCollection',*/}
                    {/*                features: [*/}
                    {/*                    {*/}
                    {/*                        type: 'Feature',*/}
                    {/*                        geometry: {*/}
                    {/*                            type: 'Point',*/}
                    {/*                            coordinates: [source.lng, source.lat]*/}
                    {/*                        }*/}
                    {/*                    }*/}
                    {/*                ]*/}
                    {/*            }*/}
                    {/*        }>*/}
                    {/*            <Layer*/}
                    {/*                id={"source-"+ i}*/}
                    {/*                type="circle"*/}
                    {/*                paint={{*/}
                    {/*                    'circle-radius': 10,*/}
                    {/*                    'circle-color': '#007cbf'*/}
                    {/*                }}*/}
                    {/*            />*/}
                    {/*        </Source>*/}
                    {/*    ))*/}
                    {/*}*/}
                    {
                        <Source id={"selected-building"} type="geojson" data={
                            {
                                type: 'FeatureCollection',
                                features: [
                                    {
                                        type: 'Feature',
                                        geometry: {
                                            type: 'Polygon',
                                            coordinates: [
                                                selectedBuilding.points
                                            ]
                                        }
                                    }
                                ]
                            }
                        }>
                            <Layer
                                id={"selected-building"}
                                type="fill"
                                paint={{
                                    'fill-color': '#eeff00',
                                    'fill-opacity': 1
                                }}
                            />
                        </Source>
                    }

                    {/*<Source id="composite" type={"vector"}>*/}
                    {/*    <Layer*/}
                    {/*        id="3d-buildings"*/}
                    {/*        source-layer={"building"}*/}
                    {/*        paint={paintLayer} />*/}
                    {/*</Source>*/}


                    <Editor
                        ref={editorRef}
                        clickRadius={12}
                        style={{width: '100%', height: '100%'}}
                        mode={state.mode}
                        onSelect={_onSelect}
                        onUpdate={_onUpdate}
                        //onUpdateCursor={_onUpdateCursor}
                        // featureStyle={getFeatureStyle}
                        //editHandleStyle={getEditHandleStyle}
                    />
                    {_renderDrawTools()}
                    <AddressSearchBar/>
                    {/*{_renderControlPanel()}*/}
                </ReactMapGL>
            </Container>
            <AppFooter>
                <Row>
                    <Col lg={12}>
                        <Helm/>
                    </Col>
                </Row>
            </AppFooter>
        </div>
    );
}

export default Mappa;
