import React, {Component} from 'react';
import propTypes from "prop-types";
import InputField from "./InputField";
import {Col, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

class RadioButton extends Component {
    constructor(props) {

        super();
        this.state = {
            checked: false,
        };

        this.changeState = this.changeState.bind(this);

    }

    changeState(event) {

        let inputName = this.props.name;
        let eventPayload = {};
        eventPayload[inputName] = event.target.value;
        if (typeof this.props['inputEventHandler'] === 'function') {
            this.props['inputEventHandler'](eventPayload);
        }
    }


    render() {

        const {name, inputEventHandler, ...rest} = this.props;
        return <FormGroup row>
            <Label for="gender" sm={2}>Gender</Label>
            <Col sm={10}>
                <FormGroup check inline>
                    <Label check>
                        <input type="radio" name="gender" value="male"
                               checked={this.props.checked === "male" ? "checked" : null}
                               onChange={this.changeState}/> Male
                        {/*<Input type="radio" name="gender" required/>{' '}*/}
                        {/*Male*/}
                    </Label>
                </FormGroup>
                <FormGroup check inline>
                    <Label check>
                        <input type="radio" name="gender" value="female" required
                               checked={this.props.checked === "female" ? "checked" : null}
                               onChange={this.changeState}/>{' '}
                        Female
                    </Label>
                </FormGroup>
            </Col>
        </FormGroup>


    }
}

InputField.propTypes = {
    type: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    inputEventHandler: propTypes.func.isRequired
};

export default RadioButton;

