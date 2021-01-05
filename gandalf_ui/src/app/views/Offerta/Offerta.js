import React, {useState} from "react";
import AppBar from "../../components/AppBar/AppBar";
import {Container, Form} from "react-bootstrap";
import Bearing from "../../components/Bearing";
import StepHeader from "../../components/StepHeader/StepHeader";
import Divider from "../../components/Divider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppFooter from "../../components/AppFooter/AppFooter";
import Helm from "../../components/Helm/Helm";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "react-simple-snackbar";
import WorkingLabel from "../../components/WorkingLabel";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import Proposta from "../../components/offertaComponents/Proposta";
import Sistemi from "../../components/offertaComponents/Sistemi";
import Supporti from "../../components/offertaComponents/Supporti";

const Offerta = () => {

    const title = useSelector(state => state.stepsList[10].title);
    const description = useSelector(state => state.stepsList[10].description);
    const id = useSelector(state => state.stepsList[10].id);
    const [key, setKey] = useState('proposta');


    return (
        <div>
            <AppBar/>
            <WorkingLabel text={"Sotto sviluppo"}/>
            <Container fluid>
                {/*<Bearing space={"30px"}/>*/}
                <StepHeader stepId={id + ". "} title={title} description={description}/>
                <Divider/>
                <Bearing space={"60px"}/>
                <Container fluid>
                    <Row>
                        <Col>
                            <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                                <Tab eventKey="proposta" title="Proposta">
                                    <Bearing space={"50px"}/>
                                    <Proposta/>
                                </Tab>
                                <Tab eventKey="sistemi" title="Sistemi">
                                    <Bearing space={"50px"}/>
                                    <Sistemi/>
                                </Tab>
                                <Tab eventKey="supporti" title="Supporti">
                                    <Bearing space={"50px"}/>
                                    <Supporti/>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
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

export default Offerta;
