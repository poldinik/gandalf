import React, {useState} from "react";
import AppBar from "../../components/AppBar/AppBar";
import {Container, Form} from "react-bootstrap";
import AppFooter from "../../components/AppFooter/AppFooter";
import StepHeader from "../../components/StepHeader/StepHeader";
import Bearing from "../../components/Bearing";
import Divider from "../../components/Divider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Helm from "../../components/Helm/Helm";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import './Cliente.css';
import AutocompleteAddressItem from "../../components/AutocompleteAddressItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Chat from "../../components/Chat/Chat";

const mapboxToken = "pk.eyJ1IjoibG9yZXR0bzI1IiwiYSI6ImNraGx4aDVwaTBoYmsyc3J0aGhzdWFvaDcifQ.b2Cf9Vl3wXaKj6r-B3ZveQ";
const Cliente = () => {

    const title = useSelector(state => state.stepsList[0].title);
    const description = useSelector(state => state.stepsList[0].description);
    const id = useSelector(state => state.stepsList[0].id);
    const data = useSelector(state => state.stepsList[0].data);
    const runvalidation = useSelector(state => state.stepsList[0].runvalidation);
    const [autocompleteList, setautocompleteList] = useState([]);
    const dispatch = useDispatch();

    const [addressOptions, setAddressOptions] = useState([]);

    const onAutoCompleteAddress = (addressToken) => {
        const at = addressToken.trim().replace("/", "");
        const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + at + ".json?access_token=" + mapboxToken + "&cachebuster=1604707004411&autocomplete=true&types=address&language=it";

        axios.get(url)
            .then(function (response) {
                const features = response.data.features;
                setautocompleteList(features);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function filterBy(option, state) {
        if (state.selected.length) {
            return true;
        }
        return option.label.toLowerCase().indexOf(state.text.toLowerCase()) > -1;
    }
    const onAddressChange = (e) => {
        onAutoCompleteAddress(e.target.value);
        dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, indirizzo: e.target.value}})
    }


    return (
        <div onClick={() => setautocompleteList([])}>
            <AppBar/>
            <Container fluid>
                {/*<Bearing space={"20px"}/>*/}
                <StepHeader stepId={id + ". "} title={title} description={description}/>
                {/*<Bearing space={"20px"}/>*/}
                <Divider/>
                <Bearing space={"60px"}/>
                <Container fluid>
                    <Row>
                        <Col style={{margin: "auto"}}>
                            <Form noValidate validated={runvalidation} autoComplete={"off"}>
                                <h4>Dati cliente</h4>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridNome">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control required type="text" value={data.nome} onChange={(e) => dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, nome: e.target.value}})}/>
                                        <Form.Control.Feedback/>
                                        <Form.Control.Feedback type="invalid">
                                            Questo campo non può essere vuoto
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col}controlId="formGridCognome">
                                        <Form.Label>Cognome</Form.Label>
                                        <Form.Control required type="text" value={data.cognome} onChange={(e) => dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, cognome: e.target.value}})}/>
                                        <Form.Control.Feedback/>
                                        <Form.Control.Feedback type="invalid">
                                            Questo campo non può essere vuoto
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} lg={6} controlId="formGridIndirizzo1">
                                        <Form.Label>Indirizzo</Form.Label>
                                        {/*<Typeahead*/}
                                        {/*    id="toggle-example"*/}
                                        {/*    filterBy={filterBy}*/}
                                        {/*    options={addressOptions}*/}
                                        {/*    required type="text"*/}
                                        {/*    value={data.indirizzo}*/}
                                        {/*    onChange={onAddressChange}*/}
                                        {/*>*/}

                                        {/*</Typeahead>*/}
                                        <Form.Control required type="text" value={data.indirizzo} onChange={(e) => {
                                            if(e.target.value.trim() !== ""){
                                                onAutoCompleteAddress(e.target.value);
                                            }

                                            dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, indirizzo: e.target.value}});
                                        }}/>
                                        <div id="myInputautocomplete-list" className="autocomplete-items">
                                            {
                                                autocompleteList.length > 0 ?
                                                    <div style={{borderBottom: "0"}}>
                                                        <FontAwesomeIcon style={{float: "right"}} icon={faTimes} onClick={() => setautocompleteList([])}/>
                                                    </div> : null
                                            }
                                            {
                                                autocompleteList.map((auto, i) => (
                                                    <AutocompleteAddressItem address={auto.place_name} key={i} onSelect={() => {
                                                        //dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, indirizzo: auto.place_name}});
                                                        //console.log("selezionata");
                                                        //console.log(auto);
                                                        //dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, citta: auto.context[1].text}});
                                                        //dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, provincia: auto.context[2].text}});
                                                        dispatch({
                                                            type: 'UPDATEANAGRAFICADATA',
                                                            data: {
                                                                ...data,
                                                                indirizzo: auto.place_name,
                                                                citta: auto.context[1].text,
                                                                provincia: auto.context[2].text,
                                                                cap: auto.context[0].text}
                                                        });
                                                        setautocompleteList([]);
                                                    }}/>
                                                ))
                                            }
                                        </div>
                                        <Form.Control.Feedback/>
                                        <Form.Control.Feedback type="invalid">
                                            Questo campo non può essere vuoto
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} lg={2} controlId="formGridCap">
                                        <Form.Label>CAP</Form.Label>
                                        <Form.Control required type="text" pattern="^[-+]?[0-9]+$" value={data.cap} onChange={(e) => dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, cap: e.target.value}})}/>
                                        <Form.Control.Feedback/>
                                        <Form.Control.Feedback type="invalid">
                                            Inserire un codice postale valido
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} lg={2} controlId="formGridCitta">
                                        <Form.Label>Città</Form.Label>
                                        <Form.Control required type="text" value={data.citta} onChange={(e) => {
                                            setautocompleteList([]);
                                            dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, citta: e.target.value}})}
                                        }/>
                                        <Form.Control.Feedback/>
                                        <Form.Control.Feedback type="invalid">
                                            Questo campo non può essere vuoto
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} lg={2} controlId="formGridProvincia">
                                        <Form.Label>Provincia</Form.Label>
                                        <Form.Control required type="text" value={data.provincia} onChange={(e) => {
                                            setautocompleteList([]);
                                            dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, provincia: e.target.value}})}
                                        }/>
                                        <Form.Control.Feedback/>
                                        <Form.Control.Feedback type="invalid">
                                            Inserire una provincia valida
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridTel">
                                        <Form.Label>Telefono (opzionale)</Form.Label>
                                        <Form.Control type="tel" pattern="^[-+]?[0-9]+$" value={data.telefono} onChange={(e) => dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, telefono: e.target.value}})}/>
                                        <Form.Control.Feedback/>
                                        <Form.Control.Feedback type="invalid">
                                            Inserire una numero di telefono valido
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCell">
                                        <Form.Label>Cellulare (opzionale)</Form.Label>
                                        <Form.Control type="tel" pattern="^(\((00|\+)39\)|(00|\+)39)?(38[890]|34[7-90]|36[680]|33[3-90]|32[89])\d{7}$" value={data.cellulare} onChange={(e) => dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, cellulare: e.target.value}})}/>
                                        <Form.Control.Feedback/>
                                        <Form.Control.Feedback type="invalid">
                                            Inserire una numero di cellulare valido
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control required type="email" pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" value={data.email} onChange={(e) => dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, email: e.target.value}})}/>
                                        <Form.Control.Feedback/>
                                        <Form.Control.Feedback type="invalid">
                                            Inserire una email valida
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group id="formGridCheckbox">
                                    <Form.Check type="checkbox" label="Stesso indirizzo di fatturazione" value={data.fatturazionediversa} checked={data.fatturazionediversa} onChange={(e) => dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, fatturazionediversa: e.target.checked}})}/>
                                </Form.Group>

                                {
                                    !data.fatturazionediversa ? <div style={{marginTop: "20px"}}>
                                        <h4>Indirizzo di fatturazione</h4>
                                        <Form.Row>
                                            <Form.Group as={Col} lg={6} controlId="formGridIndirizzo2">
                                                <Form.Label>Indirizzo</Form.Label>
                                                <Form.Control required type="text" value={data.indirizzofatturazione} onChange={(e) => dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, indirizzofatturazione: e.target.value}})}/>
                                                <Form.Control.Feedback/>
                                                <Form.Control.Feedback type="invalid">
                                                    Questo campon non può essere vuoto
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} lg={2} controlId="formGridCitta2">
                                                <Form.Label>Città</Form.Label>
                                                <Form.Control required type="text" value={data.cittafatturazione} onChange={(e) => dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, cittafatturazione: e.target.value}})}/>
                                                <Form.Control.Feedback/>
                                                <Form.Control.Feedback type="invalid">
                                                    Questo campo non può essere vuoto
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} lg={2} controlId="formGridProvincia2">
                                                <Form.Label>Provincia</Form.Label>
                                                <Form.Control required type="text"  value={data.provinciafatturazione} onChange={(e) => dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, provinciafatturazione: e.target.value}})}/>
                                                <Form.Control.Feedback/>
                                                <Form.Control.Feedback type="invalid">
                                                    Inserire una provincia valida
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} lg={2} controlId="formGridCap2">
                                                <Form.Label>CAP</Form.Label>
                                                <Form.Control required type="text" pattern="^[-+]?[0-9]+$" value={data.capfatturazione} onChange={(e) => dispatch({type: 'UPDATEANAGRAFICADATA', data: {...data, capfatturazione: e.target.value}})}/>
                                                <Form.Control.Feedback/>
                                                <Form.Control.Feedback type="invalid">
                                                    Inserire un codice postale valido
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>

                                    </div> : null

                                }
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <AppFooter>
                <Row>
                    <Col lg={12}>
                        {/*<Chat></Chat>*/}
                        <Helm/>
                    </Col>
                </Row>
            </AppFooter>
        </div>
    )
}

export default Cliente;
