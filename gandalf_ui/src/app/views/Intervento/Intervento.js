import React, {useEffect, useState} from "react";
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
import {TimelineLite} from "gsap/all";

const Intervento = () => {

    const title = useSelector(state => state.stepsList[5].title);
    const description = useSelector(state => state.stepsList[5].description);
    const id = useSelector(state => state.stepsList[5].id);
    const data = useSelector(state => state.stepsList[5].data);
    const dispatch = useDispatch();
    const space = 12 / data.length;

    //per gestione per andare avanti
    const [tl, setTl] = useState(new TimelineLite({ paused: true }));
    const [cards, setCards] = useState([]);
    const currentStepIndex = useSelector(state => state.currentStepIndex);
    const currentStep = useSelector(state => state.stepsList[currentStepIndex])
    const maxStep = useSelector(state => state.maxStep);
    const adjacency = useSelector(state => state.adjacency);
    const currenStepIsValidated = currentStep.validated;
    const currentStepCompleted = currentStep.completed;

    const stepsLength = useSelector(state => state.stepsList.length);

    var nextStepPath = "";
    var last = false;
    if(currentStepIndex === stepsLength - 1){
        last = true;
    } else {
        nextStepPath = useSelector(state => state.stepsList[currentStepIndex + 1].path);
    }

    const goOn = () => {
        var nexId = currentStepIndex + 1;
        dispatch({type: 'RUNVALIDATESTEP', stepIndex: currentStepIndex});
        if(!last){
            if(currentStep.validated){
                if(nexId < stepsLength && currentStepIndex === maxStep){
                    console.log("update adj");
                    dispatch({type: 'UPDATEADJACENCY', stepIndex: nexId});
                    dispatch({type: 'GOTOSTEP', stepIndex: nexId});
                    history.push(nextStepPath);
                }else {

                    console.log("only go");
                    dispatch({type: 'GOTOSTEP', stepIndex: nexId});
                    history.push(nextStepPath);
                }
            }else {
                confirm("Sezione non ancora completa!")
            }
        }
    }

    const onChoiceClick = (choiceIndex) => {
        for (var i = 0; i < data.length; i++){
            data[i].selected = false;
        }
        data[choiceIndex].selected = !data[choiceIndex].selected;
        dispatch({type: 'UPDATEINTERVENTO', data: [...data]});
        tl.reverse().then(function (){
            goOn();
        });
    }

    useEffect(() => {
        console.log("use effect");
        console.log(cards.length);
        tl.staggerTo( cards , 0.5, { autoAlpha: 1, y: 20 }, 0.1);
        tl.play();
    },[]);

    return (
        <div>
            <AppBar/>
            <Container fluid>
                {/*<Bearing space={"30px"}/>*/}
                <StepHeader stepId={id + ". "} title={title} description={description}/>
                <Divider/>
                <Bearing space={"60px"}/>
                <Container>
                    <Bearing space={"50px"}/>
                    <Row>
                        {
                            data.map((item, i) => (
                                <Col
                                    lg={space}
                                    md={space}
                                    sm={12}
                                    key={i}
                                    ref={col => {
                                        cards[i] = col
                                        setCards(cards);
                                    }}
                                    style={{opacity: 0}}
                                >
                                    <SquareChoice selected={item.selected} title={item.title} img={item.img} onSelected={() => onChoiceClick(i)}/>
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

export default Intervento;
