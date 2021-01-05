
//?address=VIa...
export function climateZoneAPI() {
    return "https://dtn33ns4je.execute-api.eu-central-1.amazonaws.com/test";
}

//POST
export function exposureAPI() {
    return "https://z5a0ny9hyh.execute-api.eu-central-1.amazonaws.com/test";
}

//POST
export function cartiglioAPI() {
    return "https://er88f85cng.execute-api.eu-central-1.amazonaws.com/test";
}


export function formatSelectedPoints(points){
    //private String address;
    //     private String city;
    //     private Climate climate;
    //     private List<Side> sides;
    //     private List<Point> points;

    // private Double x;
    //     private Double y;
    //     private String label;
    var pointsList = [];
    for (var i = 0; i < points.length - 1; i++){
        pointsList = [...pointsList, {
            x: points[i][1],
            y: points[i][0]
        }];
    }

    // console.log("---- FORMATTING ----")
    // console.log(JSON.stringify(points));
    // console.log(JSON.stringify(pointsList));



    // //aggiungo un punto per avere ultimo lato
    //
    // pointsList = [...pointsList, {
    //     x: points[0][1],
    //     y: points[0][0]
    // }];

    return {
        points: pointsList
    };
}

export function getDifference(punti){
    var xMax=punti[0].x;
    var yMax=punti[0].y;
    var xMin=punti[0].x;
    var yMin=punti[0].y;
    for(var i=0; i<punti.length; i++){
        if(punti[i].x>xMax){
            xMax=punti[i].x;
        }
        if(punti[i].x<xMin){
            xMin=punti[i].x;
        }

        if(punti[i].y>yMax){
            yMax=punti[i].y;
        }
        if(punti[i].y<yMin){
            yMin=punti[i].y;
        }

    }

    return [{"x":xMax,"y":yMax},{"x":xMin,"y":yMin}];
}

export function getMaxX(maxY,x,y){
    return ( (maxY*x)/y );
}

export function rapporto(top,max,variabile) {
    return (max*variabile)/top;
}

export function processSides(points){

    var data = [];
    for (var i = 0; i < points.length - 1; i++){
        data = [...data, {
            x: points[i].y,
            y: points[i].x
        }];
    }



    console.log(JSON.stringify(data));


    // var data = [
    //     {x: 14.232311993837357, y: 40.846625138698755},
    //     {x: 14.232369661331177, y: 40.846275136640315},
    //     {x: 14.23223689198494, y: 40.846259919117614},
    //     {x: 14.2320317029953, y: 40.846314702183065},
    //     {x: 14.232008904218674, y: 40.84645876113916},
    //     {x: 14.232235550880432, y: 40.84657542837411},
    //     {x: 14.23223152756691, y: 40.84660890676011},
    //     {x: 14.232311993837357, y: 40.846625138698755}
    //     ];


    var processed = [];
    const maxY = 300;
    const maxMin = getDifference(data);
    const topX = maxMin[0].x;
    const topY = maxMin[0].y;
    const bottomX = maxMin[1].x;
    const bottomY = maxMin[1].y;
    const maxX = getMaxX(maxY,topX- bottomX,topY-bottomY);

    for(var i = 0; i<data.length-1;i++){

        const x1 = rapporto(topX-bottomX, maxX,data[i].x - bottomX);
        const y1 = rapporto(topY-bottomY,maxY*1.3,data[i].y - bottomY);
        const x2 = rapporto(topX-bottomX, maxX,data[i+1].x - bottomX);
        const y2 = rapporto(topY-bottomY,maxY*1.3,data[i+1].y - bottomY);

        const point1 = {
            x: x1,
            y: (y1*(-1))+maxY+(maxY/3)
        }

        const point2 = {
            x: x2,
            y: (y2*(-1))+maxY+(maxY/3)
        }

        processed = [...processed, {
            sideId: "side-" + i,
            points: [point1, point2],
            original: [data[i], data[i + 1]],
            rooms: [],
            color: "black",
            //exposure: sidesData[i].exposure
        }]
        //sidesData[i].points = [point1, point2]
    }

    return processed;
}

function getColor(exposure) {
    console.log("esposizione da colorare: " + exposure)
    switch (exposure) {
        case 'NORD_EST':
            return "blue"
        case 'SUD_EST':
            return 'red'
        case 'NORD_OVEST':
            return 'green'
        case 'SUD_OVEST':
            return 'yellow'
        default:
            return '#0247a8'
    }
}

export function mergeDataSide(computedSides, processed) {
    for (var i = 0; i < processed.length; i++){
        for (var j = 0; j < computedSides.length; j++){
            console.log("analizzo punti per matching")
            var point1 = computedSides[j].point1;
            var point2 = computedSides[j].point2;

            var point1X = point1.x;
            var point1Y = point1.y;
            var point2X = point2.x;
            var point2Y = point2.y;

            var original1X = processed[i].original[0].y;
            var original1Y = processed[i].original[0].x;

            var original2X = processed[i].original[1].y;
            var original2Y = processed[i].original[1].x;
            console.log(point1X + "-" + point1Y)
            console.log(point2X + "-" + point2Y)
            console.log(original1X + "-" + original1Y)
            console.log(original2X + "-" + original2Y)


            if (point1X - original1X === 0 && point1Y - original1Y === 0 && point2X - original2X === 0 && point2Y - original2Y === 0){
                console.log("match!")
                var c = getColor(computedSides[j].exposure);
                console.log(c);
                processed[i] = {...processed[i], exposure: computedSides[j].exposure, color: c}
            }
            // else {
            //     processed[i] = {...processed[i], exposure: computedSides[j].exposure, color: "#0247a8"}
            // }


            point1 = computedSides[j].point2;
            point2 = computedSides[j].point1;

            point1X = point1.x;
            point1Y = point1.y;
            point2X = point2.x;
            point2Y = point2.y;

            original1X = processed[i].original[0].y;
            original1Y = processed[i].original[0].x;

            original2X = processed[i].original[1].y;
            original2Y = processed[i].original[1].x;

            if (point1X === original1X && point1Y === original1Y && point2X === original2X && point2Y === original2Y){
                processed[i] = {...processed[i], exposure: computedSides[j].exposure, color: getColor(computedSides[j].exposure)}
            }
            // else {
            //     processed[i] = {...processed[i], exposure: computedSides[j].exposure, color: "#0247a8"}
            // }


            // processed[i] = {...processed[i], exposure: "", color: "#0247a8"}

        }
    }
    return processed;
}

export default {climateZoneAPI, exposureAPI, cartiglioAPI, formatSelectedPoints, getDifference, getMaxX, rapporto, processSides, mergeDataSide}
