// Packages
import React, { Component } from "react";
import PropTypes from "prop-types";

// icons
import Down from "../../assets/icon-png/down.png";

//css
import "../../styles/components/select.scss";

export default class Select extends Component {
  state = {
    shouldShow: false,
  };

  // set whether to show the dropdown
  toggleShowState = (value) => {
    setTimeout(() => {
      this.setState({ shouldShow: value });
    }, 300);
  };

  // event handler on selecting an option from the dropdown
  onSelect = (value) => {
    this.props.onSelect(value);
    this.toggleShowState(false);
  };

  render() {
    return (
      <div className={`select-container ${this.props.className}`}>
        <button
          className="select-btn"
          style={{
            width: this.props.width,
            height: this.props.height,
          }}
          onClick={() => this.toggleShowState(!this.state.shouldShow)}
          onFocus={() => this.toggleShowState(true)}
          onBlur={() => this.toggleShowState(false)}
        >
          <label className="select-label">{this.props.value}</label>
          <img className="down-icon" src={Down} alt="down" />
        </button>
        {this.state.shouldShow ? (
          <div className="dd-menu">
            <ul className="dd-list">
              {this.props.dataSet.map((item, i) => {
                return (
                  <li
                    key={i}
                    className="dd-item"
                    onClick={() => this.onSelect(item)}
                  >
                    {item[this.props.itemName]}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

Select.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  dataSet: PropTypes.array.isRequired,
  itemName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

Select.defaultProps = {
  className: "",
  value: "",
  width: "100%",
  height: "2rem",
  dataSet: [],
  itemName: "",
};
