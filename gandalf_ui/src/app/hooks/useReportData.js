import {useSelector} from "react-redux";
import moment from "moment";


const useReportData = () => {
    var now = new Date();
    var currentData =  moment(now).format('YYYY-MM-DD');
    const cliente = useSelector(state => state.stepsList[0].data);
    // nome: "",
    //                 cognome: "",
    //                 indirizzo: "",
    //                 citta: "",
    //                 provincia: "",
    //                 cap: "",
    //                 telefono: "",
    //                 cellulare: "",
    //                 email: "",
    //                 fatturazionediversa: false,
    //                 indirizzofatturazione: "",
    //                 cittafatturazione: "",
    //                 provinciafatturazione: "",
    //                 capfatturazione: ""

    const abitazione = useSelector(state => state.stepsList[4].data).filter(c => c.selected === true)[0];
    const utilzzo = useSelector(state => state.stepsList[3].data).filter(c => c.selected === true)[0];
    const intervento = useSelector(state => state.stepsList[5].data).filter(c => c.selected === true)[0];

    const data = {
        "id": "id",
        "date": currentData,
        "customer": {
            "firstName": cliente.nome,
            "lastName": cliente.cognome,
            "city": cliente.citta,
            "phone": cliente.telefono,
            "cell": cliente.cellulare,
            "email": cliente.email
        },
        "retailer": {
            "name": "Atlacoop Finestra Italia",
            "address": "Via Bolognese 5, 50038 Scarperia e San Piero (FI)"
        },
        "houseType": abitazione.title,
        "houseUsage": utilzzo.title,
        "interventionType": intervento.title,
        "noiseSources": [
                    {
                        "name": "Locale di intrattenimento",
                        "number": 2
                    },
                    {
                        "name": "Stazione taxi",
                        "number": 1
                    },
                    {
                        "name": "Struttura sanitaria",
                        "number": 1
                    },
                    {
                        "name": "Stazione dei bus",
                        "number": 2
                    }
                ],
        "motivations": [
                    {
                        "name": "Luce naturale scarsa"
                    },
                    {
                        "name": "Ho porte finestre prive di copertura"
                    },
                    {
                        "name": "Ho subito scassi alle finestre"
                    }
                ],
        "building": {
                    "address": "via Giacomo Leopardi, 51100 Pistoia (PT)",
                    "city": "Pistoia",
                    "climate": {
                        "id": null,
                        "created": null,
                        "updated": null,
                        "province": "PT",
                        "municipality": "Pistoia",
                        "hasl": 350,
                        "degreesday": 50,
                        "zone": "E"
                    },
                    "sides": [
                        {
                            "point1": {
                                "x": 10.910905748605728,
                                "y": 43.94177156980601,
                                "label": null
                            },
                            "point2": {
                                "x": 10.911061316728592,
                                "y": 43.94181598997113,
                                "label": null
                            },
                            "exposure": "NORD_OVEST",
                            "real": false,
                            "theta": null,
                            "omega": 344.06,
                            "rooms": [
                                {
                                    "id": 1,
                                    "name": null,
                                    "type": null,
                                    "floor": 1
                                },
                                {
                                    "id": 2,
                                    "name": null,
                                    "type": null,
                                    "floor": 1
                                }
                            ]
                        },
                        {
                            "point1": {
                                "x": 10.91112568974495,
                                "y": 43.9416962485806,
                                "label": null
                            },
                            "point2": {
                                "x": 10.911061316728592,
                                "y": 43.94181598997113,
                                "label": null
                            },
                            "exposure": "SUD_EST",
                            "real": false,
                            "theta": null,
                            "omega": 61.74,
                            "rooms": [
                                {
                                    "id": 3,
                                    "name": null,
                                    "type": null,
                                    "floor": 0
                                }
                            ]
                        },
                        {
                            "point1": {
                                "x": 10.910856127738953,
                                "y": 43.94173777183207,
                                "label": null
                            },
                            "point2": {
                                "x": 10.91091513633728,
                                "y": 43.94175418799324,
                                "label": null
                            },
                            "exposure": "NORD_OVEST",
                            "real": false,
                            "theta": null,
                            "omega": 344.45,
                            "rooms": [
                                {
                                    "id": 4,
                                    "name": null,
                                    "type": null,
                                    "floor": 2
                                },
                                {
                                    "id": 5,
                                    "name": null,
                                    "type": null,
                                    "floor": 2
                                }
                            ]
                        },
                        {
                            "point1": {
                                "x": 10.910856127738953,
                                "y": 43.94173777183207,
                                "label": null
                            },
                            "point2": {
                                "x": 10.910917818546295,
                                "y": 43.94162478989392,
                                "label": null
                            },
                            "exposure": "SUD_OVEST",
                            "real": false,
                            "theta": null,
                            "omega": 241.36,
                            "rooms": []
                        },
                        {
                            "point1": {
                                "x": 10.910995602607727,
                                "y": 43.94164700003549,
                                "label": null
                            },
                            "point2": {
                                "x": 10.91098889708519,
                                "y": 43.941657622274164,
                                "label": null
                            },
                            "exposure": "NORD_EST",
                            "real": false,
                            "theta": null,
                            "omega": 344.06,
                            "rooms": [
                                {
                                    "id": 6,
                                    "name": null,
                                    "type": null,
                                    "floor": 1
                                }
                            ]
                        },
                        {
                            "point1": {
                                "x": 10.910995602607727,
                                "y": 43.94164700003549,
                                "label": null
                            },
                            "point2": {
                                "x": 10.910917818546295,
                                "y": 43.94162478989392,
                                "label": null
                            },
                            "exposure": "SUD_EST",
                            "real": false,
                            "theta": null,
                            "omega": 164.06,
                            "rooms": [
                                {
                                    "id": 7,
                                    "name": null,
                                    "type": null,
                                    "floor": 2
                                }
                            ]
                        },
                        {
                            "point1": {
                                "x": 10.91112568974495,
                                "y": 43.9416962485806,
                                "label": null
                            },
                            "point2": {
                                "x": 10.91098889708519,
                                "y": 43.941657622274164,
                                "label": null
                            },
                            "exposure": "SUD_EST",
                            "real": false,
                            "theta": null,
                            "omega": 164.23,
                            "rooms": [
                                {
                                    "id": 8,
                                    "name": null,
                                    "type": null,
                                    "floor": 3
                                },
                                {
                                    "id": 9,
                                    "name": null,
                                    "type": null,
                                    "floor": 4
                                },
                                {
                                    "id": 11,
                                    "name": null,
                                    "type": null,
                                    "floor": 6
                                }
                            ]
                        },
                        {
                            "point1": {
                                "x": 10.91091513633728,
                                "y": 43.94175418799324,
                                "label": null
                            },
                            "point2": {
                                "x": 10.910905748605728,
                                "y": 43.94177156980601,
                                "label": null
                            },
                            "exposure": "NORD_OVEST",
                            "real": false,
                            "theta": null,
                            "omega": 241.63,
                            "rooms": []
                        }
                    ],
                    "points": [
                        {
                            "x": 10.910658985376358,
                            "y": 43.941375649476754,
                            "label": null
                        },
                        {
                            "x": 10.910695195198059,
                            "y": 43.941310950050365,
                            "label": null
                        },
                        {
                            "x": 10.910849422216415,
                            "y": 43.94135537055965,
                            "label": null
                        },
                        {
                            "x": 10.910890996456146,
                            "y": 43.94128101447103,
                            "label": null
                        },
                        {
                            "x": 10.910691171884537,
                            "y": 43.941223074597275,
                            "label": null
                        },
                        {
                            "x": 10.910675078630447,
                            "y": 43.941252044541216,
                            "label": null
                        },
                        {
                            "x": 10.910642892122269,
                            "y": 43.94124238789482,
                            "label": null
                        },
                        {
                            "x": 10.910669714212418,
                            "y": 43.941196035970194,
                            "label": null
                        },
                        {
                            "x": 10.91047927737236,
                            "y": 43.941140993012795,
                            "label": null
                        },
                        {
                            "x": 10.910433679819107,
                            "y": 43.941220177602105,
                            "label": null
                        },
                        {
                            "x": 10.910519510507584,
                            "y": 43.94124528488891,
                            "label": null
                        },
                        {
                            "x": 10.910476595163345,
                            "y": 43.941322538012514,
                            "label": null
                        }
                    ]
                },
        "windowSystem": null,
        "firstColor": {
            "id": null,
            "created": null,
            "updated": null,
            "name": "Mogano",
            "code": "P25",
            "sampleUrlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/MOGANO_P25.jpg",
            "systemUrlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant_Star/MOGANO_P25.jpg",
            "category": "Elegant_Star",
            "description": null
        },
        "secondColor": null,
        "information": {
            "lapt": true,
            "lapp": true,
            "hssaf": true,
            "vtf": true,
            "vc": true,
            "lns": true,
            "hpfpdc": true,
            "budget": "€€"
        }
    };

    return data;
}

export default useReportData;
