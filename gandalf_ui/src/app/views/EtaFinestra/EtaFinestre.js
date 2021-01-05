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

const EtaFinestra = () => {

    const title = useSelector(state => state.stepsList[4].title);
    const description = useSelector(state => state.stepsList[4].description);
    const id = useSelector(state => state.stepsList[4].id);
    const data = useSelector(state => state.stepsList[4].data);
    const dispatch = useDispatch();
    const space = 12 / data.length;

    const onChoiceClick = (choiceIndex) => {
        for (var i = 0; i < data.length; i++){
            data[i].selected = false;
        }
        data[choiceIndex].selected = !data[choiceIndex].selected;
        dispatch({type: 'UPDATEETAFINESTRE', data: [...data]});
    }

    return (
        <div>
            <AppBar/>
            <Container fluid>
                <Bearing space={"30px"}/>
                <StepHeader stepId={id + ". "} title={title} description={description}/>
                <Divider/>
                <Bearing space={"60px"}/>
                <Container>
                    <Bearing space={"50px"}/>
                    <Row>
                        {
                            data.map((item, i) => (
                                <Col lg={space} md={space} sm={12} key={i}>
                                    <SquareChoice selected={item.selected} title={item.title} onSelected={() => onChoiceClick(i)}/>
                                </Col>
                            ))
                        }
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

export default EtaFinestra;
