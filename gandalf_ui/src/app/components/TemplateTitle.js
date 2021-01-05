import React, {useState} from "react";
import ReactDOM from 'react-dom';
import './TemplateTitle.css';
import {faEdit, faPen, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {Row, Button, Container, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";

const TemplateTitle = (props) => {

    const { register, errors, handleSubmit } = useForm();
    const [visibleButtonedit, setVisibleButtonedit] = useState(false);
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(props.title);
    const dispatch = useDispatch();

    const onMouseOver = () => {
        if(!edit){
            setVisibleButtonedit(true);
        }
    }

    const onMouseLeave = () => {
        setVisibleButtonedit(false);
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Rinomina
        </Tooltip>
    );

    const onEditClick = () => {
        setVisibleButtonedit(false);
        setEdit(true);
    }

    const handleKeyDown = (event) => {

        if (event.key === 'Enter') {

            if(event.target.value.trim() !== ""){
                setEdit(false);
                setTitle(event.target.value);
                dispatch({type: 'CHANGETEMPLATETITLE', templatetitle: event.target.value});
            }
        }

    }

    return (
        <div  onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
            <div className="wrapper">
                {
                    !edit ? <h4 style={{display: "inline"}}>{title}</h4> :
                        <Form>
                            <Form.Group controlId="formBasictitle">
                                <Form.Control autoFocus type="text" value={title} onChange={(e)=> setTitle(e.target.value)} onKeyDown={handleKeyDown} ref={register}/>
                            </Form.Group>
                        </Form>
                }
                {
                    visibleButtonedit ? <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 100, hide: 400 }}
                        overlay={renderTooltip}
                    >
                        <div className="edit-button" onClick={onEditClick}><FontAwesomeIcon icon={faPen}/></div>
                    </OverlayTrigger> : null
                }
            </div>

        </div>
    )
}

export default TemplateTitle;
