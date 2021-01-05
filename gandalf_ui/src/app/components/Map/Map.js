import React, {useRef, useState} from "react";
import ReactMapGL, {Layer, Source} from 'react-map-gl';
import MapController from "./MapController";

const TOKEN = 'pk.eyJ1IjoibG9yZXR0bzI1IiwiYSI6ImNqbnowdWh1cjBnZ2IzdmxqdXBtdHI5YW8ifQ.jwI7jHDNA9gbdaNiUrUxwQ'; // Set your mapbox token here

const Map = () => {

    const [mapState, setMapState] =  useState(
        {
            viewport: {
            latitude: 43.941260,
            longitude: 10.910654,
            zoom: 10,
            // bearing: -60,
            // pitch: 60
        },
        mode: null,
        selectedFeatureIndex: null,
        editorNode: null,
        home: [43.941260, 10.910654],}
        );

    const [mapStyle, setMapStyle] = useState("mapbox://styles/loretto25/ckb51sva823m21is7mhy6as2r");
    const onUpdateViewPort = (viewport) => setMapState({...mapState, viewport: viewport});
    const mapRef = useRef();
    const getCursor = ({isHovering, isDragging}) => {
        return isHovering ? 'default' : 'pointer';
    };

    return (
        <ReactMapGL
            ref={mapRef}
            {...mapState.viewport}
            width="100%"
            height="100vh"
            mapStyle={mapStyle}
            getCursor={getCursor}
            onViewportChange={viewport => onUpdateViewPort(viewport)}
            mapboxApiAccessToken={TOKEN}
        >
            {<MapController/>}
        </ReactMapGL>
    )
}

export default Map;
