import React, {Fragment} from "react";
import './PropostaItem.css';
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEye} from "@fortawesome/free-solid-svg-icons";

const PropostaItem = ({symbol = "", title = "", choices = [], actionTitle = "", dark = true, onActon = () => {}}) => {

    const getChoice = () => {
        if(choices.length === 0){
            return (
                <Fragment>
                    <div style={{height: "24px"}}/>
                </Fragment>
            )
        }else {
            return (
                <Fragment>
                    {
                        choices[0]
                    }
                    <FontAwesomeIcon icon={faEdit} className="edit-proposta-button" />
                </Fragment>
            )
        }
    }

    if(dark){
        return (
            <Row>
                <Col lg={1} className="h-100 d-inline-block item-col-padding">
                    <div className="symbol item-padding centered">
                        {symbol}
                    </div>
                </Col>
                <Col className="h-100 d-inline-block item-col-padding">
                    <div className="title item-padding darked-title">
                        {title}:
                    </div>
                </Col>
                <Col className="h-100 d-inline-block item-col-padding">
                    <div className="choices item-padding centered darked">
                        {
                            getChoice()
                        }
                    </div>
                </Col>
                <Col className="h-100 d-inline-block item-col-padding">
                    <div className="proposta-action item-padding darked">
                        <div onClick={onActon} className="centered" style={{backgroundColor: "green", color: "white"}}>
                            {actionTitle}
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }else {
        return (
            <Row>
                <Col lg={1} className="h-100 d-inline-block item-col-padding">
                    <div className="symbol item-padding centered">
                        {symbol}
                    </div>
                </Col>
                <Col className="h-100 d-inline-block item-col-padding">
                    <div className="title item-padding">
                        {title}:
                    </div>
                </Col>
                <Col className="h-100 d-inline-block item-col-padding">
                    <div className="choices item-padding centered">
                        {
                            getChoice()
                        }
                    </div>
                </Col>
                <Col className="h-100 d-inline-block item-col-padding">
                    <div className="proposta-action item-padding">
                        <div className="centered" style={{backgroundColor: "green", color: "white"}}>
                            {actionTitle}
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default PropostaItem;
