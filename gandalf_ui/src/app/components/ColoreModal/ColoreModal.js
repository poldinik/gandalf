import Modal from "react-bootstrap/Modal";
import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ColorTag from "../ColorTag";
import './ColoreModal.css';
import Figure from "react-bootstrap/Figure";
import Magnifier from "../Magnifier/Magnifier";
import NextButton from "../Helm/NextButton";

const ColoreModal = (props) => {
    const category = props.category;
    const colori = category.colori;
    const [coloreNameSelected, setcoloreNameSelected] = useState("");
    const [angoloSelected, setangoloSelected] = useState("");
    const [coloreSelected, setcoloreSelected] = useState("");
    const [selected, setselected] = useState(false);


    const onColoreClick = (colore) => {
        setselected(true);
        setcoloreNameSelected(colore.nome + " " + colore.codice);
        setcoloreSelected(colore.urlImg);
        setangoloSelected(colore.img);
    }

    return (
        <Modal size="xl" {...props} aria-labelledby="contained-modal-title-vcenter"  scrollable={false} className="modal-container custom-map-modal">
            {/*<Modal.Header closeButton>*/}
            {/*    <Modal.Title id="contained-modal-title-vcenter">*/}
            {/*        {category.nome}*/}
            {/*    </Modal.Title>*/}
            {/*</Modal.Header>*/}
            <Modal.Body className="show-grid">
                <Container>
                    <Row style={{textAlign: "center", marginTop: "50px"}}>
                        <Col>
                            <h2 style={{color: "#0247A8", fontWeight: 700}}>{"Classe " + category.nome}</h2>
                        </Col>
                    </Row>
                    <Row style={{marginTop: "50px"}}>
                        <Col lg={6}>
                            <Row>
                                <Col>
                                    {
                                        selected ?
                                            <Magnifier>
                                                <Figure>
                                                    <Figure.Image
                                                        width={"100%"}
                                                        src={angoloSelected}
                                                        id="myimage"
                                                    />
                                                </Figure>
                                            </Magnifier>
                                            :
                                            null
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={6}>
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
                            <Row>
                                <Col>
                                    {
                                        selected ?
                                            <div>
                                                <strong>{"Colore selezionato: " + coloreNameSelected}</strong>
                                                <Figure style={{marginTop: "20px"}}>
                                                    <Figure.Image
                                                        width={"50%"}
                                                        src={coloreSelected}
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
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer className="colore-modal-footer">
                <Button style={{backgroundColor: "#0247A8"}} onClick={props.onHide}>Indietro</Button>
                <NextButton text={"Conferma"} backgroundColor={"green"} padding={"0.375rem 0.75rem"}/>
            </Modal.Footer>
        </Modal>
    );
}

export default ColoreModal;
