import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactMapGL, {Layer, Source} from 'react-map-gl';
import './Piantina.css';
import '../../components/mapbox-gl-draw.css';
import AppFooter from "../../components/AppFooter/AppFooter";
import Container from "react-bootstrap/Container";
import AppBar from "../../components/AppBar/AppBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Helm from "../../components/Helm/Helm";
import {useDispatch, useSelector} from "react-redux";
import Bearing from "../../components/Bearing";
import StepHeader from "../../components/StepHeader/StepHeader";
import Divider from "../../components/Divider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBorderAll,
    faBuilding,
    faBullhorn, faCheck,
    faPen,
    faRoad,
    faSatellite,
    faServer, faTrash
} from "@fortawesome/free-solid-svg-icons";
import {DrawPolygonMode, EditingMode, Editor} from "react-map-gl-draw";
import {climateZoneAPI, exposureAPI, formatSelectedPoints, mergeDataSide, processSides} from "../../api/api";
import axios from "axios";
import Pin from "../../components/Pin";
import WorkingLabel from "../../components/WorkingLabel";
import PiantinaBanner from "../../components/PiantinaBanner";
import {useSnackbar} from "react-simple-snackbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import NextButton from "../../components/Helm/NextButton";

const TOKEN = 'pk.eyJ1IjoibG9yZXR0bzI1IiwiYSI6ImNqbnowdWh1cjBnZ2IzdmxqdXBtdHI5YW8ifQ.jwI7jHDNA9gbdaNiUrUxwQ'; // Set your mapbox token here

function ConfirmModal(props) {

    const onConfirm = () => {
        props.onHide();
        //TODO: va avanti.
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edificio selezionato! <FontAwesomeIcon icon={faCheck} style={{color: "green", display: "inline"}}/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Vuoi confermare questa selezione?</h5>
                <p>
                    Cliccando su "conferma" potrai passare all'editor per l'aggiunta delle stanze che si affacciano sui lati dell'edificio.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <NextButton text={"Conferma"} backgroundColor={"green"}/>
            </Modal.Footer>
        </Modal>
    );
}

const Piantina = (props) => {

    const title = useSelector(state => state.stepsList[6].title);
    const description = useSelector(state => state.stepsList[6].description);
    const id = useSelector(state => state.stepsList[6].id);
    //mapbox://styles/loretto25/ckh6chmop144g19mwi782g0th
    const [mapStyle, setMapStyle] = useState("mapbox://styles/loretto25/ckh6chmop144g19mwi782g0th");
    const mapRef = useRef();
    const state = useSelector(state => state.stepsList[6].data.mapState);
    const selectedBuildingPoints = useSelector(state => state.stepsList[6].data.selectedPoints);
    const [drawToggle, setDrawToggle] = useState(false);
    const dispatch = useDispatch();
    const [hoveredBuilding, setHoveredBuilding] = useState([]);
    const [confirmShow, setConfirmShow] = useState(false);

    const [openSnackbar, closeSnackbar] = useSnackbar(
        {
            position: 'bottom-left',
            style: {
                backgroundColor: '#0247A8',
                color: 'white',
                maxWidth: "none",
                minWidth: "150px"
            },
            closeStyle: {
                color: 'white',
            },
        }
    )

    const onUpdateViewPort = (viewport) => {
        dispatch({type: 'UPDATEMAPSTATE', mapState: {...state, viewport: viewport}});
    }

    const onUpdateMapState = (viewport, home) => {
        dispatch({type: 'UPDATEMAPSTATE', mapState: {...state, viewport: viewport, home: home}});
    }

    const onUpdateHome = ({lng, lat}) => {
        dispatch({type: 'UPDATEMAPSTATE', mapState: {...state, home: [lng, lat]}});
    }

    const onUpdateMapMode = (mode) => {
        dispatch({type: 'UPDATEMAPSTATE', mapState: {...state, mode: mode}});
    }

    const editorRef = useCallback(node => {
        if (node !== null) {
            dispatch({type: 'UPDATEMAPSTATE', mapState: {...state, editorNode: node}});
        }
    }, []);

    const _onSelect = (options) => {
        dispatch({type: 'UPDATEMAPSTATE', mapState: {...state, selectedFeatureIndex: options && options.selectedFeatureIndex}});
        // console.log(options);
        if(options.selectedFeature !== null){
            const points = options.selectedFeature.geometry.coordinates[0];
            //console.log(points);
            var building = {
                points: points
            }
            //console.log(building);
            dispatch({
                type: "UPDATESELECTEDBUILDINGPOINTS",
                selectedPoints: points
            })

            dispatch({type: "UPDATECOMPUTED", computed: false});
            dispatch({type: "REFRESHNEXTROOMID"});
            openSnackbar("Nuovo edificio disegnato!");
           // setConfirmShow(true);
        }

    };

    const _onUpdate = ({editType}) => {
        if (editType === 'addFeature') {
            dispatch({type: 'UPDATEMAPSTATE', mapState: {...state, mode: new EditingMode()}});
        }
    };

    const onMapClick = (event) => {
        //console.log(event);
        const features = event.features;
        const feature = features[0];

        if(feature.layer.id === "building-extrusion"){
            //console.log(feature);
            const points = feature.geometry.coordinates[0];
            //console.log(points);
            // var building = {
            //     points: points
            // }
            console.log("selected!")
            console.log(points);
            dispatch({
                type: "UPDATESELECTEDBUILDINGPOINTS",
                selectedPoints: points
            })

            dispatch({type: "UPDATECOMPUTED", computed: false});
            dispatch({type: "REFRESHNEXTROOMID"});
            openSnackbar("Nuovo edificio selezionato!");
            setConfirmShow(true);
        }
    }

    const onHoverMap = (event) => {

        //TODO: fare in modo che non collida con onCLick, sennò perdo l'edificio selezionato
//console.log(event);
        const features = event.features;
        const feature = features[0];

        if(feature.layer.id === "building-extrusion"){
            //console.log(feature);
            const points = feature.geometry.coordinates[0];
            //console.log(points);
            // var building = {
            //     points: points
            // }
            setHoveredBuilding(points);

            console.log(points);

        }
    }

    const onDrawBuildingPlanModeClick = () => {

        if(!drawToggle){
            dispatch({type: 'UPDATEMAPSTATE', mapState: {...state, mode: new DrawPolygonMode()}});
        }else {
            dispatch({type: 'UPDATEMAPSTATE', mapState: {...state, mode: null}});
        }

        setDrawToggle(!drawToggle);
    }

    const onTrashBuildingPlanDrawClick = () => {
        const selectedIndex = state.selectedFeatureIndex;
        if (selectedIndex !== null && selectedIndex >= 0) {
            state.editorNode.deleteFeatures(selectedIndex);
        }
    }

    const anagraficaData = useSelector(state => state.stepsList[0].data);

    const address = anagraficaData.indirizzo + " " + anagraficaData.citta + " " + anagraficaData.provincia + " " + anagraficaData.cap ;

    const fetchGeocoding = () => {

        //https://api.mapbox.com/geocoding/v5/mapbox.places/via%20Torquatp%20tasso%2021%2FA%20Pistoia%2051100.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1604853965671&autocomplete=false&limit=1
        //const geocodingAPI = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address +".json?access_token=pk.eyJ1IjoibG9yZXR0bzI1IiwiYSI6ImNqbnowdWh1cjBnZ2IzdmxqdXBtdHI5YW8ifQ.jwI7jHDNA9gbdaNiUrUxwQ&autocomplete=false&limit=1";
        const geocodingAPI = "https://0fr3jfuedk.execute-api.eu-central-1.amazonaws.com/test?address=" + address;


        dispatch({type: "UPDATELOADING", loading: true})

        axios.get(geocodingAPI)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                var geometry = response.data.geometry;

                console.log(JSON.stringify(geometry));
                const latitude = geometry.location.lat;
                const longitude = geometry.location.lng;
                onUpdateMapState({...state.viewport, latitude: latitude, longitude: longitude}, [latitude, longitude]);
                dispatch({type: "UPDATELOADING", loading: false})
            }).then(function (){

            })
            .catch(function (error) {
                //console.log(error);
                dispatch({type: "UPDATELOADING", loading: false})
            });
    }

    useEffect(() => {
        fetchGeocoding();
    }, [])

    const getCursor = ({isHovering, isDragging}) => {
        return isHovering ? 'default' : 'pointer';
    };

    const _renderDrawTools = () => {
        return (
            <div className="mapboxgl-ctrl-top-right">
                <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
                    <button onClick={()=> setMapStyle("mapbox://styles/mapbox/satellite-v9")}>
                        <FontAwesomeIcon icon={faSatellite}/>
                    </button>
                    <button onClick={()=> setMapStyle("mapbox://styles/loretto25/ckh6chmop144g19mwi782g0th")}>
                        <FontAwesomeIcon icon={faRoad}/>
                    </button>
                    {/*<button>*/}
                    {/*    <FontAwesomeIcon icon={faBuilding}/>*/}
                    {/*</button>*/}
                    {/*<button>*/}
                    {/*    <FontAwesomeIcon icon={faBorderAll}/>*/}
                    {/*</button>*/}
                    {/*<button>*/}
                    {/*    <FontAwesomeIcon icon={faBullhorn}/>*/}
                    {/*</button>*/}
                    {/*<button>*/}
                    {/*    <FontAwesomeIcon icon={faServer}/>*/}
                    {/*</button>*/}

                    {
                        !drawToggle ?
                            <button onClick={onDrawBuildingPlanModeClick}>
                                <FontAwesomeIcon icon={faPen}/>
                            </button> :
                            <button onClick={onDrawBuildingPlanModeClick} style={{backgroundColor: 'blue', color: "white"}}>
                                <FontAwesomeIcon icon={faPen}/>
                            </button>
                    }

                    <button onClick={onTrashBuildingPlanDrawClick}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div>
            <AppBar/>
            <Container fluid>
                {/*<Bearing space={"30px"}/>*/}
                {/*<StepHeader stepId={id + ". "} title={title} description={description}/>*/}
                {/*<Divider/>*/}

                <ReactMapGL
                    ref={mapRef}
                    {...state.viewport}
                    width="100%"
                    height="700px"
                    mapStyle={mapStyle}
                    getCursor={getCursor}
                    onViewportChange={viewport => onUpdateViewPort(viewport)}
                    mapboxApiAccessToken={TOKEN}
                    onClick={onMapClick}
                    // onHover={onHoverMap}
                >
                    <PiantinaBanner/>
                    <Pin lat={state.home[0]} lng={state.home[1]}/>

                    {/*{*/}
                    {/*    <Source id={"hovered-building"} type="geojson" data={*/}
                    {/*        {*/}
                    {/*            type: 'FeatureCollection',*/}
                    {/*            features: [*/}
                    {/*                {*/}
                    {/*                    type: 'Feature',*/}
                    {/*                    geometry: {*/}
                    {/*                        type: 'Polygon',*/}
                    {/*                        coordinates: [*/}
                    {/*                            hoveredBuilding*/}
                    {/*                        ]*/}
                    {/*                    }*/}
                    {/*                }*/}
                    {/*            ]*/}
                    {/*        }*/}
                    {/*    }>*/}
                    {/*        <Layer*/}
                    {/*            id={"hovered-building"}*/}
                    {/*            type="fill"*/}
                    {/*            paint={{*/}
                    {/*                'fill-color': '#3e6cf3',*/}
                    {/*                'fill-opacity': 0.7*/}
                    {/*            }}*/}
                    {/*        />*/}
                    {/*    </Source>*/}
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
                                                selectedBuildingPoints
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
                                    'fill-color': '#0041ff',
                                    'fill-opacity': 0.8
                                }}
                            />
                        </Source>
                    }




                    <Editor
                        ref={editorRef}
                        clickRadius={12}
                        style={{width: '100%', height: '100%'}}
                        mode={state.mode}
                        onSelect={_onSelect}
                        onUpdate={_onUpdate}
                    />
                    {_renderDrawTools()}
                </ReactMapGL>
            </Container>
            <AppFooter>
                <Row>
                    <Col lg={12}>
                        <Helm/>
                    </Col>
                </Row>
            </AppFooter>
            <ConfirmModal
                show={confirmShow}
                onHide={() => setConfirmShow(false)}
            />
        </div>
    );
}

export default Piantina;
