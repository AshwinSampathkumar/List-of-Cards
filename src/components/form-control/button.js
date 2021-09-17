// Packages
import React, { Component } from "react";
import PropTypes from "prop-types";

//css
import "../../styles/components/button.scss";

export default class Button extends Component {
  render() {
    return (
      <button
        className={`btn btn-${this.props.type} ${this.props.className} ${
          this.props.disabled ? "disabled" : ""
        }`}
        style={{
          fontSize: this.props.fontSize,
          width: this.props.width,
          height: this.props.height,
          ...this.props.style,
        }}
        onClick={() => this.props.onClick()}
        disabled={this.props.disabled}
      >
        {this.props.label}
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  fontSize: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  className: "",
  label: "",
  type: "primary",
  fontSize: "1rem",
  width: "100%",
  height: "3rem",
  disabled: false,
};
