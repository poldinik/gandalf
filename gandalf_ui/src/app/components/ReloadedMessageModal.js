import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import Bearing from "./Bearing";
import {refreshLocalState} from "../local/localStorage";
import {useSnackbar} from "react-simple-snackbar";

const ReloadedMessageModal = (props) => {

    const last = useSelector(state => state.last);
    const [openSnackbar, closeSnackbar] = useSnackbar(
        {
            position: 'bottom-left',
            style: {
                backgroundColor: '#0247A8',
                color: 'white',
                maxWidth: "none",
                minWidth: "150px"
            },
            closeStyle: {
                color: 'white',
            },
        }
    )

    const onRestart = () => {
        refreshLocalState().then(r => {
            
        });
    }

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Sessione recuperata con successo <FontAwesomeIcon icon={faCheck} style={{color: "green"}}/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    Abbiamo recuperato con successo la tua <strong>sessione precedente del {last}</strong> per riprendere il percorso da dove lo avevi lasciato.
                </div>
                <Bearing space={"20px"}/>
                <div>
                    In alternativa, puoi anche decidere di ricominciare da zero il percorso cliccando su <strong>Ricomincia</strong>.
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onRestart}>Ricomincia</Button>
                <Button onClick={props.onHide}>Prosegui</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ReloadedMessageModal;
