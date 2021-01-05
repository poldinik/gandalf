import React from "react";
import AppBar from "../../components/AppBar/AppBar";
import {Container, Form} from "react-bootstrap";
import Bearing from "../../components/Bearing";
import StepHeader from "../../components/StepHeader/StepHeader";
import Divider from "../../components/Divider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppFooter from "../../components/AppFooter/AppFooter";
import SquareChoice from "../../components/SquareChoice/SquareChoice";
import NextButton from "../../components/Helm/NextButton";
import Helm from "../../components/Helm/Helm";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "react-simple-snackbar";
import WorkingLabel from "../../components/WorkingLabel";

const Riepilogo = () => {

    const title = useSelector(state => state.stepsList[11].title);
    const description = useSelector(state => state.stepsList[11].description);
    const id = useSelector(state => state.stepsList[11].id);


    return (
        <div>
            <AppBar/>
            <WorkingLabel text={"Sotto sviluppo"}/>
            <Container fluid>
                {/*<Bearing space={"30px"}/>*/}
                <StepHeader stepId={id + ". "} title={title} description={description}/>
                <Divider/>
                <Bearing space={"60px"}/>
                <Container>
                    <Row>
                        {/*<embed*/}
                        {/*    src={"https://finestraitalia.s3.eu-central-1.amazonaws.com/report/facsimilecartiglio.pdf" + "#toolbar=0"}*/}
                        {/*    type="application/pdf"*/}
                        {/*    className="pdf"*/}
                        {/*/>*/}
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

export default Riepilogo;
