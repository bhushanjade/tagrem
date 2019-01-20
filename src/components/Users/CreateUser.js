import React from "react";
import {Col, Button, Form, FormGroup, Label} from 'reactstrap';
import InputField from '../FormComponents/InputField';
import RadioButton from '../FormComponents/RadioButton';
import {errorHandler, responseHandler} from '../../helpers/responseHandlers';
import {UncontrolledAlert} from 'reactstrap';

const formFields = ['first_name', 'last_name', 'email', 'gender'];


export default class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'first_name': '',
            'last_name': '',
            'email': '',
            'gender': '',
            isSubmitting: false,
            formSuccess: false,
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.formEventHandler = this.formEventHandler.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let formData = this.state;
        //set form submitting to true, reset everything while submitting form.
        this.setState({
            isSubmitting: !formData.isSubmitting,
            formSuccess: false,
            errors: []
        });

        //field validation.
        let errorFields = formFields.filter(field => formData[field].trim().length <= 0);

        if (errorFields.length === 0) {
            let respObj = {};
            // formData = {...formData,...{'_format' : 'json', 'access-token':'QeUtQCgdsAAeCdFbhUz1h6-HdVJ30zv8xMYR'}};
            const requestOptions = {
                method: 'POST',
                // redirect: 'follow',
                // credentials: "same-origin",
                headers: {
                    'Authorization': 'Bearer QeUtQCgdsAAeCdFbhUz1h6-HdVJ30zv8xMYR',
                    // "access-control-allow-origin": "localhost",
                    // "access-control-allow-credentials": "true",
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formData),
            };

            fetch('https://gorest.co.in/public-api/users', requestOptions)
                .then(responseHandler).then(resp => {
                respObj = {
                    'first_name': '',
                    'last_name': '',
                    'email': '',
                    'gender': '',
                    formSuccess: true,
                    isSubmitting: false,
                };
                this.setState(respObj);
            }).catch(errorHandler => {

                respObj = {
                    formSuccess: false,
                    isSubmitting: false,
                    errors:[]
                };
                switch (errorHandler['_meta'].code) {
                    case 401:
                        respObj.errors = [errorHandler["_meta"].message]
                        break;
                    case 422:
                        let errorFields = errorHandler.result.map(field => field.message);
                        respObj["errors"] = errorFields;
                        break;
                }

                this.setState(respObj);
            });
        }else{
            this.setState({
                isSubmitting:false,
                formSuccess: false,
                errors: errorFields
            });
        }


    }

    formEventHandler(fieldValue) {

        this.setState({
            ...fieldValue
        });

    }

    render() {
        let {errors} = this.state;
        let errorMsgs = [];
        if (errors.length > 0) {
            errorMsgs = errors.map(field_name => <UncontrolledAlert color="danger" key={field_name}>
                {field_name}
            </UncontrolledAlert>)
        }
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Create User</h5>
                    {
                        this.state.formSuccess ? <UncontrolledAlert color="info">
                            Successfully !!! Created user.
                        </UncontrolledAlert> : errorMsgs.length > 0 ? errorMsgs : null
                    }
                    <div className="row mt-2">
                        <div className="col-12">
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label for="lblFirstName" sm={2}>First Name*</Label>
                                    <Col sm={10}>
                                        <InputField type="text" name="first_name" placeholder="First Name"
                                                    inputEventHandler={this.formEventHandler}
                                                    value={this.state.first_name}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="lblFirstName" sm={2}>First Name*</Label>
                                    <Col sm={10}>
                                        <InputField type="text" name="last_name" placeholder="Last Name"
                                                    inputEventHandler={this.formEventHandler}
                                                    value={this.state.last_name}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="exampleEmail" sm={2}>Email*</Label>
                                    <Col sm={10}>
                                        <InputField type="email" name="email" placeholder="Email"
                                                    inputEventHandler={this.formEventHandler} value={this.state.email}/>
                                    </Col>
                                </FormGroup>

                                <RadioButton inputEventHandler={this.formEventHandler} name="gender"
                                             checked={this.state.gender}/>
                                {!this.state.isSubmitting ? <Button>Submit</Button> : null}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}