import React from "react";
import AppBar from "../../components/AppBar/AppBar";
import {Container, Form} from "react-bootstrap";
import Bearing from "../../components/Bearing";
import StepHeader from "../../components/StepHeader/StepHeader";
import Divider from "../../components/Divider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppFooter from "../../components/AppFooter/AppFooter";
import Helm from "../../components/Helm/Helm";
import ListGroup from "react-bootstrap/ListGroup";
import {useDispatch, useSelector} from "react-redux";
import YesNoQuestion from "../../components/YesNoQuestion";
import MultiQuestion from "../../components/MultiQuestion";

const Marketing = () => {

    const title = useSelector(state => state.stepsList[1].title);
    const description = useSelector(state => state.stepsList[1].description);
    const id = useSelector(state => state.stepsList[1].id);
    const questions = useSelector(state => state.stepsList[1].data);
    const multiQuestions = useSelector(state => state.stepsList[1].multi);
    const dispatch = useDispatch();

    const onChangeAns = (index, ans) => {
        console.log("onChangeAns!");
        questions[index].answer = ans;
        //mette [...questions] sennò redux non sente che c'è stato update...
        dispatch({type: 'UPDATEMARKETING', data: [...questions]});
    }


    const onChangeMultiAns = (indexAns, indexQuestion) => {
        console.log("onChangeMultiAns!");
        multiQuestions[indexQuestion].currentAnsIndex = indexAns;
        console.log(multiQuestions);
        //mette [...questions] sennò redux non sente che c'è stato update...
        dispatch({type: 'UPDATEMULTIMARKETING', multiQuestions: [...multiQuestions]});
    }

    return (
        <div>
            <AppBar/>
            <Container fluid>
                {/*<Bearing space={"20px"}/>*/}
                <StepHeader stepId={id + ". "} title={title}/>
                <Divider/>
                <Bearing space={"20px"}/>
                <Container fluid>

                    <Row>
                        <Col style={{margin: "auto"}}>
                            <Form>
                                <ListGroup>
                                    {
                                        questions.map((question, i) => (
                                            // <ListGroup.Item key={i}>
                                            //     <Form.Check
                                            //         type="checkbox"
                                            //         value={question.answer}
                                            //         label={question.question}
                                            //         onChange={(e) => onChangeAns(i, e.target.checked) }
                                            //     />
                                            // </ListGroup.Item>

                                            <YesNoQuestion
                                                key={i}
                                                keyId={i}
                                                currentAns={question.answer}
                                                text={question.question}
                                                onAnsChange={onChangeAns}
                                            />
                                        ))
                                    }
                                    {
                                        multiQuestions.map((multi, i) => (
                                            <MultiQuestion onAnsChange={onChangeMultiAns} keyId={i} key={i} currentAnsIndex={multi.currentAnsIndex} text={multi.question} answers={multi.answers}/>
                                        ))
                                    }
                                </ListGroup>
                            </Form>

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

export default Marketing;
