import React from "react";
import PropTypes from "prop-types";

/**
 * Component to enter search term
 */
export class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_err: false
        }
        this.inputRef = React.createRef();
    }
    onInputChange = (e) => {
        const txt = e.currentTarget.value;
        if(txt.trim() === "") {
            this.setState({
                is_err: true
            });
        } else if(this.state.is_err) {
            this.setState({
                is_err: false
            });
        }
        this.props.setField(txt);
    }
    render() {
      return (
        <div className="input-component-responsive">
          <input
            className="formik-input"
            ref={this.inputRef}
            type="text"
            autoComplete="on"
            placeholder=" "
            onChange={(e) => this.onInputChange(e)}
          />
          <span className="highlight" />
          <span className="bar" />
          <label className="input-component-label" htmlFor={this.props.value}>
            {this.props.title}
          </label>
          {this.props.placeholder && <span className="placeholder">{this.props.placeholder}</span>}
          {this.state.is_err && <span className="error">{`${this.props.title} is missing`}</span>}
        </div>
      );
    }
  }
  TextInput.propTypes = {
    title: PropTypes.string.isRequired,
    setField: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  };