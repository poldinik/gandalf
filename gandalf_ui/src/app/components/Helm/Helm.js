import React from "react";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import {useSelector} from "react-redux";
import './Helm.css';

const Helm = () => {
    const categories = useSelector(state => state.categories);
    const stepsList = useSelector(state => state.stepsList);
    const currentStepIndex = useSelector(state => state.currentStepIndex);

    return (
        <div id={"page_header"}>
            {/*<div className="steps">*/}
            {/*    <ul>*/}
            {/*        {*/}
            {/*            categories.map((category, i) => (*/}
            {/*                stepsList[currentStepIndex].category === i ?*/}
            {/*                    <li className="step1 step active"><span className="step-span active-step">{category}</span></li>*/}
            {/*                    :*/}
            {/*                    <li className="step2 step"><span  className="step-span disactive-step">{category}</span></li>*/}

            {/*            ))*/}
            {/*        }*/}
            {/*    </ul>*/}
            {/*</div>*/}
            <div style={{float: "right"}}>
                <PrevButton/>
                <NextButton/>
            </div>
        </div>

    )
}

export default Helm;
