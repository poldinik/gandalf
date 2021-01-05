import React from "react";


var style = {
    backgroundColor: "#F8F8F8",
    //borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "10px",
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
}

var phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
}

const AppFooter = ({ children, backgroundColor = "transparent" }) => {
    return (
        <div>
            <div style={phantom} />
            <div style={
                {
                    backgroundColor: backgroundColor,
                    //borderTop: "1px solid #E7E7E7",
                    textAlign: "center",
                    padding: "10px",
                    position: "fixed",
                    left: "0",
                    bottom: "0",
                    width: "100%",
                }
            }>
                { children }
            </div>
        </div>
    )
}

export default AppFooter
