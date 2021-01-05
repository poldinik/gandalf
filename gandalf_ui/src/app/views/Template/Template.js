import React, {useState} from "react";
import './Template.css';
import Nav from "react-bootstrap/Nav";
import TextDescription from "../../components/TextDescription";
import Bearing from "../../components/Bearing";
import DomandaEditor from "../../components/DomandaEditor";
import TemplateTitle from "../../components/TemplateTitle";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ParametriEditor from "../../components/ParametriEditor";
import RisposteEditor from "../../components/RisposteEditor";
import {useSelector} from "react-redux";

const Template = () => {
    const [key, setKey] = useState('home');
    const templatetitle = useSelector(state => state.templatetitle)
    const space = 50;


    return (
        <div>
            <TemplateTitle title={templatetitle}/>
            <Bearing space={20}/>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                transition={false}
            >
                <Tab eventKey="home" title="Domanda">
                    <Bearing space={space}/>
                    <DomandaEditor/>
                </Tab>
                <Tab eventKey="profile" title="Parametri">
                    <Bearing space={space}/>
                    <ParametriEditor/>
                </Tab>
                <Tab eventKey="contact" title="Risposte">
                    <Bearing space={space}/>
                    <RisposteEditor/>
                </Tab>
            </Tabs>
            <Bearing/>
        </div>
    )
}

export default Template;
