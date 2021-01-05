import React, {useState} from "react";
import './DomandaEditor.css';
import TextDescription from "./TextDescription";
import Bearing from "./Bearing";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faPen, faPlus} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WorldTag from "./WorldTag";
import AddAnswerDialog from "./AddAnswerDialog";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import ExpertText from "./ExpertText";
import {useDispatch, useSelector} from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import QuestionItem from "./QuestionItem";

const DomandaEditor = () => {

    const { register, errors, handleSubmit } = useForm();
    const [modalShow, setModalShow] = useState(false);
    const [visibleButtonedit, setVisibleButtonedit] = useState(false);
    const [editExpert, setEditExpert] = useState(false);
    const expertText = useSelector(state => state.expertText);
    const questions = useSelector(state => state.questions);
    //const [et, setEt] = useState(expertText);
    const dispatch = useDispatch();
    //Ho #sintomi da #duranta, è un problema che si presenta #frequenza
    console.log(expertText);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Modifica
        </Tooltip>
    );

    const onEditClick = () => {
        setVisibleButtonedit(false);
        setEditExpert(true);
    }

    const onMouseOver = () => {
        if(!editExpert){
            setVisibleButtonedit(true);
        }
    }

    const onMouseLeave = () => {
        setVisibleButtonedit(false);
        setEditExpert(false);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const s = event.target.value;
            //setExpertText(s);
            var re = /(?:^|\W)#(\w+)(?!\w)/g, match, matches = [];
            while (match = re.exec(s)) {
                matches.push(match[1]);
            }

            dispatch({type: 'UPDATEDETECTEDPARAMETERS', detected: matches});
            dispatch({type: 'CHANGEEXPERTTEXT', expertText: event.target.value});
            setEditExpert(false);
        }
    }

    const onExpertChange = (event) => {
        dispatch({type: 'CHANGEEXPERTTEXT', expertText: event.target.value});
        const s = event.target.value;
        //setExpertText(s);
        var re = /(?:^|\W)#(\w+)(?!\w)/g, match, matches = [];
        while (match = re.exec(s)) {
            matches.push(match[1]);
        }

        console.log(matches);
    }

    const renderQuestionsSize = () => {
        const size = questions.length;
        if (size > 1){
            return (
                <div style={{display: "inline"}}>
                    <Badge variant="dark">{size}</Badge> domande
                </div>
            )
        }else if(size === 0){
            return (
                <div style={{display: "inline"}}>
                    Nessuna domanda
                </div>
            )        } else {
            return (
                <div style={{display: "inline"}}>
                    <Badge variant="dark">{size}</Badge> domanda
                </div>
            )
        }
    }

    const onDeleteQuestion = (question) => {
        dispatch({type: 'REMOVEQUESTION', question: question});
    }

    const onEditQuestion = (question) => {
        setModalShow(true);
    }

    return (
        <div>
            <Row>
                <Col lg={8} style={{margin: "auto"}}>
                    <TextDescription text="Qui puoi definire una serie di domande per un ambito. Inoltre, utilizzando il simbolo hashtag (#), puoi inserire i dati necessari per fornire una risposta. Modifica l'esempio cercando di essere il più generico possibile"/>
                    <Bearing space={20}/>
                    <fieldset className="border p-2">
                        <legend className="w-auto">
                            {
                                visibleButtonedit ?
                                    <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
                                        <div style={{display: "inline"}}>Domanda utente esperto</div>
                                        <OverlayTrigger
                                            placement="bottom"
                                            delay={{ show: 100, hide: 400 }}
                                            overlay={renderTooltip}
                                        >
                                            <div className="edit-button" onClick={onEditClick}><FontAwesomeIcon icon={faPen}/></div>
                                        </OverlayTrigger>
                                    </div>
                                    :
                                    <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>Domanda utente esperto</div>
                            }
                        </legend>
                        <div className="fieldset-content">
                            {
                                editExpert ?
                                    <Form >
                                        <Form.Group controlId="formBasictitle">
                                            <Form.Control autoFocus type="text" ref={register} value={expertText} onChange={onExpertChange} onKeyDown={handleKeyDown}/>
                                        </Form.Group>
                                    </Form>
                                    :
                                    <div>
                                        {/*Ho <WorldTag text="sintomi"/> da <WorldTag text="duranta"/>, è un problema che si presenta <WorldTag text="frequenza"/>*/}
                                        <ExpertText text={expertText}/>
                                    </div>
                            }

                        </div>
                    </fieldset>
                    <Bearing space={50}/>
                    <TextDescription text="Fornisci esempi di come potrebbero chiederlo utenti inesperti: generalmente omettono le #informazioni necessarie per offrire il supporto"/>
                    <Bearing space={20}/>
                    <fieldset className="border p-2">
                        <legend className="w-auto">
                            <div style={{display: "inline"}}>{renderQuestionsSize()} dell'utente inesperto <div className="edit-button" onClick={() => setModalShow(true)}><FontAwesomeIcon icon={faPlus}/></div></div>
                        </legend>
                        <div className="fieldset-content">
                            <ListGroup variant="flush">
                                {
                                    questions.map((question, i) => (
                                        <QuestionItem question={question} key={i} onDelete={() => onDeleteQuestion(question)} onEdit={() => onEditQuestion(question)}/>
                                    ))
                                }

                            </ListGroup>
                        </div>
                    </fieldset>
                    <Bearing space={20}/>
                    {/*<Button variant="primary" onClick={() => setModalShow(true)}><FontAwesomeIcon icon={faPlus}/> Aggiungi</Button>*/}
                </Col>
            </Row>
            <AddAnswerDialog
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default DomandaEditor;
