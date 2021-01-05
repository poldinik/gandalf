import Modal from "react-bootstrap/Modal";
import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ColorTag from "../ColorTag";
import './ColoreModal.css';
import Figure from "react-bootstrap/Figure";
import Bearing from "../Bearing";
import './BicoloriModal.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import NextButton from "../Helm/NextButton";

const BicoloriModal = (props) => {
    const category = props.category;
    const colori = category.colori;
    const [isFirst, setIsFirst] = useState(true);
    const [coloreNameSelected, setcoloreNameSelected] = useState("Bianco Massa P00");
    const [secondocoloreNameSelected, setsecondocoloreNameSelected] = useState("Bianco Massa P00");
    const [angoloSelected, setangoloSelected] = useState("https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/bianco_massa.jpeg");
    const [secondoangoloSelected, setsecondoangoloSelected] = useState("https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/bianco_massa.jpeg");
    const [coloreSelected, setcoloreSelected] = useState("https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/P00.jpg");
    const [secondocoloreSelected, setsecondocoloreSelected] = useState("https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/P00.jpg");
    const [selected, setselected] = useState(true);
    const [secondselected, setsecondselected] = useState(true);


    const onColoreClick = (colore) => {
        if(isFirst){
            setselected(true);
            setcoloreNameSelected(colore.nome + " " + colore.codice);
            setcoloreSelected(colore.urlImg);
            setangoloSelected(colore.img);
        }else {
            setsecondselected(true);
            setsecondocoloreNameSelected(colore.nome + " " + colore.codice);
            setsecondocoloreSelected(colore.urlImg);
            setsecondoangoloSelected(colore.img);
        }
    }

    const onFirstSecondSwitch = () => {
        setIsFirst(!isFirst);
    }

    return (
        <Modal size="xl" {...props} aria-labelledby="contained-modal-title-vcenter"  scrollable={false} className="modal-container custom-map-modal">
            {/*<Modal.Header closeButton>*/}
            {/*    <Modal.Title id="contained-modal-title-vcenter">*/}
            {/*        {category.nome}*/}
            {/*    </Modal.Title>*/}
            {/*</Modal.Header>*/}
            <Modal.Body className="show-grid">
                <Container fluid>
                    <Row style={{textAlign: "center", marginTop: "50px"}}>
                        <Col>
                            <h2 style={{color: "#0247A8", fontWeight: 700}}>{"Classe " + category.nome}</h2>
                        </Col>
                    </Row>
                    <Row style={{marginTop: "50px"}}>
                        <Col lg={6}>
                            <Row>
                                {
                                    selected ?
                                        <Col lg={6} md={6} sm={12}>
                                            <Row style={{padding: 0}}>
                                                <Figure>
                                                    <Figure.Image
                                                        width={"100%"}
                                                        src={angoloSelected}
                                                        id="myimage"
                                                    />
                                                </Figure>
                                            </Row>
                                            <Row style={{padding: 0}}>
                                                <Col>
                                                    {
                                                        isFirst ?
                                                            <Button style={{width: "100%", backgroundColor: "#0247a8"}} onClick={onFirstSecondSwitch}>
                                                                <FontAwesomeIcon icon={faCheck} style={{color: "white", position: "absolute", top: 10, right: 23}}/>
                                                                Colore Interno
                                                            </Button>
                                                            :
                                                            <Button style={{width: "100%", backgroundColor: "white", color: "black"}} onClick={onFirstSecondSwitch}>Colore Interno</Button>
                                                    }
                                                </Col>
                                            </Row>
                                            <Bearing space={"15px"}/>
                                            <Row style={{padding: 0}}>
                                                <Col>
                                                    {
                                                        selected ?
                                                            <div>
                                                                <strong>{coloreNameSelected}</strong>
                                                                <Figure style={{marginTop: "20px"}}>
                                                                    <Figure.Image
                                                                        width={"100%"}
                                                                        src={coloreSelected}
                                                                        style={{maxHeight: 150}}
                                                                    />
                                                                </Figure>
                                                            </div>
                                                            :
                                                            <div>
                                                                <strong>Nessun colore selezionato</strong>
                                                            </div>
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                        :
                                        null
                                }
                                {
                                    secondselected ?
                                        <Col lg={6} md={6} sm={12}>
                                            <Row style={{padding: 0}}>
                                                <Figure>
                                                    <Figure.Image
                                                        width={"100%"}
                                                        src={secondoangoloSelected}
                                                        id="myimage2"
                                                    />
                                                </Figure>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    {
                                                        !isFirst ?
                                                            <Button style={{width: "100%", backgroundColor: "#0247a8"}} onClick={onFirstSecondSwitch}>
                                                                <FontAwesomeIcon icon={faCheck} style={{color: "white", position: "absolute", top: 10, right: 23}}/>
                                                                Colore Esterno
                                                            </Button>
                                                            :
                                                            <Button style={{width: "100%", backgroundColor: "white", color: "black"}} onClick={onFirstSecondSwitch}>Colore Esterno</Button>
                                                    }
                                                </Col>
                                            </Row>
                                            <Bearing space={"15px"}/>
                                            <Row style={{padding: 0}}>
                                                <Col>
                                                    {
                                                        secondselected ?
                                                            <div>
                                                                <strong>{secondocoloreNameSelected}</strong>
                                                                <Figure style={{marginTop: "20px"}}>
                                                                    <Figure.Image
                                                                        width={"100%"}
                                                                        style={{maxHeight: 150}}
                                                                        src={secondocoloreSelected}
                                                                    />
                                                                </Figure>
                                                            </div>
                                                            :
                                                            <div>
                                                                <strong>Nessun colore selezionato</strong>
                                                            </div>
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                        :
                                        null
                                }
                            </Row>
                        </Col>
                        <Col lg={6} className="palette-bicolori">
                            <Row>
                                <Col>
                                    <strong>Scegli il colore selezionandolo dalla palette sottostante</strong>
                                </Col>
                            </Row>
                            <Row style={{marginTop: "20px"}}>
                                {
                                    colori.map((colore, i) => (
                                        <ColorTag key={i} nome={colore.nome} codice={colore.codice} url={colore.urlImg} onSelect={() => onColoreClick(colore)}/>
                                    ))
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer className="bicolore-modal-footer">
                <Button style={{backgroundColor: "#0247A8"}} onClick={props.onHide}>Chiudi</Button>
                <NextButton text={"Conferma"} backgroundColor={"green"} padding={"0.375rem 0.75rem"}/>
            </Modal.Footer>
        </Modal>
    );
}

export default BicoloriModal;
