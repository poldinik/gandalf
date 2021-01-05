import React, {useState} from "react";
import './PdfPreview.css';
import PreviewToolbar from "./PreviewToolbar";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faDownload, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import Spinner from "react-bootstrap/Spinner";

//import {Page} from "react-pdf";
// import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
//
// import { Document } from '@react-pdf/dom';

//import { Document } from 'react-pdf/dist/esm/entry.webpack';

//http://www.africau.edu/images/default/sample.pdf

// const styles = StyleSheet.create({
//     page: {
//         flexDirection: 'row',
//         backgroundColor: '#E4E4E4'
//     },
//     section: {
//         margin: 10,
//         padding: 10,
//         flexGrow: 1
//     }
// });


const PdfPreview = (props) => {
    var isLoading = props.loading
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const onRefresh = (event) => {
        event.preventDefault();
        props.setLoadingAction();
        //console.log("hello!")
    }



    return (
        <div>
            {/*<Document file="/asset/prova.pdf">*/}
            {/*    <Page size="A4" style={styles.page}>*/}
            {/*        <View style={styles.section}>*/}
            {/*            <Text>Section #1</Text>*/}
            {/*        </View>*/}
            {/*        <View style={styles.section}>*/}
            {/*            <Text>Section #2</Text>*/}
            {/*        </View>*/}
            {/*    </Page>*/}
            {/*</Document>*/}
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={onRefresh}><FontAwesomeIcon icon={faSyncAlt}/> Refresh</Nav.Link>
                        <Nav.Link href="#downlad"><FontAwesomeIcon icon={faDownload} /> Download</Nav.Link>
                    </Nav>
                    {/*<Nav>*/}
                    {/*    <Nav.Link href="#deets">More deets</Nav.Link>*/}
                    {/*    <Nav.Link eventKey={2} href="#memes">*/}
                    {/*        Dank memes*/}
                    {/*    </Nav.Link>*/}
                    {/*</Nav>*/}
                </Navbar.Collapse>
            </Navbar>
            {
                !isLoading ?
                    <div>
                        <embed
                            src={"/asset/prova.pdf" + "#toolbar=0"}
                            type="application/pdf"
                            className="pdf"
                        />
                    </div>
                    :
                    <div>
                        <div className="loading-overlay">
                            <Spinner animation="border" role="status" className="loader">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                        <embed
                            src={"/asset/prova.pdf" + "#toolbar=0"}
                            type="application/pdf"
                            className="pdf"
                        />
                    </div>
            }
        </div>
    )
}

export default PdfPreview;
