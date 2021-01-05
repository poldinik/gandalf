import React from "react";
import './PlanSide.css';
import {useDispatch, useSelector} from "react-redux";

const PlanSide = ({id, linePoints, color}) => {
    var maxY=300;
    const sideId = id;
    const stroke = 7;
    const nextRoomId = useSelector(state => state.nextRoomId);
    const mappa = useSelector(state => state.steps.mappa);
    //const rooms = useSelector(state => state.steps.mappa.data.sides.rooms.filter(room => room.sideId === sideId));
    //const rooms = useSelector(state => state.steps.mappa.data.sides.filter(side => side.sideId === sideId)).rooms
    //const sides = useSelector(state => state.steps.mappa.data.sides);
    const sides = useSelector(state => state.stepsList[7].data.sides);
    const currentSide = sides.filter(side => side.sideId === sideId)[0];
    const globalRoomIndices = useSelector(state => state.globalRoomIndices);
    const roomsNumber = useSelector(state => state.roomsNumber);
    //console.log("curren side");

    //console.log(currentSide);

    const sideIndex = sides.indexOf(currentSide);
    const otherSides = sides.filter(side => side.sideId !== sideId);
    const vettoreR = currentSide.rooms;

    //console.log(vettoreR);

    const dispatch = useDispatch();
    function drawPoint(linePoints,nPoints,r){
        //DISEGNA N PUNTI SULLA LINEA DATA IN INPUT
        //var line1=document.getElementById(line);
        //var piantina=document.getElementById("piantina");
        var x1=linePoints[0].x;
        var x2=linePoints[1].x;
        var y1=linePoints[0].y;
        var y2=linePoints[1].y;

        // console.log(x1);
        // console.log(x2);
        // console.log(y1);
        // console.log(y2);
        var segmentoX=(Math.abs(x1-x2))/(nPoints+1);
        var segmentoY=(Math.abs(y1-y2))/(nPoints+1);
        var xMin;
        var yMin;
        if(x1<x2){
            xMin=x1;
        }else{
            xMin=x2;
        }

        if(y1<y2){
            yMin=y2;
        }else{
            yMin=y1;
        }

        var planRooms = []
        for(var i=1; i<=nPoints; i++) {
            // try{
            //     piantina.removeChild(piantina.getElementById( "circle-" + line+"-"+i ));
            //
            // }catch (e) {
            //     console.log(e);
            // }
            // var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            // var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            // circle.setAttribute("id", "circle-" + line+"-"+i);
            // circle.setAttribute("class", "circle-" + line);
            // circle.setAttribute("cx", (xMin + (segmentoX * i)));
            // circle.setAttribute("cy", (((xMin + (segmentoX * i))-x1)/(x2-x1)*(y2-y1))+y1);
            // circle.setAttribute("r", r);
            //
            // circle.setAttribute("style", "stroke:rgb(255,0,0);fill:rgb(255,0,0);stroke-width:2");
            //
            // piantina.appendChild(circle);

            planRooms = [
                ...planRooms,
                {
                    cx: (xMin + (segmentoX * i)),
                    cy: (((xMin + (segmentoX * i))-x1)/(x2-x1)*(y2-y1))+y1,
                    r: r
                }]
        }
        return planRooms;
    }

    function generatePointsOnLine(linePoints){
        var circleR=7;
        //CALCOLA IL NUMERO DI PUNTI GIA' INSERITO SULLA LINEA E POI DISEGNA UN PUNTO IN PIù
       // var piantina=document.getElementById("piantina");

        try {
            //var nPoints = document.getElementsByClassName("circle-" + line).length;//Controllo il numero di Punti già inseriti sulla linea
            var nPoints = currentSide.rooms.length;
            //console.log("nPoints::::::::" + nPoints);
            // try{
            //
            //     for(var i=1;i<=nPoints;i++){
            //         try {
            //             //piantina.removeChild(document.getElementById( "circle-" + line+"-"+i  ));
            //             //console.log("RIMUOVO CHILD!!!!!!!!!!!!!");
            //         }catch(e){
            //
            //         }
            //     }
            //
            // }catch(e){
            //     console.log(e);
            //     //nPoints=0;
            // }
            //var linea=document.getElementById(line);

            var x1=linePoints[0].x;
            var x2=linePoints[1].x;
            var y1=linePoints[0].y;
            var y2=linePoints[1].y;
            // var x1=parseInt(linea.getAttribute("x1"));
            // var x2=parseInt(linea.getAttribute("x2"));
            // var y1=parseInt(linea.getAttribute("y1"));
            // var y2=parseInt(linea.getAttribute("y2"));
            //console.log("Lunghezza line: " +(Math.sqrt( ( Math.pow( Math.abs( (x2-x1) ),2 ) +  Math.pow( Math.abs( (y2-y1) ),2 ) ) )));
            if( ((Math.sqrt( ( Math.pow( Math.abs( (x2-x1) ),2 ) +  Math.pow( Math.abs( (y2-y1) ),2 ) ) ))/(nPoints+2)) < 20 ){
                //console.log("ENTRO NELL'IF");
                //piantina.removeChild(piantina.getElementsByClassName("circle-"+line));
                for(var i=1;i<=nPoints;i++){
                    try {
                        // piantina.removeChild(document.getElementById( "circle-" + line+"-"+i  ));
                        //console.log("RIMUOVO CHILD!!!!!!!!!!!!!");
                    }catch{

                    }
                }
                nPoints=0;
                circleR=15;
                // var circleArray=document.getElementsByClassName("circle-" + line);
                // console.log(circleArray);
                // for(var i=0;i<circleArray.length;i++){
                //     try{
                //         piantina.removeChild(circleArray[i]);
                //     }catch(e){
                //
                //     }
                // }
            }
        }catch(e){
            nPoints=0;
            console.log(e);
        }

        return drawPoint(linePoints,nPoints + 1, circleR);
    }

    const onClick = () => {

        //0 seleziono sides e lato corrente e prendi indice nel vettore dei sides del lato corrente (sideIndex)
        //1 seleziono stanze (rooms) del lato corrente (vettore r) -> useSelector all'inizio

        //2 aggiungo nuova stanza in r

        //3 creo vettore delle posizioni p della forma [{cx: 32.232, cy: 102.21}, ....] tramite funzione drawline

        //4 itero sul vettore delle posizioni ed eseguo per ogni i: r[i] = {...r[i], cx: p[i].cx, cy: p[i].cy}

        //5 aggiorno sides tramite redux: prendere mappa e poi

        //sides[sideIndex] = {...currentSide, rooms: r}
        //{...mappa, sides: sides}

        //console.log("r senza stanza")
        //console.log(vettoreR);
        var r = vettoreR;
        var room = {
            name: "Nuova stanza",
            sideId: sideId,
            id: nextRoomId,
            setup: {
                "stanza": "Scegli...",
                "tipo": "Scegli...",
                "piano": 0,
                "quantita": 1,
                "base": 100.00,
                "altezza": 150.00,

            }
        }

        //console.log("r con nuova stanza")
        r = [...r, room];
        //console.log(r);

        var p = generatePointsOnLine(linePoints);

        var gri = [...globalRoomIndices, nextRoomId];

        for (var i = 0; i < p.length; i++){
            //r[i].cx = p[i].cx;
            //r[i].cy = p[i].cy;
            r[i] = {...r[i], cx: p[i].cx, cy: p[i].cy}
        }

       // console.log("nuova lista stanze");
//        console.log(r)

        //console.log(sideIndex);
        sides[sideIndex] = {...currentSide, rooms: [...r]}

        // for(var i = 0; i < sides.length; i++){
        //     for(var j = 0; j < sides[i].rooms.length; j++){
        //
        //     }
        // }

        //console.log(sides);

        // dispatch({
        //     type: 'UPDATEMAPPA',
        //     mappa: {
        //         ...mappa,
        //         data: {
        //             ...mappa.data,
        //             sides: [...sides]}
        //     }
        // })

        //mette [...sides] perchè sennò non rileva il cambiamento di stato...
        dispatch({
            type: 'UPDATESIDES',
            sides: [...sides]
        })


        dispatch(
            {
                type: "UPDATENEXTROOMID",
                next: nextRoomId + 1,
            }
        )

        dispatch(
            {
                type: 'UPDATEROOMSNUMBER',
                roomsNumber: roomsNumber + 1
            }
        )
    }


    return (
        <g>
            <line onClick={onClick} className="side" id={sideId} x1={linePoints[0].x} y1={linePoints[0].y} x2={linePoints[1].x} y2={linePoints[1].y} style={{stroke: "black", strokeWidth: stroke + 3, strokeLinecap: "round"}}/>
            <line onClick={onClick} className="side" id={sideId + "interno"} x1={linePoints[0].x} y1={linePoints[0].y} x2={linePoints[1].x} y2={linePoints[1].y} style={{stroke: color, strokeWidth: "6", strokeLinecap: "round"}}/>
        </g>
    )
}

export default PlanSide;
