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
import MotivazioneSquareChoice from "../../components/MotivazioneSquareChoice";
import {TimelineLite} from "gsap/all";

const Motivazioni = () => {

    const title = useSelector(state => state.stepsList[2].title);
    const description = useSelector(state => state.stepsList[2].description);
    const id = useSelector(state => state.stepsList[2].id);
    const data = useSelector(state => state.stepsList[2].data);
    const dispatch = useDispatch();
    const space = 12 / (data.length / 2) ;
    const [tl, setTl] = useState(new TimelineLite({ paused: true }));
    const [cards, setCards] = useState([]);

    const onChoiceClick = (choiceIndex) => {
        data[choiceIndex].selected = !data[choiceIndex].selected;
        dispatch({type: 'UPDATEMOTIVAZIONI', data: [...data]});

    }

    useEffect(() => {
        console.log("use effect");
        console.log(cards.length);
        tl.staggerTo( cards , 0.5, { autoAlpha: 1, y: -20 }, 0.1);
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
                                    <MotivazioneSquareChoice selected={item.selected} title={item.title} img={item.img} onSelected={() => onChoiceClick(i)}/>
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

export default Motivazioni;
