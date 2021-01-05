import Modal from "react-bootstrap/Modal";
import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import './ColoreModal.css';
import './MaggiorazionePrezziModal.css';
import Bearing from "../Bearing";

const TabellaRow = ({index, classe, ncolori, incremento, informazione, backgroundColor = "#e3f2fd"}) => {
    const h = 50;
    return (
        <tr className="row-maggiorazione" style={{backgroundColor: backgroundColor}}>
            <td style={{width: 92, height: h}}>{index}</td>
            <td style={{width: 193, height: h, fontWeight: "bold"}}>{classe}</td>
            <td style={{width: 93, height: h}}>{ncolori}</td>
            <td style={{width: 100, height: h, fontWeight: "bold"}}>{incremento}</td>
            <td style={{width: 427, height: h}}>{informazione}</td>
        </tr>
    )
}


const MaggiorazionePrezziModal = (props) => {


    const data = [
        [
            "Bianco Pasta",
            "1",
            "0",
            "È il colore che rappresenta il prezzo standard su cui calcolare la maggiorazione delle finestre colorate."
        ],
        [
            "Crema",
            "1",
            "5",
            "Colore in pasta, ottenuto senza applicazione di pellicole."
        ],
        [
            "Elegant",
            "7",
            "15",
            "Pellicole effetto legno."
        ],
        [
            "Prestige",
            "8",
            "20",
            "Pellicole effetto legno."
        ],
        [
            "Elegant Star",
            "4",
            "20",
            "Bicolore: bianco in pasta lato interno e pellicola lato esterno (a scelta tra Noce, Golden Oak, Mogano, Grigio Antracite)."
        ],
        [
            "Bianco Pasta",
            "14",
            "30",
            "Pellicole effetto legno e altre finiture adatte per ambienti moderni."
        ],
        [
            "Real Wood",
            "10",
            "30",
            "Pellicole effetto legno anche al tatto."
        ],
        [
            "Bicolore (due lati)",
            "33",
            "30",
            "Pellicole di colore diverso applicate su entrambi i lati.."
        ],
        [
            "Bicolore (un lato)",
            "33",
            "20",
            "Bicolori (1 lato)"
        ],
    ]

    return (
        <Modal size="xl" {...props} aria-labelledby="contained-modal-title-vcenter-maggiorazione"  scrollable={false} className="modal-container custom-map-modal">
            {/*<Modal.Header closeButton>*/}
            {/*    <Modal.Title id="contained-modal-title-vcenter-maggiorazione">*/}
            {/*        Tabella maggiorazione prezzi colori*/}
            {/*    </Modal.Title>*/}
            {/*</Modal.Header>*/}
            <Modal.Body className="show-grid">
                <Container fluid>
                    <Row style={{textAlign: "center"}}>
                        <Col>
                            <h5 style={{fontWeight: "bold", color: "#0247a8"}}>Tabella maggiorazione prezzi colori</h5>
                        </Col>
                    </Row>
                    <Bearing space={"20px"}/>
                    <Row style={{textAlign: "center"}}>
                        <Col>
                            <p style={{color: "#0247a8"}}>La cartella è formata da 2
                                colori in pasta, sono i profilati in PVC che appositamente trattati assumono il colore
                                bianco o crema. I colori delle pellicole applicate sui profilati sono 33 e con esse si
                                ottengono le finestre bicolore da due o un solo lato delle finestre.
                                Real Wood (10 colori) sono le pellicole che riproducono le essenze del legno al colore e
                                al tatto.
                                La tabella contiene le maggiorazioni percentuali per calcolare il prezzo delle diverse
                                classi di colore.</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <table style={{height: "100%", width: "100%",marginTop:"35px", fontSize:"22px"}}>
                                <tbody>
                                <tr className="white-text" style={{background:"#1976d2", height: 50, fontSize: 18, color: "white"}}>
                                    <td className="header-col-maggiorazione" style={{width: 92}}>N.</td>
                                    <td className="header-col-maggiorazione" style={{width: 193}}>Classe Categoria</td>
                                    <td className="header-col-maggiorazione" style={{width: 93}}>N colori</td>
                                    <td className="header-col-maggiorazione" style={{width: 100}}>% Incremento</td>
                                    <td className="header-col-maggiorazione" style={{width: 427}}>Informazione</td>
                                </tr>
                                {
                                    data.map((row, i) => (

                                        i % 2 === 0 ?

                                        <TabellaRow
                                            key={i}
                                            index={i + 1}
                                            classe={row[0]}
                                            ncolori={row[1]}
                                            incremento={row[2]}
                                            informazione={row[3]}
                                            backgroundColor={"#e3f2fd"}
                                        /> :
                                            <TabellaRow
                                                index={i + 1}
                                                classe={row[0]}
                                                ncolori={row[1]}
                                                incremento={row[2]}
                                                informazione={row[3]}
                                                backgroundColor={"#ffffff"}
                                            />
                                    ))
                                }
                                {/*<tr className="row-maggiorazione">*/}
                                {/*    <td style={"width: 92px; height: 23px;"}>1</td>*/}
                                {/*    <td style={"width: 193px; height: 23px;font-weight:bold"}>Bianco pasta</td>*/}
                                {/*    <td style={"width: 93px; height: 23px;"}>1</td>*/}
                                {/*    <td style={"width: 100px; height: 23px;font-weight:bold"}>0</td>*/}
                                {/*    <td style={"width: 427px; height: 23px;"}> È il colore che rappresenta il prezzo*/}
                                {/*        standard su cui calcolare la maggiorazione delle finestre colorate.*/}
                                {/*    </td>*/}
                                {/*</tr>*/}
                                {/*<tr style="height: 23px;font-size:16px;">*/}
                                {/*    <td style="width: 92px; height: 23px;">2</td>*/}
                                {/*    <td style="width: 193px; height: 23px;font-weight:bold">Crema</td>*/}
                                {/*    <td style="width: 93px; height: 23px;">1</td>*/}
                                {/*    <td style="width: 100px; height: 23px;font-weight:bold">5</td>*/}
                                {/*    <td style="width: 427px; height: 23px;">Colore in pasta, ottenuto senza applicazione*/}
                                {/*        di pellicole.*/}
                                {/*    </td>*/}
                                {/*</tr>*/}
                                {/*<tr style="background:#e3f2fd; height: 23px;font-size:16px;">*/}
                                {/*    <td style="width: 92px; height: 23px;">3</td>*/}
                                {/*    <td style="width: 193px; height: 23px;font-weight:bold">Elegant</td>*/}
                                {/*    <td style="width: 93px; height: 23px;">7</td>*/}
                                {/*    <td style="width: 100px; height: 23px;font-weight:bold">15</td>*/}
                                {/*    <td style="width: 427px; height: 23px;">Pellicole effetto legno.</td>*/}
                                {/*</tr>*/}
                                {/*<tr style="height: 23px;font-size:16px;">*/}
                                {/*    <td style="width: 92px; height: 23px;">4</td>*/}
                                {/*    <td style="width: 193px; height: 23px;font-weight:bold">Prestige</td>*/}
                                {/*    <td style="width: 93px; height: 23px;">8</td>*/}
                                {/*    <td style="width: 100px; height: 23px;font-weight:bold">20</td>*/}
                                {/*    <td style="width: 427px; height: 23px;">Pellicole effetto legno.</td>*/}
                                {/*</tr>*/}
                                {/*<tr style="background:#e3f2fd; height: 23px;font-size:16px;">*/}
                                {/*    <td style="width: 92px; height: 23px;">5</td>*/}
                                {/*    <td style="width: 193px; height: 23px;font-weight:bold">Elegant star</td>*/}
                                {/*    <td style="width: 93px; height: 23px;">4</td>*/}
                                {/*    <td style="width: 100px; height: 23px;font-weight:bold">20</td>*/}
                                {/*    <td style="width: 427px; height: 23px;">Bicolore: bianco in pasta lato interno e*/}
                                {/*        pellicola lato esterno (a scelta tra Noce, Golden Oak, Mogano, Grigio*/}
                                {/*        Antracite).*/}
                                {/*    </td>*/}
                                {/*</tr>*/}
                                {/*<tr style="height: 23px;font-size:16px;">*/}
                                {/*    <td style="width: 92px; height: 23px;">6</td>*/}
                                {/*    <td style="width: 193px; height: 23px;font-weight:bold">City</td>*/}
                                {/*    <td style="width: 93px; height: 23px;">14</td>*/}
                                {/*    <td style="width: 100px; height: 23px;font-weight:bold">30</td>*/}
                                {/*    <td style="width: 427px; height: 23px;">Pellicole effetto legno e altre finiture*/}
                                {/*        adatte per ambienti moderni.*/}
                                {/*    </td>*/}
                                {/*</tr>*/}
                                {/*<tr style="background:#e3f2fd; height: 23px;font-size:16px;">*/}
                                {/*    <td style="width: 92px; height: 23px;">7</td>*/}
                                {/*    <td style="width: 193px; height: 23px;font-weight:bold">Real Wood</td>*/}
                                {/*    <td style="width: 93px; height: 23px;">10</td>*/}
                                {/*    <td style="width: 100px; height: 23px;font-weight:bold">30</td>*/}
                                {/*    <td style="width: 427px; height: 23px;">Pellicole effetto legno anche al tatto.</td>*/}
                                {/*</tr>*/}
                                {/*<tr style="height: 23px;font-size:16px;">*/}
                                {/*    <td style="width: 92px; height: 23px;">8</td>*/}
                                {/*    <td style="width: 193px; height: 23px;font-weight:bold">Bicolori (due lati)</td>*/}
                                {/*    <td style="width: 93px; height: 23px;">33</td>*/}
                                {/*    <td style="width: 100px; height: 23px;font-weight:bold">30</td>*/}
                                {/*    <td style="width: 427px; height: 23px;">Pellicole di colore diverso applicate su*/}
                                {/*        entrambi i lati.*/}
                                {/*    </td>*/}
                                {/*</tr>*/}
                                {/*<tr style="background:#e3f2fd; height: 23px;font-size:16px;">*/}
                                {/*    <td style="width: 92px; height: 23px;">9</td>*/}
                                {/*    <td style="width: 193px; height: 23px;font-weight:bold">Bicolori (1 lato)</td>*/}
                                {/*    <td style="width: 93px; height: 23px;">33</td>*/}
                                {/*    <td style="width: 100px; height: 23px;font-weight:bold">20</td>*/}
                                {/*    <td style="width: 427px; height: 23px;">Pellicola interna o esterna e bianco in*/}
                                {/*        pasta lato interno o esterno.*/}
                                {/*    </td>*/}
                                {/*</tr>*/}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer className="colore-modal-footer">
                <Button style={{backgroundColor: "#0247A8"}} onClick={props.onHide}>Chiudi</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MaggiorazionePrezziModal;
