import React from "react";
import Card from "react-bootstrap/Card";

const LayerItem = ({layer}) => {
    return (
        <Card style={{width: "100%", marginBottom: "10px", cursor: "pointer"}}>
            <Card.Body>
                <Card.Title>{layer.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{layer.subtitle}</Card.Subtitle>
                <Card.Text>
                    {layer.description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default LayerItem;
