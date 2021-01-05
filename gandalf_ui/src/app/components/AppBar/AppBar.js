import React, {useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import './AppBar.css';
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faSave, faShare, faSignOutAlt, faSync} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";
import Bearing from "../Bearing";
import {refreshLocalState} from "../../local/localStorage";

const AppBar  = () => {

    const stepsList = useSelector(state => state.stepsList);
    const sessione = useSelector(state => state.sessione);
    const last = useSelector(state => state.last);
    const history = useHistory();
    const dispatch = useDispatch();
    const [refreshed, setrefreshed] = useState(false);

    const onNewSession = () => {
        console.log("refresh!");
        refreshLocalState().then(r => {
            if(r){
                setrefreshed(true);
            }else {
                console.log("errore refresh");
            }
        });
    }

    const onSave = () => {

    }
    // useEffect((r) => {
    //
    //     if(r){
    //         console.log("redirect to start");
    //         history.replace("/");
    //     }
    //
    // },[refreshed]);

    return (
        <div className="bar">
            <Navbar bg="white" expand="lg" >
                <Navbar.Brand href="#home">
                    <div className="mrdrill-brand">
                        mr. drill <div style={{display: "inline", fontSize: "11px", color: "black", fontWeight: 400}}>release 0.6.5-beta</div>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {/*<Nav.Link href="#progetti">Progetti</Nav.Link>*/}
                        {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
                        {/*    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Divider />*/}
                        {/*    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                        {/*</NavDropdown>*/}
                    </Nav>
                    {/*<Form inline>*/}
                    {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
                    {/*    <Button variant="outline-success">Search</Button>*/}
                    {/*</Form>*/}
                    <Nav>

                        {/*<NavDropdown title={"Sessione: " + sessione} id="basic-nav-dropdown">*/}
                        {/*    /!*{*!/*/}
                        {/*    /!*    stepsList.map((step, i) => (*!/*/}
                        {/*    /!*        <NavDropdown.Item key={i} href={step.path}>{step.id + ". " + step.title}</NavDropdown.Item>*!/*/}
                        {/*    /!*    ))*!/*/}
                        {/*    /!*}*!/*/}
                        {/*</NavDropdown>*/}
                        <Nav.Link><strong>Sessione:</strong> {sessione}</Nav.Link>
                        <Nav.Link><strong>Ultimo salvataggio:</strong> {last}</Nav.Link>
                        {/*<Nav.Link><FontAwesomeIcon icon={faSave}></FontAwesomeIcon> Salva</Nav.Link>*/}
                        {/*<Nav.Link><FontAwesomeIcon icon={faShare}></FontAwesomeIcon> Condividi</Nav.Link>*/}
                        {/*<Nav.Link><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon> Esci</Nav.Link>*/}
                        <Nav.Link onClick={onNewSession}><FontAwesomeIcon icon={faPlay}/> Ricomincia il percorso</Nav.Link>
                        {/*<Nav.Link onClick={onSave}><FontAwesomeIcon icon={faSave}/> Salva sessione</Nav.Link>*/}
                        <NavDropdown title="Help" drop={"left"}>
                            <NavDropdown.Item>Finestra Italia</NavDropdown.Item>
                            <NavDropdown.Item>Su mr. drill</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>Termini di Servizio</NavDropdown.Item>
                            <NavDropdown.Item>Privacy Policy</NavDropdown.Item>
                        </NavDropdown>
                        {/*<Nav.Link href="https://finestraitalia.it">Home</Nav.Link>*/}
                        {/*<Nav.Link href="#info">Info</Nav.Link>*/}
                        {/*<Nav.Link href="https://www.finestraitalia.it/contatti/">Contatti</Nav.Link>*/}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Bearing space={"20px"}/>
        </div>
    )
}

export default AppBar;
