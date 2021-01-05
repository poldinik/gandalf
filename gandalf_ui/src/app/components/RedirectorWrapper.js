import React, {useEffect, useState} from "react";
import { useLocation, useHistory } from 'react-router-dom'
import {useSelector} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import Container from "react-bootstrap/Container";
import ReloadedMessageModal from "./ReloadedMessageModal";
import {useSnackbar} from "react-simple-snackbar";
import Splash from "./Splash/Splash";

const RedirectorWrapper = ({children}) => {

    const location = useLocation();
    const history = useHistory();
    const currentStepIndex = useSelector(state => state.currentStepIndex);
    const currentPathName = useSelector(state => state.stepsList[currentStepIndex].path);
    const reloaded = useSelector(state => state.reloaded);
    const [modalShow, setModalShow] = useState(reloaded);
    const [loading, setLoading] = useState(true);
    const [now, setNow] = useState(0);

    if(currentPathName !== location.pathname){
        history.push(currentPathName);
    }

    var i = 0;
    const move = (duration) => {
        if (i === 0) {
            i = 1;
            var width = 1;
            setInterval(frame, duration / 100);
            function frame() {
                if (width >= 100) {
                    setTimeout(function (){
                        setLoading(false);
                    }, 500);
                } else {
                    width++;
                    setNow(width);
                }
            }
        }
    }

    useEffect(()=> {
        const duration = 1500;
        move(duration);
    }, [])

    if(loading){
        return (
            <Splash now={now}/>
        )
    }else {
        if(currentStepIndex === 9){
            return (
                <Container fluid>
                    <Row style={{margin: 0, padding: 0}}>
                        <Col lg={12} style={{padding: 0}}>
                            {children}
                        </Col>
                    </Row>
                    <ReloadedMessageModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </Container>
            )
        }else {
            return (
                <Container fluid>
                    <Row>
                        <Col lg={1}>
                            <div style={{padding: "0px", marginTop: "15px"}}>
                                <Figure>
                                    <Figure.Image
                                        width={"100%"}
                                        src="asset/fi.svg"
                                    />

                                </Figure>
                            </div>
                        </Col>
                        <Col lg={11}>
                            {children}
                        </Col>
                    </Row>
                    <ReloadedMessageModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </Container>
            )
        }
    }


}

export default RedirectorWrapper;
