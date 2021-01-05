import React from "react";
import WorldTag from "./WorldTag";

const ExpertText = ({text}) => {
    console.log(text);
    const tokens = text.split(" ");
    console.log("tokens");
    console.log(tokens);

    const getInteroplation = (token, i) => {

        if (token.charAt(0) === "#"){
            console.log(token);

            return (
                <WorldTag text={token.substring(1)} key={i}/>
            )
        }else{

        }


        return (
            <div style={{display: "inline"}} key={i} >
                {token + " "}
            </div>
        )


    }

    //Ho <WorldTag text="sintomi"/> da <WorldTag text="duranta"/>, è un problema che si presenta <WorldTag text="frequenza"/>
    return (
        <div>
            {
                tokens.map((token, i) => getInteroplation(token, i))
            }
        </div>
    )
}


export default ExpertText;
