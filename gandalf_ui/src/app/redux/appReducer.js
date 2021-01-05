import {loadLocalState, refreshLocalState, saveLocalState} from "../local/localStorage";
import {ones} from "mathjs";
import {v4 as uuidv4} from 'uuid';
import moment from "moment";

export function getCurrentTime(){
    var now = new Date();
    return moment(now).format('YYYY-MM-DD HH:mm:ss');
}

const initialState = {
    visibleEditorData: false,
    message: {
        error: false,
        info: true,
        warning: false,
        success: false,
        title: "",
        visible: false,
        text: "",
    },
    activeTour: false,
    reloaded: false,
    last: getCurrentTime(),
    sessione: uuidv4(),
    loading: false,
    selectedBuilding: {
        points: []
    },
    sides: [],
    globalRoomIndices: [],
    visibleEditor: false,
    roomsNumber: 0,
    nextRoomId: 1,
    steps: {
        anagrafica: {
            completed: false,
            order: 0,
            title: "Anagrafica",
            description: "",
            data: {
                nome: "",
                cognome: "",
                indirizzo: "",
                citta: "",
                provincia: "",
                cap: "",
                telefono: "",
                cellulare: "",
                email: "",
                fatturazionediversa: false,
                indirizzofatturazione: "",
                cittafatturazione: "",
                provinciafatturazione: "",
                capfatturazione: ""
            }
        },
        marketing: {
            completed: false,
            order: 1,
            title: "Marketing",
            description: "",
            data: {
                scorrevoli: {
                    question: "",
                    answers:[
                        "Sì",
                        "No"
                    ],
                    answer: ""
                },
                areazioni: {
                    question: "",
                    answers:[
                        "Sì",
                        "No"
                    ],
                    answer: ""
                },
                fiscali: {
                    question: "",
                    answers:[
                        "Sì",
                        "No"
                    ],
                    answer: ""
                },
                energetico: {
                    question: "",
                    answers:[
                        "Sì",
                        "No"
                    ],
                    answer: ""
                },
                duecolori: {
                    question: "",
                    answers:[
                        "Sì",
                        "No"
                    ],
                    answer: ""
                },
                posa: {
                    question: "",
                    answers:[
                        "Sì",
                        "No"
                    ],
                    answer: ""
                },
                pvc: {
                    question: "",
                    answers:[
                        "Sì",
                        "No"
                    ],
                    answer: ""
                },
                ecologico: {
                    question: "",
                    answers:[
                        "Sì",
                        "No"
                    ],
                    answer: ""
                },
                acry: {
                    question: "",
                    answers:[
                        "Sì",
                        "No"
                    ],
                    answer: ""
                },
                budget: {
                    question: "",
                    answers:[
                        "€",
                        "€€",
                        "€€€",
                        "€€€€",
                        "€€€€+"
                    ],
                    answer: ""
                },
                conosciuti: {
                    question: "",
                    answers:[
                        "Pubblicità",
                        "Passa parola",
                        "Facebook",
                        "Google",
                        "Altro"
                    ],
                    answer: ""
                },
                anni: {
                    question: "",
                    answers:[
                        "Meno di 15",
                        "Più di 15 anni"
                    ],
                    answer: ""
                },
                materiale: {
                    question: "",
                    answers:[
                        "Sì",
                        "No"
                    ],
                    answer: ""
                },
                vincoli: {
                    question: "",
                    answers:[
                        "Sì",
                        "No"
                    ],
                    answer: ""
                },
                tipologia: {
                    question: "",
                    answers:[
                        "Sì",
                        "No"
                    ],
                    answer: ""
                },
            }
        },
        motivazioni: {
            completed: false,
            order: 2,
            title: "Motivazioni",
            description: "",
            data: {
                spifferi: {
                    titile: "Spifferi",
                    chosen: false,
                    img: ""
                },
                isolamentoesterno: {
                    titile: "Scarso isolamento dal rumore esterno",
                    chosen: false,
                    img: ""
                },
                climafreddo: {
                    titile: "Clima freddo d'inverno e caldo in estate",
                    chosen: false,
                    img: ""
                },
                migliorie: {
                    titile: "Migliorie estetiche",
                    chosen: false,
                    img: ""
                },
                privacy: {
                    titile: "Scarsa privacy",
                    chosen: false,
                    img: ""
                },
                condensa: {
                    titile: "Condensa",
                    chosen: false,
                    img: ""
                },
                lucenaturale: {
                    titile: "Luce naturale scarsa",
                    chosen: false,
                    img: ""
                },
                portefinestre: {
                    titile: "Ho porte finestre prive di coperture",
                    chosen: false,
                    img: ""
                },
                chiusura: {
                    titile: "Ho avuto problemi a chiudere o aprire le finestre",
                    chosen: false,
                    img: ""
                },
                scassi: {
                    titile: "Ho subito scassi alle finestre",
                    chosen: false,
                    img: ""
                },
            }
        },
        utilizzo: {
            completed: false,
            order: 3,
            title: "Utilizzo",
            description: "",
            data: {
                viverci: {
                    title: "Per viverci",
                    img: "",
                    chosen: false
                },
                affitto: {
                    title: "Per affitto",
                    img: "",
                    chosen: false
                },
                vacanze: {
                    title: "Per vacanze",
                    img: "",
                    chosen: false
                }
            }
        },
        abitazione: {
            completed: false,
            order: 4,
            title: "Abitazione",
            description: "",
            data: {
                singola: {
                    title: "Casa singola",
                    img: "",
                    chosen: false
                },
                condominio: {
                    title: "Condominio",
                    img: "",
                    chosen: false
                },
                villetta: {
                    title: "Villetta a schiera",
                    img: "",
                    chosen: false
                }
            }
        },
        intervento: {
            completed: false,
            order: 5,
            title: "Intervento",
            description: "",
            data: {
                ristrutturazione: {
                    title: "Ristrutturazione",
                    img: "",
                    chosen: false
                },
                sostituzione: {
                    title: "Sostituzione",
                    img: "",
                    chosen: false
                },
                costruzione: {
                    title: "Nuova costruzione",
                    img: "",
                    chosen: false
                }
            }
        },
        mappa: {
            completed: false,
            order: 6,
            title: "Mappa",
            description: "",
            data: {
                location: {
                    lat: "",
                    lng: "",
                    address: {

                    }
                },
                points: [

                ],
                rooms: [

                ],
                sides: [
                    {

                        sideId: "side-1",
                        points: [
                            {
                                x: 248.96497969997932,
                                y: 10
                            },
                            {
                                x: 296.3344227402409,
                                y: 383.7499571215703
                            }
                        ],
                        color: "green",
                        rooms: [],
                        exposure: "nord-est"
                    },
                    {
                        sideId: "side-2",
                        points: [
                            {
                                x: 296.3344227402409,
                                y: 383.7499571215703
                            },
                            {
                                x: 187.27454225219685,
                                y: 400
                            }
                        ],
                        color: "blue",
                        rooms: [],
                        exposure: "sud-est"
                    },
                    {
                        sideId: "side-3",
                        points: [
                            {
                                x: 187.27454225219685,
                                y: 400,
                            },
                            {
                                x: 18.727454225219685,
                                y: 341.499863016145
                            }
                        ],
                        color: "yellow",
                        rooms: [],
                        exposure: "sud-ovest"
                    },
                    {
                        sideId: "side-4",
                        points: [
                            {
                                x: 18.727454225219685,
                                y: 341.499863016145
                            },
                            {
                                x: 0,
                                y: 187.66640013946304
                            }
                        ],
                        color: "green",
                        rooms: [],
                        exposure: "sud-ovest"
                    },
                    {
                        sideId: "side-5",
                        points: [
                            {
                                x: 0,
                                y: 187.6664001394630
                            },
                            {
                                x: 186.17292729777213,
                                y: 63.08320696098451
                            }
                        ],
                        color: "yellow",
                        rooms: [],
                        exposure: "nord-ovest"
                    },
                    {
                        sideId: "side-6",
                        points: [
                            {
                                x: 186.17292729777213,
                                y: 63.08320696098451
                            },
                            {
                                x: 182.8680824344981,
                                y: 27.333287694136516
                            }
                        ],
                        color: "yellow",
                        rooms: [],
                        exposure: "nord-ovest"
                    },
                    {
                        sideId: "side-7",
                        points: [
                            {
                                x: 182.8680824344981,
                                y: 27.333287694136516
                            },
                            {
                                x: 248.96497969997932,
                                y: 10
                            }
                        ],
                        color: "red",
                        rooms: [],
                        exposure: "nord-ovest"
                    },
                ],
                roomPoints: [

                ]
            }
        },
        editor: {
            completed: false,
            order: 7,
            title: "Editor",
            description: "",
            data: {

            }
        },
        colori: {
            completed: false,
            order: 8,
            title: "Colori",
            description: "",
            data: {
                colors: [

                ]
            }
        },
        presentazione: {
            completed: false,
            order: 9,
            title: "Presentazione",
            description: "",
        },
        sistemi: {
            completed: false,
            order: 10,
            title: "Sistemi",
            description: "",
        },
        proposta: {
            completed: false,
            order: 11,
            title: "Proposta",
            description: "",
        }
    },
    currentStepIndex: 0,
    maxStep: 0,
    adjacency: ones([1, 1]),
    categories: ["Cliente", "Edificio", "Proposta"],
    stepsList:[
        {
            id: 1,
            category: 0,
            path: "/cliente",
            completed: false,
            validated: false,
            runvalidation: false,
            order: 0,
            title: "Cliente",
            description: "Inserisci i dati cliente per assegnare la nuova elaborazione.",
            data: {
                nome: "",
                cognome: "",
                indirizzo: "",
                citta: "",
                provincia: "",
                cap: "",
                telefono: "",
                cellulare: "",
                email: "",
                fatturazionediversa: false,
                indirizzofatturazione: "",
                cittafatturazione: "",
                provinciafatturazione: "",
                capfatturazione: ""
            }
        },
        {
            id: 2,
            category: 0,
            path: "/marketing",
            completed: true,
            validated: true,
            runvalidation: false,
            order: 1,
            title: "Marketing",
            answered: false,
            description: "Per aiutarci a capire quanto sei informato e su cosa possiamo aiutarti, abbiamo alcune domande di indagine per te.",
            data: [],
            multi:[
                {
                    question: "Conosci le finestre scorrevoli?",
                    answers: [
                        "Sì",
                        "No"
                    ],
                    currentAnsIndex: null
                },
                {
                    question: "Conosci i vantaggi dell'areazione meccanica?",
                    answers: [
                        "Sì",
                        "No"
                    ],
                    currentAnsIndex: null
                },
                {
                    question: "Conosci i vantaggi fiscali stabiliti per legge?",
                    answers: [
                        "Sì",
                        "No"
                    ],
                    currentAnsIndex: null
                },
                {
                    question: "Conosce il rapporto tra finestre e risparmio energetico?",
                    answers: [
                        "Sì",
                        "No"
                    ],
                    currentAnsIndex: null
                },
                {
                    question: "Sa che ci sono finestre a due colori (esterno - interno diversi)?",
                    answers: [
                        "Sì",
                        "No"
                    ],
                    currentAnsIndex: null
                },
                {
                    question: "Sa che la costruzione e la posa delle finestre sono normate e sottoposte a preventivi test e fra questi la resistenza agli agenti atmosferici?",
                    answers: [
                        "Sì",
                        "No"
                    ],
                    currentAnsIndex: null
                },
                {
                    question: "Conosce persone che possiedono finestre PVC?",
                    answers: [
                        "Sì",
                        "No"
                    ],
                    currentAnsIndex: null
                },
                {
                    question: "Il PVC è un materiale ecologico, ne conosci i motivi?",
                    answers: [
                        "Sì",
                        "No"
                    ],
                    currentAnsIndex: null
                },
                {
                    question: "Conosce il trattamento Acrylcolor?",
                    answers: [
                        "Sì",
                        "No"
                    ],
                    currentAnsIndex: null
                },
                {
                    question: "Esistono vincoli relativi al colore esterno delle finestre nella sua zona?",
                    answers: [
                        "Sì",
                        "No"
                    ],
                    currentAnsIndex: null
                },
                {
                    question: "Esistono vincoli relativi alla tipologia delle finestre nella sua zona?",
                    answers: [
                        "Sì",
                        "No"
                    ],
                    currentAnsIndex: null
                },
                {
                    question: "Le tue finestre hanno circa 15 anni o più?",
                    answers: [
                        "Meno di 15",
                        "Circa 15",
                        "Più di 15"
                    ],
                    currentAnsIndex: null,
                },
                {
                    question: "In quale materiale sono le tue vecchie finestre?",
                    answers: [
                        "Legno",
                        "Alluminio",
                        "PVC",
                        "Altro"
                    ],
                    currentAnsIndex: null,
                },
                {
                    question: "Come ci hai conosciuti?",
                    answers: [
                        "Social",
                        "Google",
                        "Passaparola",
                        "Altro"
                    ],
                    currentAnsIndex: null,
                },
                {
                    question: "Qual è il tuo budget?",
                    answers: [
                        "< 2000€",
                        "2000€ - 5000€",
                        "> 5000€",
                        "> 10000€"
                    ],
                    currentAnsIndex: null,
                }
            ]
        },
        {
            id: 3,
            category: 0,
            path: "/motivazioni",
            completed: false,
            validated: false,
            runvalidation: false,
            order: 2,
            title: "Motivazioni",
            description: "Quali sono le motivazioni che ti hanno spinto a rivolgerti a professionisti dei serramenti?",
            data: [
                {
                    title: "Spifferi",
                    selected: false,
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/problems/spifferi.png"
                },
                {
                    title: "Scarso isolamento dal rumore esterno",
                    selected: false,
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/problems/rumore.png"
                },
                {
                    title: "Clima freddo d'inverno e caldo in estate",
                    selected: false,
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/problems/freddo.png"
                },
                {
                    title: "Migliorie estetiche",
                    selected: false,
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/problems/estetica.png"
                },
                {
                    title: "Scarsa privacy",
                    selected: false,
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/problems/privacy.png"
                },
                {
                    title: "Condensa",
                    selected: false,
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/problems/condensa.png"
                },
                {
                    title: "Luce naturale scarsa",
                    selected: false,
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/problems/illuminazione.png"
                },
                // {
                //     titile: "Ho porte finestre prive di coperture",
                //     selected: false,
                //     img: ""
                // },
                // {
                //     titile: "Ho avuto problemi a chiudere o aprire le finestre",
                //     selected: false,
                //     img: ""
                // },
                {
                    title: "Ho subito scassi",
                    selected: false,
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/problems/effrazioni.png"
                },
            ]
        },
        {
            id: 4,
            category: 1,
            path: "/utilizzo",
            completed: false,
            validated: false,
            runvalidation: false,
            order: 3,
            title: "Utilizzo",
            description: "Per quale utilizzo è adibita la casa in cui vorresti un intervento per i serramenti?",
            data: [
                {
                    title: "Per viverci",
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/casasingola.svg",
                    selected: false
                },
                {
                    title: "Per affitto",
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/affitto.svg",
                    selected: false
                },
                {
                    title: "Per vacanze",
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/casavacanze.svg",
                    selected: false
                }
            ]
        },
        {
            id: 5,
            category: 1,
            path: "/abitazione",
            completed: false,
            validated: false,
            runvalidation: false,
            order: 4,
            title: "Abitazione",
            description: "A quale tipologia di abitazione appartiene la casa in cui intervenire?",
            data: [
                {
                    title: "Casa singola",
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/casasingola.svg",
                    selected: false
                },
                {
                    title: "Condominio",
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/condominio.svg",
                    selected: false
                },
                {
                    title: "Villetta a schiera",
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/casasingola.svg",
                    selected: false
                }
            ]
        },
        {
            id: 6,
            category: 1,
            path: "/intervento",
            completed: false,
            validated: false,
            runvalidation: false,
            order: 5,
            title: "Intervento",
            description: "Che tipo di intervento è richiesto sui serramenti?",
            data: [
                {
                    title: "Ristrutturazione",
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/ristrut.svg",
                    selected: false
                },
                {
                    title: "Sostituzione",
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/sostituzione.svg",
                    selected: false
                },
                {
                    title: "Nuova costruzione",
                    img: "https://finestraitalia.s3.eu-central-1.amazonaws.com/mrdrill/asset/costruzione.svg",
                    selected: false
                }
            ]
        },
        {
            id: 7,
            category: 1,
            path: "/piantina",
            completed: false,
            validated: false,
            runvalidation: false,
            order: 6,
            title: "Piantina",
            description: "Abbiamo eseguito una ricerca in base all'indirizzo che hai indicato all'inizio del percorso. Selezionata la piantina della casa che stai cercando o in alternativa disegnala!",
            data: {
                mapState: {
                    viewport: {
                        latitude: 43.941260,
                        longitude: 10.910654,
                        zoom: 18,
                        // bearing: -60,
                        // pitch: 60
                    },
                    mode: null,
                    selectedFeatureIndex: null,
                    editorNode: null,
                    home: [43.941260, 10.910654],
                },
                location: {
                    lat: "",
                    lng: "",
                    address: {

                    }
                },
                points: [],
                rooms: [],
                sides: [
                    {

                        sideId: "side-1",
                        points: [
                            {
                                x: 248.96497969997932,
                                y: 10
                            },
                            {
                                x: 296.3344227402409,
                                y: 383.7499571215703
                            }
                        ],
                        color: "green",
                        rooms: [],
                        exposure: "nord-est"
                    },
                    {
                        sideId: "side-2",
                        points: [
                            {
                                x: 296.3344227402409,
                                y: 383.7499571215703
                            },
                            {
                                x: 187.27454225219685,
                                y: 400
                            }
                        ],
                        color: "blue",
                        rooms: [],
                        exposure: "sud-est"
                    },
                    {
                        sideId: "side-3",
                        points: [
                            {
                                x: 187.27454225219685,
                                y: 400,
                            },
                            {
                                x: 18.727454225219685,
                                y: 341.499863016145
                            }
                        ],
                        color: "yellow",
                        rooms: [],
                        exposure: "sud-ovest"
                    },
                    {
                        sideId: "side-4",
                        points: [
                            {
                                x: 18.727454225219685,
                                y: 341.499863016145
                            },
                            {
                                x: 0,
                                y: 187.66640013946304
                            }
                        ],
                        color: "green",
                        rooms: [],
                        exposure: "sud-ovest"
                    },
                    {
                        sideId: "side-5",
                        points: [
                            {
                                x: 0,
                                y: 187.6664001394630
                            },
                            {
                                x: 186.17292729777213,
                                y: 63.08320696098451
                            }
                        ],
                        color: "yellow",
                        rooms: [],
                        exposure: "nord-ovest"
                    },
                    {
                        sideId: "side-6",
                        points: [
                            {
                                x: 186.17292729777213,
                                y: 63.08320696098451
                            },
                            {
                                x: 182.8680824344981,
                                y: 27.333287694136516
                            }
                        ],
                        color: "yellow",
                        rooms: [],
                        exposure: "nord-ovest"
                    },
                    {
                        sideId: "side-7",
                        points: [
                            {
                                x: 182.8680824344981,
                                y: 27.333287694136516
                            },
                            {
                                x: 248.96497969997932,
                                y: 10
                            }
                        ],
                        color: "red",
                        rooms: [],
                        exposure: "nord-ovest"
                    },
                ],
                roomPoints: [],
                selectedPoints: []
            }
        },
        {
            id: 8,
            category: 1,
            path: "/editorpiantina",
            completed: true,
            validated: true,
            runvalidation: true,
            order: 6,
            title: "Editor Piantina",
            description: "Clicca sui lati della piantina per aggiungere stanze che si affacciano su quel lato. Poi, inserisci le opzioni richieste per configurare le caratteristiche dei serramenti di cui hai bisogno.",
            data: {
                computed: false,
                mapState: {
                    viewport: {
                        latitude: 43.941260,
                        longitude: 10.910654,
                        zoom: 18,
                        // bearing: -60,
                        // pitch: 60
                    },
                    mode: null,
                    selectedFeatureIndex: null,
                    editorNode: null,
                    home: [43.941260, 10.910654],
                },
                location: {
                    lat: "",
                    lng: "",
                    address: {

                    }
                },
                points: [],
                rooms: [],
                sides: [],
                roomPoints: [],
                selectedPoints: [],
                elaboratedData: null,
            }
        },
        {
            id: 9,
            category: 1,
            path: "/colori",
            completed: true,
            validated: true,
            runvalidation: true,
            order: 8,
            title: "Colori",
            description: "Visualizza i colori possibili per i tuoi serramenti attraverso le nostre classi colore, infine scegli l'opzione che più preferisci",
            data: {
                colors: [
                    {
                        "nome": "Elegant",
                        "colori": [
                            {
                                "codice": "P20",
                                "nome": "Noce",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/NOCE_P20.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/NOCE_P20.jpg"
                            },
                            {
                                "codice": "P22",
                                "nome": "Golden Oak",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/GOLDEN_OAK_P22.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/GOLDEN_OAK_P22.jpg"
                            },
                            {
                                "codice": "P52",
                                "nome": "Bianco Crema",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/BIANCO_CREMA_P52.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/BIANCO_CREMA_P52.jpg"
                            },
                            {
                                "codice": "P78",
                                "nome": "Grigio Antracite",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/GRIGIO_ANTRACITE_P78.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/GRIGIO_ANTRACITE_P78.jpg"
                            },
                            {
                                "codice": "P49",
                                "nome": "Sheffield Rovere",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/sheffield_overe_sbiancato_P49_2.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/sheffield_overe_sbiancato_P49_2.jpg"
                            },
                            {
                                "codice": "P51",
                                "nome": "Bianco Antico",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/BIANCO_ANTICO_P51.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/BIANCO_ANTICO_P51.jpg"
                            },
                            {
                                "codice": "P25",
                                "nome": "Mogano",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/MOGANO_P25.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/MOGANO_P25.jpg"
                            }
                        ]
                    },
                    {
                        "nome": "Elegant Star",
                        "colori": [
                            {
                                "codice": "P78",
                                "nome": "Grigio Antracite",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant_Star/GRIGIO_ANTRACITE_P78.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant_Star/GRIGIO_ANTRACITE_P78.jpg"
                            },
                            {
                                "codice": "P25",
                                "nome": "Mogano",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/MOGANO_P25.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant_Star/MOGANO_P25.jpg"
                            },
                            {
                                "codice": "P22",
                                "nome": "Golden Oak",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant_Star/GOLDEN_OAK_P22.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant_Star/GOLDEN_OAK_P22.jpg"
                            },
                            {
                                "codice": "P20",
                                "nome": "Noce",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant_Star/NOCE_P20.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant_Star/NOCE_P20.jpg"
                            }
                        ]
                    },
                    {
                        "nome": "Prestige",
                        "colori": [
                            {
                                "codice": "P86",
                                "nome": "Pino di Montagna",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Prestige/PINO_DI_MONTAGNA_P86.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Prestige/PINO_DI_MONTAGNA_P86.jpg"
                            },
                            {
                                "codice": "P57",
                                "nome": "Bianco Brillante",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Prestige/BIANCO_BRILLANTE_P57.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Prestige/BIANCO_BRILLANTE_P57.jpg"
                            },
                            {
                                "codice": "P48",
                                "nome": "Anteak",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Prestige/ANTEAK_P48.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Prestige/ANTEAK_P48.jpg"
                            },
                            {
                                "codice": "P43",
                                "nome": "Ciliegio",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Prestige/CILIEGIO_P43.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Prestige/CILIEGIO_P43.jpg"
                            },
                            {
                                "codice": "P71",
                                "nome": "Douglas",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Prestige/DOUGLAS_P71.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Prestige/DOUGLAS_P71.jpg"
                            },
                            {
                                "codice": "P42",
                                "nome": "Noce Selvatico",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Prestige/Noce_Selvatico_P42.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Prestige/Noce_Selvatico_P42.jpg"
                            },
                            {
                                "codice": "P72",
                                "nome": "Rovere Chiaro",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Prestige/ROVERE_CHIARO_P72.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Prestige/ROVERE_CHIARO_P72.jpg"
                            },
                            {
                                "codice": "P26",
                                "nome": "Rovere",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Prestige/ROVERE_P26.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Prestige/ROVERE_P26.jpg"
                            }
                        ]
                    },
                    {
                        "nome": "City",
                        "colori": [
                            {
                                "codice": "P66",
                                "nome": "Verde Muschio",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/verde_muschio_P66_2.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/verde_muschio_P66_2.jpg"
                            },
                            {
                                "codice": "P65",
                                "nome": "Verde Abete",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/VERDE_ABETE_P65.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/VERDE_ABETE_P65.jpg"
                            },
                            {
                                "codice": "P80",
                                "nome": "Testa di Moro Lucido",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/TESTA_DI_MORO_LUCIDO_P80.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/TESTA_DI_MORO_LUCIDO_P80.jpg"
                            },
                            {
                                "codice": "P62",
                                "nome": "Rosso Vino",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/Rosso_vino_P62.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/Rosso_vino_P62.jpg"
                            },
                            {
                                "codice": "P63",
                                "nome": "Rosso Marrone",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/Rosso_marrone_P63.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/Rosso_marrone_P63.jpg"
                            },
                            {
                                "codice": "P32",
                                "nome": "Ottone Spazzolato",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/OTTONE_SPAZZOLATO_P32.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/OTTONE_SPAZZOLATO_P32.jpg"
                            },
                            {
                                "codice": "P81",
                                "nome": "Marrone Cioccolato",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/MARRONE_CIOCCOLATO_P81.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/MARRONE_CIOCCOLATO_P81.jpg"
                            },
                            {
                                "codice": "P61",
                                "nome": "Grigio Luce",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/grigio_luce_P61.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/grigio_luce_P61.jpg"
                            },
                            {
                                "codice": "P79",
                                "nome": "Grigio Argento",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/GRIGIO_ARGENTO_P79.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/GRIGIO_ARGENTO_P79.jpg"
                            },
                            {
                                "codice": "P85",
                                "nome": "Grigio A. Regolare",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/GRIGIO_ANTRACITE_REGOLARE_P85.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/GRIGIO_ANTRACITE_REGOLARE_P85.jpg"
                            },
                            {
                                "codice": "P68",
                                "nome": "Grigio Agata",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/grigio_Agata_P68.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/grigio_Agata_P68.jpg"
                            },
                            {
                                "codice": "P64",
                                "nome": "Blu Brillante",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/blu_brillante_P64.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/blu_brillante_P64.jpg"
                            },
                            {
                                "codice": "P77",
                                "nome": "Blu Acciaio",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/BLU_ACCIAIO_P77.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/BLU_ACCIAIO_P77.jpg"
                            },
                            {
                                "codice": "P33",
                                "nome": "Argento Spazzolato",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/argento_spazzolato_P33.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/argento_spazzolato_P33.jpg"
                            }
                        ]
                    },
                    {
                        "nome": "Real Wood",
                        "colori": [
                            {
                                "codice": "RW08",
                                "nome": "Rovere Zenzero",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW08_Rovere_zenzero.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW08_Rovere_zenzero.jpg"
                            },
                            {
                                "codice": "RW05",
                                "nome": "Grigio Quarzo",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW05_Grigio_quarzo_RAL7039.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW05_Grigio_quarzo_RAL7039.jpg"
                            },
                            {
                                "codice": "RW02",
                                "nome": "Bianco Crema",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW02_Bianco_Crema_RAL9001.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW02_Bianco_Crema_RAL9001.jpg"
                            },
                            {
                                "codice": "RW07",
                                "nome": "Rovere Sbiancato",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW07_Rovere_sbiancato.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW07_Rovere_sbiancato.jpg"
                            },
                            {
                                "codice": "RW04",
                                "nome": "Blu Acciaio",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW04_Blu_acciaio_RAL_5011.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW04_Blu_acciaio_RAL_5011.jpg"
                            },
                            {
                                "codice": "RW03",
                                "nome": "Verde Abete",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW03_Verde_abete_RAL6009.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW03_Verde_abete_RAL6009.jpg"
                            },
                            {
                                "codice": "RW10",
                                "nome": "Rovere Amaranto",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW10_Rovere_amaranto.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW10_Rovere_amaranto.jpg"
                            },
                            {
                                "codice": "RW01",
                                "nome": "Bianco Antico",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW01_Bianco_antico_RAL9010.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW01_Bianco_antico_RAL9010.jpg"
                            },
                            {
                                "codice": "RW06",
                                "nome": "Grigio Antracite",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW06_Grigio_antracite_RAL7016.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW06_Grigio_antracite_RAL7016.jpg"
                            },
                            {
                                "codice": "RW09",
                                "nome": "Rovere Miele",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW09_Rovere_Miele.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW09_Rovere_Miele.jpg"
                            }
                        ]
                    },
                    {
                        "nome": "P00",
                        "colori": [
                            {
                                "codice": "P00",
                                "nome": "Bianco Massa",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/P00.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/bianco_massa.jpeg"
                            }
                        ]
                    },
                    {
                        "nome": "Più Venduti",
                        "colori": [
                            {
                                "codice": "P00",
                                "nome": "Bianco Massa",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/P00.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/bianco_massa.jpeg"
                            },
                            {
                                "codice": "P22",
                                "nome": "Golden Oak",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/GOLDEN_OAK_P22.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/GOLDEN_OAK_P22.jpg"
                            },
                            {
                                "codice": "P20",
                                "nome": "Noce",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/NOCE_P20.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/NOCE_P20.jpg"
                            },
                            {
                                "codice": "P51",
                                "nome": "Bianco Antico",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/BIANCO_ANTICO_P51.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/BIANCO_ANTICO_P51.jpg"
                            }
                        ]
                    },
                    {
                        "nome": "Bicolore",
                        "colori": [
                            {
                                "codice": "P20",
                                "nome": "Noce",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/NOCE_P20.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/NOCE_P20.jpg"
                            },
                            {
                                "codice": "P22",
                                "nome": "Golden Oak",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/GOLDEN_OAK_P22.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/GOLDEN_OAK_P22.jpg"
                            },
                            {
                                "codice": "P52",
                                "nome": "Bianco Crema",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/BIANCO_CREMA_P52.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/BIANCO_CREMA_P52.jpg"
                            },
                            // {
                            //     "codice": "P78",
                            //     "nome": "Grigio Antracite",
                            //     "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/GRIGIO_ANTRACITE_P78.jpg",
                            //     "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/GRIGIO_ANTRACITE_P78.jpg"
                            // },
                            {
                                "codice": "P49",
                                "nome": "Sheffield Rovere",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/sheffield_overe_sbiancato_P49_2.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/sheffield_overe_sbiancato_P49_2.jpg"
                            },
                            {
                                "codice": "P51",
                                "nome": "Bianco Antico",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/BIANCO_ANTICO_P51.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/BIANCO_ANTICO_P51.jpg"
                            },
                            // {
                            //     "codice": "P25",
                            //     "nome": "Mogano",
                            //     "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/MOGANO_P25.jpg",
                            //     "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant/MOGANO_P25.jpg"
                            // },
                            //
                            // {
                            //     "codice": "P78",
                            //     "nome": "Grigio Antracite",
                            //     "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant_Star/GRIGIO_ANTRACITE_P78.jpg",
                            //     "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant_Star/GRIGIO_ANTRACITE_P78.jpg"
                            // },
                            {
                                "codice": "P25",
                                "nome": "Mogano",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant/MOGANO_P25.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant_Star/MOGANO_P25.jpg"
                            }
                            ,
                            // {
                            //     "codice": "P22",
                            //     "nome": "Golden Oak",
                            //     "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant_Star/GOLDEN_OAK_P22.jpg",
                            //     "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant_Star/GOLDEN_OAK_P22.jpg"
                            // }
                            // ,
                            // {
                            //     "codice": "P20",
                            //     "nome": "Noce",
                            //     "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Elegant_Star/NOCE_P20.jpg",
                            //     "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Elegant_Star/NOCE_P20.jpg"
                            // },
                            {
                                "codice": "P86",
                                "nome": "Pino di Montagna",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Prestige/PINO_DI_MONTAGNA_P86.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Prestige/PINO_DI_MONTAGNA_P86.jpg"
                            },
                            {
                                "codice": "P57",
                                "nome": "Bianco Brillante",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Prestige/BIANCO_BRILLANTE_P57.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Prestige/BIANCO_BRILLANTE_P57.jpg"
                            },
                            {
                                "codice": "P48",
                                "nome": "Anteak",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Prestige/ANTEAK_P48.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Prestige/ANTEAK_P48.jpg"
                            },
                            {
                                "codice": "P43",
                                "nome": "Ciliegio",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Prestige/CILIEGIO_P43.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Prestige/CILIEGIO_P43.jpg"
                            },
                            {
                                "codice": "P71",
                                "nome": "Douglas",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Prestige/DOUGLAS_P71.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Prestige/DOUGLAS_P71.jpg"
                            },
                            {
                                "codice": "P42",
                                "nome": "Noce Selvatico",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Prestige/Noce_Selvatico_P42.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Prestige/Noce_Selvatico_P42.jpg"
                            },
                            {
                                "codice": "P72",
                                "nome": "Rovere Chiaro",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Prestige/ROVERE_CHIARO_P72.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Prestige/ROVERE_CHIARO_P72.jpg"
                            },
                            {
                                "codice": "P26",
                                "nome": "Rovere",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Prestige/ROVERE_P26.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Prestige/ROVERE_P26.jpg"
                            },
                            {
                                "codice": "P66",
                                "nome": "Verde Muschio",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/verde_muschio_P66_2.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/verde_muschio_P66_2.jpg"
                            },
                            {
                                "codice": "P65",
                                "nome": "Verde Abete",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/VERDE_ABETE_P65.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/VERDE_ABETE_P65.jpg"
                            },
                            {
                                "codice": "P80",
                                "nome": "Testa di Moro Lucido",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/TESTA_DI_MORO_LUCIDO_P80.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/TESTA_DI_MORO_LUCIDO_P80.jpg"
                            },
                            {
                                "codice": "P62",
                                "nome": "Rosso Vino",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/Rosso_vino_P62.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/Rosso_vino_P62.jpg"
                            },
                            {
                                "codice": "P63",
                                "nome": "Rosso Marrone",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/Rosso_marrone_P63.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/Rosso_marrone_P63.jpg"
                            },
                            {
                                "codice": "P32",
                                "nome": "Ottone Spazzolato",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/OTTONE_SPAZZOLATO_P32.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/OTTONE_SPAZZOLATO_P32.jpg"
                            },
                            {
                                "codice": "P81",
                                "nome": "Marrone Cioccolato",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/MARRONE_CIOCCOLATO_P81.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/MARRONE_CIOCCOLATO_P81.jpg"
                            },
                            {
                                "codice": "P61",
                                "nome": "Grigio Luce",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/grigio_luce_P61.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/grigio_luce_P61.jpg"
                            },
                            {
                                "codice": "P79",
                                "nome": "Grigio Argento",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/GRIGIO_ARGENTO_P79.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/GRIGIO_ARGENTO_P79.jpg"
                            },
                            {
                                "codice": "P85",
                                "nome": "Grigio A. Regolare",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/GRIGIO_ANTRACITE_REGOLARE_P85.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/GRIGIO_ANTRACITE_REGOLARE_P85.jpg"
                            },
                            {
                                "codice": "P68",
                                "nome": "Grigio Agata",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/grigio_Agata_P68.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/grigio_Agata_P68.jpg"
                            },
                            {
                                "codice": "P64",
                                "nome": "Blu Brillante",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/blu_brillante_P64.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/blu_brillante_P64.jpg"
                            },
                            {
                                "codice": "P77",
                                "nome": "Blu Acciaio",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/BLU_ACCIAIO_P77.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/BLU_ACCIAIO_P77.jpg"
                            },
                            {
                                "codice": "P33",
                                "nome": "Argento Spazzolato",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/City/argento_spazzolato_P33.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/City/argento_spazzolato_P33.jpg"
                            },
                            {
                                "codice": "RW08",
                                "nome": "Rovere Zenzero",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW08_Rovere_zenzero.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW08_Rovere_zenzero.jpg"
                            },
                            {
                                "codice": "RW05",
                                "nome": "Grigio Quarzo",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW05_Grigio_quarzo_RAL7039.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW05_Grigio_quarzo_RAL7039.jpg"
                            },
                            {
                                "codice": "RW02",
                                "nome": "Bianco Crema",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW02_Bianco_Crema_RAL9001.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW02_Bianco_Crema_RAL9001.jpg"
                            },
                            {
                                "codice": "RW07",
                                "nome": "Rovere Sbiancato",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW07_Rovere_sbiancato.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW07_Rovere_sbiancato.jpg"
                            },
                            {
                                "codice": "RW04",
                                "nome": "Blu Acciaio",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW04_Blu_acciaio_RAL_5011.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW04_Blu_acciaio_RAL_5011.jpg"
                            },
                            {
                                "codice": "RW03",
                                "nome": "Verde Abete",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW03_Verde_abete_RAL6009.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW03_Verde_abete_RAL6009.jpg"
                            },
                            {
                                "codice": "RW10",
                                "nome": "Rovere Amaranto",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW10_Rovere_amaranto.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW10_Rovere_amaranto.jpg"
                            },
                            {
                                "codice": "RW01",
                                "nome": "Bianco Antico",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW01_Bianco_antico_RAL9010.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW01_Bianco_antico_RAL9010.jpg"
                            },
                            {
                                "codice": "RW06",
                                "nome": "Grigio Antracite",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW06_Grigio_antracite_RAL7016.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW06_Grigio_antracite_RAL7016.jpg"
                            },
                            {
                                "codice": "RW09",
                                "nome": "Rovere Miele",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/Real_Wood/RW09_Rovere_Miele.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/Real_Wood/RW09_Rovere_Miele.jpg"
                            },
                            {
                                "codice": "P00",
                                "nome": "Bianco Massa",
                                "urlImg": "https://finestraitalia.s3.eu-central-1.amazonaws.com/Colori/P00.jpg",
                                "img": "https://finestraitalia.s3.eu-central-1.amazonaws.com/AngoloColori/bianco_massa.jpeg"
                            }
                        ]
                    }
                ],
                selectedColors: []
            }
        },
        {
            id: 10,
            category: 2,
            path: "/presentazione",
            completed: true,
            validated: true,
            runvalidation: true,
            order: 9,
            title: "Presentazione",
            description: "",
        },
        {
            id: 11,
            category: 2,
            path: "/offerta",
            completed: true,
            validated: true,
            runvalidation: true,
            order: 10,
            title: "Offerta",
            description: "",
            data: {
                proposta: {

                },
                sistemi: {

                },
                supporti: {

                }
            }
        },
        {
            id: 12,
            category: 2,
            path: "/riepilogo",
            completed: true,
            validated: true,
            runvalidation: true,
            order: 11,
            title: "Riepilogo",
            description: "",
        }
    ]
};

const loadState = () => {
    return initialState;
}

function checkNSelection(data, n){
    var counter = 0;
    for(var i = 0; i < data.length; i++){
        var selected = data[i].selected;
        if(selected){
            counter = counter + 1;
        }
    }

    if(counter === n){
        return true
    }else {
        return false
    }
}

function checkMinSelection(data, n){
    var counter = 0;
    for(var i = 0; i < data.length; i++){
        var selected = data[i].selected;
        if(selected){
            counter = counter + 1;
        }
    }

    if(counter >= n){
        return true
    }else {
        return false
    }
}

//validatori
function checkAnagraficaData(data){

    console.log(data);

    const nomeRegex = /^[A-Za-z0-9,-_.\s]+$/;
    const cognomeRegex = /^[A-Za-z0-9,-_.\s]+$/;
    const indirizzoRegex = /^[A-Za-z0-9,-_.\s]+$/;
    const cittaRegex = /^[A-Za-z0-9,-_.\s]+$/;
    const provinciaRegex = /^[A-Za-z0-9,-_.\s]+$/;
    const capRegex = /^[-+]?[0-9]+$/;
    const telefonoRegex = /^[-+]?[0-9]+$/;
    const cellulareRegex = /^(\((00|\+)39\)|(00|\+)39)?(38[890]|34[7-90]|36[680]|33[3-90]|32[89])\d{7}$/;
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    const indirizzoFatturazioneRegex = indirizzoRegex;
    const cittaFatturazioneRegex = cittaRegex;
    const provinciaFatturazioneRegex = provinciaRegex;
    const capFatturazioneRegex = capRegex;

    const nomeTest = nomeRegex.test(data.nome.toLowerCase())
    const cognomeTest = cognomeRegex.test(data.cognome.toLowerCase())
    const indirizzoTest = indirizzoRegex.test(data.indirizzo.toLowerCase())
    const cittaTest = cittaRegex.test(data.citta.toLowerCase())
    const provinciaTest = provinciaRegex.test(data.provincia.toLowerCase())
    const capTest = capRegex.test(data.cap.toLowerCase())
    const telefonoTest = telefonoRegex.test(data.telefono.toLowerCase())
    const cellulareTest = cellulareRegex.test(data.cellulare.toLowerCase())
    const emailTest = emailRegex.test(data.email.toLowerCase())
    //const fatturazioneTest = fatturazionediversaRegex.test(data.fatturazionediversa)
    const indirizzofatturazioneTest = indirizzoFatturazioneRegex.test(data.indirizzofatturazione.toLowerCase())
    const cittaFatturazioneTest = cittaFatturazioneRegex.test(data.cittafatturazione.toLowerCase())
    const provinciaFatturazioneTest = provinciaFatturazioneRegex.test(data.provinciafatturazione.toLowerCase())
    const capFatturazioneTest = capFatturazioneRegex.test(data.capfatturazione.toLowerCase())

    const datiCliente = nomeTest & cognomeTest & indirizzoTest & cittaTest & provinciaTest & capTest & emailTest;

    if(!data.fatturazionediversa){
        const fatturazione = indirizzofatturazioneTest & cittaFatturazioneTest & provinciaFatturazioneTest & capFatturazioneTest;
        console.log(!data.fatturazionediversa);
        return fatturazione & datiCliente;
    }

    return datiCliente;
}

function checkMarketing(data){
    return true;
}

function checkBudget(data){
    return checkNSelection(data, 1);
}

function checkVecchieFinestre(data){
    return checkNSelection(data, 1);
}

function checkEtaFinestre(data){
    return checkNSelection(data, 1);
}

function checkConosciuti(data){
    return checkNSelection(data, 1);
}

function checkMotivazioni(data){
    return checkMinSelection(data, 1);
}

function checkUtilizzo(data){
    return checkNSelection(data, 1);
}

function checkAbitazione(data){
    return checkNSelection(data, 1);
}

function checkIntervento(data){
    return checkNSelection(data, 1);
}

function checkPiantina(selectedPoints){
    if(selectedPoints.length > 0){
        return true;
    }else {
        return false;
    }

    return true;
}

function checkPiantinaEditor(sides){

    //TODO: completare validazione
    // var roomsSize = 0;
    //
    // for (var i = 0; i < sides.length; i++){
    //     roomsSize = roomsSize + sides[i].rooms.length;
    // }
    //
    // if( roomsSize > 0){
    //     for (var i = 0; i < sides.length; i++){
    //         for (var j = 0; j < sides[i].rooms.length; j++){
    //
    //             var room = sides[i].rooms[j];
    //             //"stanza": "Scegli...",
    //             //                 "tipo": "Scegli...",
    //             //                 "piano": 0,
    //             //                 "quantita": 1,
    //             //                 "base": 0.00,
    //             //                 "altezza": 0.00,
    //
    //             const testStanza = room.stanza !== "Scegli...";
    //             const testTipo = room.tipo !== "Scegli...";
    //             const testQuantita = room.quantita > 0;
    //             const testBase = room.base > 0.00;
    //             const testAltezza = room.altezza > 0.00;
    //             return testStanza && testTipo && testQuantita && testBase && testAltezza
    //         }
    //     }
    // }


    return true;

}

function checkColori(data){
    return true;
}

function checkSistemi(data){
    return true;
}



function appReducer(state = loadState(), action){
    switch (action.type){
        case 'UPDATEMESSAGE':
            saveLocalState({...state, message: action.message});
            return {...state, message: action.message}
        case 'UPDATELOADING':
            saveLocalState({...state, loading: action.loading});
            return {...state, loading: action.loading}
        case 'UPDATEBUILDING':
            return {...state, selectedBuilding: action.selectedBuilding}
        case 'UPDATEANAGRAFICA':
            return {...state, steps: {...state.steps, anagrafica: action.anagrafica}}
        case 'UPDATEMAPPA':
            return {...state, steps: {...state.steps, mappa: action.mappa}}
        case 'UPDATEEDITOR':
            return {...state, steps: {...state.steps, editor: action.editor}}
        case 'UPDATECOLORI':
            return {...state, steps: {...state.steps, colori: action.colori}}
        case 'UPDATEPRESENTAZIONE':
            return {...state, steps: {...state.steps, presentazione: action.presentazione}}
        case 'UPDATESISTEMI':
            return {...state, steps: {...state.steps, sistemi: action.sistemi}}
        case 'UPDATEPROPOSTA':
            return {...state, steps: {...state.steps, proposta: action.proposta}}
        case 'EDITORVISIBLE':
            return {...state, visibleEditor: action.visible}
        case 'UPDATEGLOBALINDICES':
            return {...state, globalRoomIndices: action.indices}
        case 'UPDATENEXTROOMID':
            return {...state, nextRoomId: action.next}
        case 'DELETEROOM':
            //elimin una stanza da un lato
            var roomId = action.id;
            //var sides = state.steps.mappa.data.sides;

            var sides = state.stepsList[7].data.sides;
            //var side = sides.filter(side => side.rooms.filter(room => room.id === roomId))[0];

            var side = {}

            for (var i = 0; i < sides.length; i++){
                for (var j = 0; j < sides[i].rooms.length; j++){
                    if(sides[i].rooms[j].id == roomId){
                        side = sides[i];
                    }
                }
            }

            var sideIndex = sides.indexOf(side);
            var rooms = side.rooms.filter(room => room.id !== roomId)
            var newside = {...side, rooms: rooms}
            sides[sideIndex] = newside;
            var newsides = [...sides];

            var stepsList = state.stepsList;
            stepsList[7].data = {...stepsList[7].data, sides: newsides}
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}

           // return {...state, steps: {...state.step, mappa: {...state.steps.mappa, data: {...state.steps.mappa.data, sides: newsides}} }}
        case 'UPDATEROOM':
            var roomId = action.room.id;
            var sides = state.stepsList[7].data.sides;
            var side = {}

            var roomIndex = 0;

            for (var i = 0; i < sides.length; i++){
                for (var j = 0; j < sides[i].rooms.length; j++){
                    if(sides[i].rooms[j].id === roomId){
                        side = sides[i];
                        roomIndex = j;
                    }
                }
            }
            var sideIndex = sides.indexOf(side);
            //var rooms = side.rooms.filter(room => room.id !== roomId)
            var rooms = side.rooms;
            rooms[roomIndex] = action.room;
            var newside = {...side, rooms: [...rooms]}
            sides[sideIndex] = newside;
            var newsides = [...sides];

            var stepsList = state.stepsList;

            //stepsList[11].validated = checkPiantinaEditor(newsides);
            //console.log(stepsList[7].validated);

            stepsList[7].data = {...stepsList[7].data, sides: newsides}
            console.log([...sides])
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}

            //return {...state, steps: {...state.steps, mappa: {...state.steps.mappa, data: {...state.steps.mappa.data, sides: newsides}}}}
        case 'UPDATEADJACENCY':
            const stepIndex = action.stepIndex;
            var listaSteps = state.stepsList;
            listaSteps[stepIndex].completed = true;
            const nms = state.maxStep + 1;
            const na = ones([nms + 1, nms + 1])
            console.log("nuova matrice di adiacenza")
            console.log(na);
            saveLocalState({...state, maxStep: nms, adjacency: na, stepsList: [...listaSteps]});
            return {...state, maxStep: nms, adjacency: na, stepsList: [...listaSteps]}
        case 'GOTOSTEP':
            console.log("go to step: " + action.stepIndex);
            saveLocalState({...state, currentStepIndex: action.stepIndex});
            return {...state, currentStepIndex: action.stepIndex}
        case 'RUNVALIDATESTEP':
            var stepsList = state.stepsList;
            stepsList[action.stepIndex].runvalidation = true;
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATEANAGRAFICADATA':
            //console.log("Cliente data has changed!")
            //console.log(action.data);
            var stepsList = state.stepsList;
            //stepsList[0].runvalidation = true;
            stepsList[0].validated = checkAnagraficaData(action.data);
            // if(stepsList[0].validated){
            //     window.alert("Cliente valida!")
            // }else {
            //     console.log("Not valid anagrafica yet")
            // }
            stepsList[0].data = action.data;
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATEMARKETING':
            //console.log("Marketing data has changed!")
            //console.log(action.data);
            var stepsList = state.stepsList;
            //stepsList[1].validated = checkMarketing(action.data);
            stepsList[1].data = action.data;
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATEMULTIMARKETING':
            //console.log("Marketing data has changed!")
            //console.log(action.data);
            var stepsList = state.stepsList;
            //stepsList[1].validated = checkMarketing(action.data);
            stepsList[1].multi = action.multiQuestions;
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATEBUDGET':
            //console.log("Budget data has changed!")
            //console.log(action.data);
            var stepsList = state.stepsList;
            stepsList[2].validated = checkBudget(action.data);
            stepsList[2].data = action.data;
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATEVECCHIEFINESTRE':
            //console.log("Vecchie Finestre data has changed!")
            //console.log(action.data);
            var stepsList = state.stepsList;
            stepsList[3].validated = checkVecchieFinestre(action.data);
            stepsList[3].data = action.data;
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATEETAFINESTRE':
            //console.log("Eta Finestre data has changed!")
            //console.log(action.data);
            var stepsList = state.stepsList;
            stepsList[4].validated = checkEtaFinestre(action.data);
            stepsList[4].data = action.data;
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATECONOSCIUTI':
            //console.log("Conosciuti data has changed!")
            //console.log(action.data);
            var stepsList = state.stepsList;
            stepsList[5].validated = checkConosciuti(action.data);
            stepsList[5].data = action.data;
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATEMOTIVAZIONI':
            //console.log("Conosciuti data has changed!")
            //console.log(action.data);
            var stepsList = state.stepsList;
            stepsList[2].validated = checkMotivazioni(action.data);
            stepsList[2].data = action.data;
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATEUTILIZZO':
            //console.log("Utilizzo data has changed!")
            //console.log(action.data);
            var stepsList = state.stepsList;
            stepsList[3].validated = checkUtilizzo(action.data);
            stepsList[3].data = action.data;
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATEABITAZIONE':
            //console.log("Abitazione data has changed!")
            //console.log(action.data);
            var stepsList = state.stepsList;
            stepsList[4].validated = checkAbitazione(action.data);
            stepsList[4].data = action.data;
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATEINTERVENTO':
            //console.log("Intervento data has changed!")
            //console.log(action.data);
            var stepsList = state.stepsList;
            stepsList[5].validated = checkIntervento(action.data);
            stepsList[5].data = action.data;
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATEMAPSTATE':
            //console.log("Piantina map state has changed!")
            var stepsList = state.stepsList;
            stepsList[6].data = {...stepsList[6].data, mapState: action.mapState}
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATESELECTEDBUILDINGPOINTS':
            //console.log("Piantina selected building points has changed!")
            var stepsList = state.stepsList;
            console.log("Punti selezionati:")
            var sp = action.selectedPoints;
            console.log(JSON.stringify(action.selectedPoints));
            stepsList[6].validated = checkPiantina(action.selectedPoints);
            stepsList[6].data = {...stepsList[6].data, selectedPoints: sp}
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATESIDES':
            console.log("Editor Piantina sides has changed!")
            var stepsList = state.stepsList;
            stepsList[7].data = {...stepsList[7].data, sides: action.sides}
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATECOMPUTED':
            console.log("Computed has changed!")
            var stepsList = state.stepsList;
            stepsList[7].data = {...stepsList[7].data, computed: action.computed}
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATEELABORATEDDATA':
            console.log("Elaborate Data has changed!")
            var stepsList = state.stepsList;
            stepsList[7].data = {...stepsList[7].data, elaboratedData: action.elaboratedData}
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'UPDATEANSWERED':
            var stepsList = state.stepsList;
            stepsList[1].answered = action.answered;
            saveLocalState({...state, stepsList: [...stepsList]});
            return {...state, stepsList: [...stepsList]}
        case 'REFRESHNEXTROOMID':
            return {...state, nextRoomId: 1};
        case 'UPDATEROOMSNUMBER':
            if(action.roomsNumber === 0){
                saveLocalState({...state, nextRoomId: 1});
                return {...state, nextRoomId: 1};
            }else {
                saveLocalState({...state, roomsNumber: action.roomsNumber});
                return {...state, roomsNumber: action.roomsNumber};
            }
        case 'UPDATEVISIBLEEDITORDATA':
            return {...state, visibleEditorData: action.visibleEditorData};
        default:
            saveLocalState(state);
            return state;
    }
}


// function checkIfCanMoveToStep(srcIndex, destIndex, adjacency){
//
//     try {
//         return adjacency[srcIndex][destIndex] !== undefined;
//     }
//     catch(err) {
//         return false;
//     }
// }


export default appReducer;
