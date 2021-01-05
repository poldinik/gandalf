import React, {Fragment} from "react";
import './Proposta.css';
import PropostaItem from "./PropostaItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faEye, faFilePdf, faWindowMaximize} from "@fortawesome/free-solid-svg-icons";
import PropostaItemIcon from "./PropostaItemIcon";

const Sistemi = () => {
    return (
        <div>
            <PropostaItem
                symbol={<PropostaItemIcon src={"https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/sistema.svg"}/>}
                title={"PV5Plus"}
                actionTitle={
                    <Fragment>
                        <FontAwesomeIcon icon={faEye} className="action-icon-left"/>
                        Vedi Sistema
                    </Fragment>
                }
                choices={[<div style={{display: "inline"}}>No</div>]}/>
            <PropostaItem
                symbol={<PropostaItemIcon src={"https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/sistema.svg"}/>}
                title={"Serena"}
                actionTitle={
                    <Fragment>
                        <FontAwesomeIcon icon={faEye} className="action-icon-left"/>
                        Vedi Sistema
                    </Fragment>
                }
                choices={[<div style={{display: "inline"}}>No</div>]}
                dark={false}
            />
            <PropostaItem
                symbol={<PropostaItemIcon src={"https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/sistema.svg"}/>}
                title={"Serena RC2"}
                actionTitle={
                    <Fragment>
                        <FontAwesomeIcon icon={faEye} className="action-icon-left"/>
                        Vedi Sistema
                    </Fragment>
                }
                choices={[<div style={{display: "inline"}}>No</div>]}/>
            <PropostaItem
                symbol={<PropostaItemIcon src={"https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/sistema.svg"}/>}
                title={"Porte"}
                actionTitle={
                    <Fragment>
                        <FontAwesomeIcon icon={faEye} className="action-icon-left"/>
                        Vedi Sistema
                    </Fragment>
                }
                choices={[<div style={{display: "inline"}}>No</div>]}
                dark={false}
            />
            <PropostaItem
                symbol={<PropostaItemIcon src={"https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/sistema.svg"}/>}
                title={"Portoncini"}
                actionTitle={
                    <Fragment>
                        <FontAwesomeIcon icon={faEye} className="action-icon-left"/>
                        Vedi Sistema
                    </Fragment>
                }
                choices={[<div style={{display: "inline"}}>No</div>]}/>
        </div>
    )
}

export default Sistemi;
