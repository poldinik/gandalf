import React, {useState} from "react";
import AppBar from "../../components/AppBar/AppBar";
import {Container} from "react-bootstrap";
import Bearing from "../../components/Bearing";
import StepHeader from "../../components/StepHeader/StepHeader";
import Divider from "../../components/Divider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SquareChoice from "../../components/SquareChoice/SquareChoice";
import AppFooter from "../../components/AppFooter/AppFooter";
import Card from "react-bootstrap/Card";
import ClasseColoreChoice from "../../components/ClasseColoreChoice";
import Helm from "../../components/Helm/Helm";
import {useSelector} from "react-redux";
import Modal from "react-bootstrap/Modal";
import ColoreModal from "../../components/ColoreModal/ColoreModal";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo, faInfoCircle, faSwatchbook} from "@fortawesome/free-solid-svg-icons";
import WorkingLabel from "../../components/WorkingLabel";
import './Colori.css';
import BicoloriModal from "../../components/ColoreModal/BicoloriModal";
import MaggiorazionePrezziModal from "../../components/ColoreModal/MaggiorazionePrezziModal";

const Colori = () => {

    const title = useSelector(state => state.stepsList[8].title);
    const description = useSelector(state => state.stepsList[8].description);
    const id = useSelector(state => state.stepsList[8].id);
    const colors = useSelector(state => state.stepsList[8].data.colors);

    const elegant = colors[0];
    const elegantStar = colors[1];
    const prestige = colors[2];
    const city = colors[3];
    const realWood = colors[4];
    const p00 = colors[5];
    const most = colors[6];
    const bicolori = colors[7];


    const [show, setShow] = useState(false);
    const [bicoloreshow, setBicoloreShow] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({
        title: "",
        colori: []
    });

    const [bicoloreCategory, setbicoloreCategory] = useState({
        title: "",
        colori: []
    });

    const [showMaggiorazione, setShowMaggiorazione] = useState(false);
    const onMaggiorazioneClick = () => {
        setShowMaggiorazione(true);
    }


    return (
        <div>
            {/*<WorkingLabel text={"Sotto sviluppo"}/>*/}
            <Container fluid>
                <Bearing space={"30px"}/>
                <StepHeader stepId={id + ". "} title={title}/>
                <Container fluid>
                    <Row>
                        <Col>
                            <ClasseColoreChoice onButtonClick={() => {
                                setShow(true);
                                setCurrentCategory(p00);
                            }} title={"P00"} description={<div style={{display: "inline"}}>Il bianco è il colore standard delle finestre PVC. Infatti, sul prezzo delle finestre bianche <div onClick={onMaggiorazioneClick} style={{textDecoration: "underline", cursor: "pointer", display: "inline"}}>si calcolano le maggiorazioni dei colori</div> effetto legno.</div>}/>
                        </Col>
                        <Col>
                            <ClasseColoreChoice onButtonClick={() => {
                                setShow(true);
                                setCurrentCategory(elegant);
                            }} title={"Elegant"} description={
                                <div style={{display: "inline"}}>In questa classe ci sono i 3 colori più venduti, <p style={{textDecoration: "underline", display: "inline"}}>Golden Oak, Noce, Bianco Antico che insieme al P00</p><strong> sono gli unici disponibili per il PV5Plus</strong></div>
                            }/>
                        </Col>
                        <Col>
                            <ClasseColoreChoice onButtonClick={() => {
                                setShow(true);
                                setCurrentCategory(prestige)
                            }}
                                                title={"Prestige"}
                                                description={
                                                    <div style={{display: "inline"}}>Le otto essenze del legno più ricercate, compreso il nobile<strong style={{cursor: "pointer"}}> Ciliegio P43</strong><br/><br/><br/><br/></div>
                                                }/>
                        </Col>
                        <Col>
                            <ClasseColoreChoice onButtonClick={() => {
                                setShow(true);
                                setCurrentCategory(city);
                            }} title={"City"}
                                                description={
                                                    <div style={{display: "inline"}}>I più classici colori per le finestre. Quattordici effetti dissimili ideoni per ambienti moderni e anche commerciiali come <strong style={{cursor: "pointer"}}> Ottone Spazzolato P32</strong></div>
                                                }/>
                        </Col>
                        <Col>
                            <ClasseColoreChoice onButtonClick={() => {
                                setShow(true);
                                setCurrentCategory(realWood);
                            }} title={"Real Wood"}
                                                description={
                                                    <div style={{display: "inline"}}>Dieci pellicole con un'attraente groffratura che conferisce alle finestre l'aspetto naturale del legno sia alla vista, sia al tocco. <br/><br/></div>
                                                }/>
                        </Col>
                    </Row>
                    <div>
                        <Card>
                            <Card.Body>
                                <FontAwesomeIcon icon={faInfoCircle} style={{color: "#0247A8", position: "absolute", top: -5, left: -12, fontSize: "25px"}}/>
                                <Row>
                                    <Col style={{color: "#0247A8"}}>
                                        <h4>LE FINESTRE BICOLORE</h4>
                                        <p style={{marginTop: "20px"}}>Le finstre bicolore si possono realizzare con due <strong>metodi</strong>:</p>
                                        <ul>
                                            <li>
                                                1. Applicando una pellicola colorata ad una finestra bianca, indifferentemente dal lato inteno o esterno
                                            </li>
                                            <li>
                                                2. Applicando due pellicole di colore diverso ai due lat della finestra (bicolore due lati)
                                            </li>
                                        </ul>
                                        <div style={{marginTop: "20px"}}>
                                            <p>Per convenzione si parla di "bicolore un lato" oppure di "bicolore due lati"</p>
                                            <p>La possibilità di possedere finestre di due colore corrisponde alle esigenze estetiche di chi seglie e talvolta per bypassare i vincoli paesaggistici imposti dalle amminstrazioni locali o dai regolamenti condominiali. Ovviamente questi vincoli riguardano il lato esterno, all'interno decidi tu il colore.</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Container>
                                    <Row>
                                        <Col lg={6} md={6} sm={12}>
                                            <ClasseColoreChoice onButtonClick={() => {
                                                setBicoloreShow(true);
                                                setbicoloreCategory(bicolori);
                                            }} title={"Bicolori"}
                                                                description={
                                                                    <div style={{display: "inline"}}><strong>39</strong> colori per le tue finestre abbinabili dal lato interno e dal lato esterno ("bicolore due lati"). Oppure abbinabili al bianco P00 ("Bicolore un lato").</div>
                                                                }/>
                                        </Col>
                                        <Col lg={6} md={6} sm={12}>
                                            <ClasseColoreChoice  onButtonClick={() => {
                                                setShow(true);
                                                setCurrentCategory(elegantStar);
                                            }} title={"Elgant Start"}
                                                                 description={
                                                                     <div>La classe bicolore composta da quattro colori effetto legno e grigio antracite all'esterno, e il bianco P00 all'interno. I più scelti in presenza di vincoli.</div>
                                                                 }
                                            />
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>

                    </div>
                </Container>
                <ColoreModal show={show} onHide={() => setShow(false)} category={currentCategory}/>
                <BicoloriModal show={bicoloreshow} onHide={() => setBicoloreShow(false)} category={bicoloreCategory}/>
                <MaggiorazionePrezziModal show={showMaggiorazione} onHide={() => setShowMaggiorazione(false)}/>
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

export default Colori;
