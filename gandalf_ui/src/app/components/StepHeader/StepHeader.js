import React from "react";
import './StepHeader.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

    <div style={{display: "inline"}}>
        <h2
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}

            className="step-title">
            {children}
        </h2>
        <h2
            className="drop-arrow"
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}

        >&#x25bc;</h2>
    </div>
));

const StepHeader = ({stepId = "", title, description = ""}) => {

    const currentStepIndex = useSelector(state => state.currentStepIndex);
    const stepsList = useSelector(state => state.stepsList);
    const maxStep = useSelector(state => state.maxStep);
    const dispatch = useDispatch();
    const history = useHistory();

    const onClickItem = (id, pathname) => {
        dispatch({type: 'GOTOSTEP', stepIndex: id});
        history.push(pathname);
    }

    return (
        <Row>
            <Col>
                <Dropdown >
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-1">
                        {stepId + title}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="super-colors">
                        <Dropdown.Header>Percorso</Dropdown.Header>
                        {
                            stepsList.map((step, i) => (

                                    i <= maxStep ?
                                        currentStepIndex === i ?
                                    <Dropdown.Item key={i} eventKey={i + 1} active>
                                        {step.id + ". " + step.title}
                                    </Dropdown.Item>
                                    :
                                    <Dropdown.Item key={i} eventKey={i + 1} onClick={() => onClickItem(i, step.path)}>
                                        {step.id + ". " + step.title}
                                    </Dropdown.Item>

                                    :

                                    <Dropdown.Item key={i} eventKey={i + 1} disabled>
                                        {step.id + ". " + step.title}
                                    </Dropdown.Item>

                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown>{' '}
                {/*<h2 className="step-title">{stepId + title}</h2>*/}
                <p style={{marginBottom: "24px"}}>{description}</p>
            </Col>
        </Row>
    )
}

export default StepHeader;
