import React from "react";
import './Splash.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import {Container} from "react-bootstrap";

const Splash = ({now = 0}) => {

    const progressInstance = <ProgressBar now={now} label={`${now}%`} />;
    return (
        <Container fluid>
            <div style={{textAlign: "center", marginTop: 80}}>
                <Row>
                    <Col>
                        <div className="mrdrill-brand">
                            mr. drill
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop: 20}}>
                    <Col>
                        <div className="moment">
                            Un momento, l'applicazione sta caricando
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop: 80}}>
                    <Col>
                        <img src="https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/loader.png" alt="loader" height={250}/>
                    </Col>
                </Row>
                <Row style={{marginTop: 50}}>
                    <Container>
                        <Row>
                            <Col lg={6} style={{margin: "auto"}}>
                                {progressInstance}
                            </Col>
                        </Row>
                    </Container>
                </Row>
                <Row style={{marginTop: 20}}>
                    <Col>
                        <p>Stiamo preparando l'ambiente di lavoro. <br/>
                        Questa operazione dovrebbe impiegare pochi secondi</p>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default Splash;
