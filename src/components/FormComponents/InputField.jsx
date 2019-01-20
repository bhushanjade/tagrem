import React, {Component} from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types'

class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let value = e.target.value;
        this.setState({
            value: value,
        });
        let inputName = this.props.name;
        let eventPayload = {};
        eventPayload[inputName] = value;
        if (typeof this.props['inputEventHandler'] === 'function') {
            this.props['inputEventHandler'](eventPayload);
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value == '') {
            return {
                value: ''
            }
        }

        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.value != this.props.value;
    }

    render() {
        let {inputValue} = this.props.value;
        const {type, placeholder, name, className, hasError, inputEventHandler, ...rest} = this.props;

        return <input {...rest} type={type} className={classnames([className, 'form-control'])} name={name}
                      onChange={this.handleChange} value={this.props.value}/>
    }
}


export default InputField;


InputField.propTypes = {
    type: propTypes.string.isRequired,
    placeholder: propTypes.string,
    name: propTypes.string.isRequired,
    inputEventHandler: propTypes.func.isRequired
};


