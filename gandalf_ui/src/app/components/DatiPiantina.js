import React from "react";
import './DatiPiantina.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import {useSelector} from "react-redux";
import Bearing from "./Bearing";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";

const DatiPiantina = () => {

    const utilizzo = useSelector(state => state.stepsList[3].data.filter(d => d.selected === true))[0].title;
    const abitazione = useSelector(state => state.stepsList[4].data.filter(d => d.selected === true))[0].title;
    const elaboratedData = useSelector(state => state.stepsList[7].data.elaboratedData);
    const anagraficaData = useSelector(state => state.stepsList[0].data);
    const address = anagraficaData.indirizzo + " " + anagraficaData.citta + " " + anagraficaData.provincia + " " + anagraficaData.cap ;

    var data;
    if(elaboratedData === null){
        data = {
            address: address
        }
    }else {
        data = {
            address: address,
            zone: elaboratedData.zone,
            hasl: elaboratedData.hasl,
            degreesday: elaboratedData.degreesday
        }
    }



    //UPDATEELABORATEDDATA

    const getAggettivo = () => {
        if(abitazione[abitazione.length - 1] === "o"){
            return "adibito"
        }
        return "adibita";
    }
    return (
        <Row>
            <Col lg={6}>
                <Card className="data-card">
                    <Card.Body style={{color: "white", backgroundColor: "#0148a8"}}>
                        <Row>
                            <Col lg={6}>
                                <Card.Title style={{fontSize: 16, fontWeight: 600, color: "white", backgroundColor: "#0148a8"}}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{marginRight: 10}}/>
                                    {data.address}
                                </Card.Title>
                                {
                                    elaboratedData !== null ?
                                        <Card.Subtitle style={{fontSize: 13}} className="mb-2">{abitazione} {getAggettivo()} {utilizzo.toLowerCase()}</Card.Subtitle>
                                        :
                                        null
                                }


                                {/*<Bearing space={"20px"}/>*/}
                                {/*{*/}
                                {/*    data.zone !== "" ? <Card.Text>Zona climatica: {data.zone  + " (" + data.degreesday + " Gradi Giorno)"}</Card.Text> : <Card.Text/>*/}
                                {/*}*/}
                                {/*{*/}
                                {/*    data.hasl !== "" ? <Card.Text>Altezza dal livello del mare: {data.hasl} m</Card.Text> : <Card.Text/>*/}
                                {/*}*/}
                            </Col>
                            <Col lg={6}>
                                <Row>
                                    {
                                        elaboratedData !== null ? <Card.Text><strong>Zona climatica</strong>: <strong>{data.zone }</strong> {" (" + data.degreesday + " Gradi-Giorno)"}</Card.Text> : <Card.Text/>
                                    }
                                </Row>
                                <Row>
                                    {
                                        elaboratedData !== null ? <Card.Text><strong>Altezza dal livello del mare</strong>: {data.hasl} m</Card.Text> : <Card.Text/>
                                    }
                                </Row>
                            </Col>


                            {/*<Col lg={6}>*/}
                            {/*    <Row>*/}
                            {/*        <Col style={{padding: 0}}>*/}
                            {/*            Legenda Esposizioni*/}
                            {/*        </Col>*/}
                            {/*    </Row>*/}
                            {/*    <Bearing space={"20px"}/>*/}
                            {/*    <Row>*/}
                            {/*        <Col lg={6}>*/}
                            {/*            <Row className="zone-row">*/}
                            {/*                <div className="zone-color blue"/>*/}
                            {/*                <div style={{display: "inline", fontWeight: 600, color: "black"}}>*/}
                            {/*                    Nord*/}
                            {/*                </div>*/}
                            {/*            </Row>*/}
                            {/*            <Row className="zone-row">*/}
                            {/*                <div className="zone-color yellow"/>*/}
                            {/*                Sud*/}
                            {/*            </Row>*/}
                            {/*        </Col>*/}
                            {/*        <Col lg={6}>*/}
                            {/*            <Row className="zone-row">*/}
                            {/*                <div className="zone-color green"/>*/}
                            {/*                Est*/}
                            {/*            </Row>*/}
                            {/*            <Row className="zone-row">*/}
                            {/*                <div className="zone-color red"/>*/}
                            {/*                Ovest*/}
                            {/*            </Row>*/}
                            {/*        </Col>*/}
                            {/*    </Row>*/}
                            {/*</Col>*/}
                        </Row>

                    </Card.Body>
                </Card>
            </Col>
            {/*<Col lg={6}>*/}
            {/*    <Card className="data-card">*/}
            {/*        <Card.Body>*/}
            {/*            <Card.Title>{data.address}</Card.Title>*/}
            {/*            <Card.Subtitle className="mb-2 text-muted">{abitazione} {getAggettivo()} {utilizzo.toLowerCase()}</Card.Subtitle>*/}
            {/*            <Bearing space={"20px"}/>*/}
            {/*            {*/}
            {/*                elaboratedData !== null ? <Card.Text>Zona climatica: {data.zone  + " (" + data.degreesday + " Gradi Giorno)"}</Card.Text> : <Card.Text/>*/}
            {/*            }*/}
            {/*            {*/}
            {/*                elaboratedData !== null ? <Card.Text>Altezza dal livello del mare: {data.hasl} m</Card.Text> : <Card.Text/>*/}
            {/*            }*/}
            {/*        </Card.Body>*/}
            {/*    </Card>*/}
            {/*</Col>*/}
        </Row>
    )
}

export default DatiPiantina;
