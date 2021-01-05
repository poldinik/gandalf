import React, {useEffect, useState} from "react";
import AppBar from "../../components/AppBar/AppBar";
import {Container} from "react-bootstrap";
import Bearing from "../../components/Bearing";
import StepHeader from "../../components/StepHeader/StepHeader";
import Divider from "../../components/Divider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppFooter from "../../components/AppFooter/AppFooter";
import Helm from "../../components/Helm/Helm";
import {useDispatch, useSelector} from "react-redux";
import RoomsController from "../../components/RoomsController/RoomsController";
import PlanEditor from "../../components/PlanEditor/PlanEditor";
import DatiPiantina from "../../components/DatiPiantina";
import axios from "axios";
import {climateZoneAPI, exposureAPI, formatSelectedPoints, mergeDataSide, processSides} from "../../api/api";
import WorkingLabel from "../../components/WorkingLabel";
import ProgressBar from "react-bootstrap/ProgressBar";
import {useSnackbar} from "react-simple-snackbar";

const EditorPiantina = () => {

    const title = useSelector(state => state.stepsList[7].title);
    const description = useSelector(state => state.stepsList[7].description);
    const id = useSelector(state => state.stepsList[7].id);
    const computed = useSelector(state => state.stepsList[7].data.computed);
    //const data = useSelector(state => state.stepsList[3].data)
    const anagraficaData = useSelector(state => state.stepsList[0].data);
    const address = anagraficaData.indirizzo + " " + anagraficaData.citta + " " + anagraficaData.provincia + " " + anagraficaData.cap ;
    const dispatch = useDispatch();
    const selectedBuildingPoints = useSelector(state => state.stepsList[6].data.selectedPoints);
    const visibleData = useSelector(state => state.visibleEditorData);

    const setVisibleData = (visibleEditorData) => {
        dispatch({type: "UPDATEVISIBLEEDITORDATA", visibleEditorData: visibleEditorData})
    }

    const [dataPiantina, setDataPiantina] = useState({
        address: address,
        customer: anagraficaData.cognome + " " + anagraficaData.nome,
        zone: "",
        hasl: "",
        degreesday: ""
    });

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

    const [now, setNow] = useState(0);
    const [progressVisible, setprogressVisible] = useState(false);
    const [finish, setfinish] = useState(false);

    const fetchClimate = () => {
        if(!computed){
            setprogressVisible(true);
            setNow(50);
            console.log("address");
            console.log(address);
            console.log(selectedBuildingPoints);
            const climateAPI = climateZoneAPI() + "?address=" + address;
            const urlExposureAPI = exposureAPI();

            dispatch({type: "UPDATELOADING", loading: true})

            axios.get(climateAPI)
                .then(function (response) {
                    //console.log(response.data);
                    setNow(75);
                    setDataPiantina({...dataPiantina, zone: response.data.zone, degreesday: response.data.degreesday, hasl: response.data.hasl})

                    dispatch(
                        {type: "UPDATEELABORATEDDATA",
                            elaboratedData: {
                                zone: response.data.zone,
                                degreesday: response.data.degreesday,
                                hasl: response.data.hasl
                            }
                    });

                    setVisibleData(true);
                    return axios.post(urlExposureAPI, {...formatSelectedPoints(selectedBuildingPoints)});
                })
                .then(function (response) {
                    console.log("Exposure result");
                    console.log(JSON.stringify(response.data.sides));
                    dispatch({type: "UPDATELOADING", loading: false})
                    //const elaboratedSides = processSides(response.data.sides);
                    //console.log(JSON.stringify(elaboratedSides));
                    // var sidesData = [];
                    // var sides = response.data.sides;
                    //
                    // for (var i = 0 ; i < sides.length; i++){
                    //     //id={side.sideId} linePoints={side.points} color={side.color}
                    //
                    //     //TODO: i lati devono essere elaborati per essere visualizzati su svg
                    //     sidesData = [...sidesData, {
                    //         sideId: "side-" + (i + 1),
                    //         points: [sides[i].point1, sides[i].point2],
                    //         color: "black",
                    //         rooms: [],
                    //         exposure: sides[i].exposure
                    //     }];
                    // }
                    //
                    //
                    //dispatch({type: "UPDATESIDES", sides: elaboratedSides});
                    var computedSides = response.data.sides;
                    var processed = processSides([...response.data.points, response.data.points[0]]);
                    var sides = mergeDataSide(computedSides, processed);
                    console.log("ELABORATI");
                    console.log(JSON.stringify(sides));
                    dispatch({type: "UPDATESIDES", sides: sides});
                    dispatch({type: "UPDATECOMPUTED", computed: true});

                    setNow(100);
                    setfinish(true);
                    setTimeout(function(){
                        setprogressVisible(false);
                        openSnackbar("Dati recuperati con successo!");
                        }, 1000)
                })
                .catch(function (error) {
                    console.log(error);
                    dispatch({type: "UPDATELOADING", loading: false})
                    setNow(100);
                    setfinish(true);
                    setTimeout(function(){
                        setprogressVisible(false);
                        openSnackbar("Errore recupero dati!");
                    }, 1000)
                });

        }
    }

    useEffect(()=> {

        fetchClimate();

    },[]);

    return (
        <div>
            <AppBar/>
            <WorkingLabel text={"Sotto sviluppo"}/>
            <Container fluid>
                {/*<Bearing space={"30px"}/>*/}
                <StepHeader stepId={id + ". "} title={title} description={description}/>
                {
                    !progressVisible ? <Divider/> : null
                }
                {
                    progressVisible ?
                        !finish ?<ProgressBar animated now={now} label={`${now}%`} /> : <ProgressBar variant="success" animated now={now} label={`${now}%`} />
                        :
                        null
                }
                <Bearing space={"10px"}/>
                <Row>
                    <Col lg={6}>
                        <PlanEditor  styleClass="visible-controller"/>
                    </Col>
                    <Col lg={6}>
                        <RoomsController styleClass="visible-controller"/>
                    </Col>
                </Row>
                <Bearing space={"10px"}/>
                {
                    visibleData ? <DatiPiantina/> : null
                }
            </Container>
            <AppFooter>
                <Row>
                    <Col lg={12}>
                        <Helm/>
                    </Col>
                </Row>
            </AppFooter>
        </div>
    )
}

export default EditorPiantina;
