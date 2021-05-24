import React from 'react'
import {Container, Row, Col} from "react-bootstrap"

const FormContainer = ({children}) => {
    return (
        <React.Fragment>
             <Container>
                 <Row className="justify-content-md-center">
                     <Col xs={12} md={6}>
                         {children}
                     </Col>
                 </Row>
             </Container>   
        </React.Fragment>
    )
}

export default FormContainer
