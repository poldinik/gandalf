import "normalize.css/normalize.css";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, {useState} from "react";
import { render } from "react-dom";
import {Provider, useDispatch, useSelector} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import appReducer from "./redux/appReducer";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import Spinner from "react-bootstrap/Spinner";
import RedirectorWrapper from "./components/RedirectorWrapper";
import SnackbarProvider from "react-simple-snackbar";
import "react-app-polyfill/ie9"
import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import {composeWithDevTools} from "redux-devtools-extension";
import {logger} from "redux-logger";
import Home from "./views/Home/Home";
import {IntlProvider} from "react-intl";
import messages from "./intl/messages";

const App = () => {
    //const loading = useSelector(state => state.loading);
    const [locale, setLocale] = useState('it');
    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <SnackbarProvider>
                <Router>
                    <Switch>
                        <Route path="/" exact component={() => <Home setLocale={setLocale} />}/>
                    </Switch>
                </Router>
            </SnackbarProvider>
        </IntlProvider>
    )
};

// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin);

const store = createStore(appReducer, composeWithDevTools(applyMiddleware(logger)));

render(<Provider store={store}><App/></Provider>, window.document.getElementById("app"));
