import React from "react";
import './PrevButton.css';
import Button from "react-bootstrap/Button";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const PrevButton = () => {

    const currentStepIndex = useSelector(state => state.currentStepIndex);
    const currentStep = useSelector(state => state.stepsList[currentStepIndex])
    const maxStep = useSelector(state => state.maxStep);
    const adjacency = useSelector(state => state.adjacency);
    const currenStepIsValidated = currentStep.validated;
    const currentStepCompleted = currentStep.completed;
    var nextStepPath = 0;
    if(currentStepIndex > 0){
        nextStepPath = useSelector(state => state.stepsList[currentStepIndex - 1].path);
    }
    const dispatch = useDispatch();
    const history = useHistory();

    const onPrevClick = () => {
        //console.clear();
        var nexId = currentStepIndex - 1;
        console.log(nexId);
        // if(currenStepIsValidated && !currentStepCompleted){
        //     console.log("update adjac")
        //     //controllo di non esserci già passato sennò se ci ripasso aggiorno la matrice di adiacenza
        //     dispatch({type: 'UPDATEADJACENCY', stepIndex: nexId});
        //     dispatch({type: 'GOTOSTEP', stepIndex: nexId})
        //     history.push(nextStepPath);
        // }else if(currenStepIsValidated && currentStepCompleted){
        //     dispatch({type: 'GOTOSTEP', stepIndex: nexId})
        //     history.push(nextStepPath);
        // }else {
        //     history.push(nextStepPath);
        // }

        if(nexId >= 0){
            dispatch({type: 'GOTOSTEP', stepIndex: nexId});
            history.push(nextStepPath);
        }
    }

    return (
        // <a style={{marginRight: "20px", cursor: "pointer", backgroundColor: "white"}} onClick={onPrevClick}>Indietro</a>
        <Button onClick={onPrevClick}
                style={{
                    marginRight: "20px",
                    backgroundColor: "white",
                    color: "black",
                    border: 0,
                    borderRadius: "4px",
                    padding: "11px 25px 11px 25px"
                }}

                className="prev-button"
        >
            Indietro
        </Button>
    )
}

export default PrevButton;
