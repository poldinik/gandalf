import React from "react";
import AppFooter from "../../components/AppFooter/AppFooter";
import Helm from "../../components/Helm/Helm";
import './Presentazione.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Presentazione = () => {

    return (
        <div>
            <iframe src="https://presentazione.finestraitalia.it/" title="Presentazione" className="presentazione-overlay" style={{border: 0}}/>
            <AppFooter backgroundColor={"transparent"}>
                <Row>
                    <Col lg={12}>
                        <Helm/>
                    </Col>
                </Row>
            </AppFooter>
        </div>
    )
}

export default Presentazione;
