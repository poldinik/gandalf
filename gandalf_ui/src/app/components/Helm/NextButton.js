import React from "react";
import './NextButton.css';
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";

const NextButton = ({text = "Avanti", backgroundColor = "#0247A8", padding = "11px 25px 11px 25px"}) => {

    const currentStepIndex = useSelector(state => state.currentStepIndex);
    const currentStep = useSelector(state => state.stepsList[currentStepIndex])
    const maxStep = useSelector(state => state.maxStep);
    const adjacency = useSelector(state => state.adjacency);
    const currenStepIsValidated = currentStep.validated;
    const currentStepCompleted = currentStep.completed;

    const stepsLength = useSelector(state => state.stepsList.length);

    var nextStepPath = "";
    var last = false;
    if(currentStepIndex === stepsLength - 1){
        last = true;
    } else {
        nextStepPath = useSelector(state => state.stepsList[currentStepIndex + 1].path);
    }
    const dispatch = useDispatch();
    const history = useHistory();

    const onNextClick = () => {
        var nexId = currentStepIndex + 1;
        // if(currenStepIsValidated && !currentStepCompleted){
        //     //controllo di non esserci già passato sennò se ci ripasso aggiorno la matrice di adiacenza
        //     dispatch({type: 'UPDATEADJACENCY', stepIndex: nexId});
        //     dispatch({type: 'GOTOSTEP', stepIndex: nexId})
        //     history.push(nextStepPath);
        // }else if(currenStepIsValidated && currentStepCompleted){
        //     dispatch({type: 'GOTOSTEP', stepIndex: nexId})
        //     history.push(nextStepPath);
        // }else {
        //     //errore
        // }

        dispatch({type: 'RUNVALIDATESTEP', stepIndex: currentStepIndex});

        if(!last){
            if(currentStep.validated){
                if(nexId < stepsLength && currentStepIndex === maxStep){
                    console.log("update adj");
                    dispatch({type: 'UPDATEADJACENCY', stepIndex: nexId});
                    dispatch({type: 'GOTOSTEP', stepIndex: nexId});
                    history.push(nextStepPath);
                }else {

                    console.log("only go");
                    dispatch({type: 'GOTOSTEP', stepIndex: nexId});
                    history.push(nextStepPath);
                }
            }else {
                confirm("Sezione non ancora completa!")
            }
        }

    }

    return (
        !last ? <Button variant="primary" style={{backgroundColor: backgroundColor, padding: padding}} className="next-button" onClick={onNextClick}>{text}</Button> : null
    )
}

export default NextButton;
