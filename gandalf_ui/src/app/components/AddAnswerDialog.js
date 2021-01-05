import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";

const AddAnswerDialog = (props) =>{

    const { register, errors, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const [question, setQuestion] = useState("");

    const onClick = () => {
        dispatch({type: "ADDQUESTION", question: question})
        props.onHide();
    }

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch({type: "ADDQUESTION", question: question})
        setQuestion("");
        props.onHide();
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Nuova domanda
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formReservationBeauticianDate">
                        <Form.Label>Testo</Form.Label>
                        <Form.Control autoFocus type="text" placeholder="Inserisci qui il testo..." value={question} ref={register} onChange={(e) => setQuestion(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClick}>Salva</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddAnswerDialog;
