import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobeEurope, faNetworkWired, faSearch} from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Divider from "../../Divider/Divider";
import Bearing from "../Bearing";
import LayerItem from "../LayerItem/LayerItem";
import './AddLayersModal.css';

const AddLayersModal = (props) => {

    const layers = [
        {
            title: "Attività umane",
            subtitle: "(L4, G1SST)",
            description: "Multi-mission / GHRSST"
        },
        {
            title: "Cartografia",
            subtitle: "(L4, G1SST)",
            description: "Multi-mission / GHRSST"
        },
        {
            title: "Meteo",
            subtitle: "(L4, G1SST)",
            description: "Multi-mission / GHRSST"
        },
        {
            title: "Geometrie",
            subtitle: "(L4, G1SST)",
            description: "Multi-mission / GHRSST"
        },
        {
            title: "Geometrie",
            subtitle: "(L4, G1SST)",
            description: "Multi-mission / GHRSST"
        },
        {
            title: "Geometrie",
            subtitle: "(L4, G1SST)",
            description: "Multi-mission / GHRSST"
        }
    ]

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Aggiungi livelli
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Row>
                        <Col style={{padding: 0}}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder=""
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-secondary"> <FontAwesomeIcon icon={faSearch}/> Cerca</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <Row style={{width: "100%"}}>
                                <Col>Categorie</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Divider/>
                                </Col>
                            </Row>
                            <Form>

                                {
                                    layers.map((layer, i) => (
                                        <div key={i} className="mb-3">
                                            <Form.Check
                                                type={"checkbox"}
                                                id={`default-checkbox`}
                                                label={`${layer.title}`}
                                            />
                                        </div>
                                    ))
                                }
                            </Form>
                        </Col>
                        <Col lg={4} style={{height: "500px", overflow: "scroll"}}>
                            {
                                layers.map((layer, i) => (
                                    <LayerItem key={i} layer={layer}/>
                                ))
                            }
                        </Col>
                        <Col lg={4}>
                            <Bearing space={"50px"}/>
                            <Row style={{textAlign: "center"}}>
                                <Col>
                                    <Row style={{display: "inline"}}><FontAwesomeIcon icon={faGlobeEurope} style={{fontSize: "40px"}}/></Row>
                                    <div style={{fontSize: "20px", marginTop: "15px"}}>
                                        <strong>Nessun livello selezionato.</strong>
                                    </div>
                                    <p>Seleziona un livello per consultare qui i dettagli!</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant={"success"}>Chiudi</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddLayersModal;
