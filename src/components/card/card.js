// Packages
import React, { Component } from "react";
import PropTypes from "prop-types";

//css
import "../../styles/components/card.scss";


export default class Card extends Component {
  render() {
    return (
      <div className={`card ${this.props.className}`}>
        <label className="card-title"> {this.props.data.id}.&nbsp;{this.props.data.title} </label>
        <p className="card-desc">{this.props.data.body} </p>
      </div>
    );
  }
}

Card.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
};

Card.defaultProps = {
  className: "",
  data: {},
};
