// Packages
import React, { Component } from "react";
import PropTypes from "prop-types";

// components
import { Button } from "../index";

//css
import "../../styles/components/paginate.scss";

export default class Paginate extends Component {
  // render the page count based on the satisfied conditions
  renderPaginate() {
    let arr,
      prependArray = [1, 2, 3],
      appendArray = [
        this.props.total - 2,
        this.props.total - 1,
        this.props.total,
      ];
    // if page count exceeds 10
    // << Prev 1 2 3 ... 13 14 15 Next >>
    if (this.props.total > 10) {
      // << Prev 1 2 3 ... 13 14 15 Next >>
      if (this.props.page <= 3 || this.props.page >= this.props.total - 2) {
        arr = [...prependArray, "...", ...appendArray];
      }
      // << Prev 1 2 3 4... 13 14 15 Next >>
      else if (this.props.page === 4) {
        arr = [...prependArray, 4, "...", ...appendArray];
      }
      // << Prev 1 2 3 ... 12 13 14 15 Next >>
      else if (this.props.page === this.props.total - 3) {
        arr = [...prependArray, "...", this.props.total - 3, ...appendArray];
      }
      // << Prev 1 2 3 ... 8 ... 13 14 15 Next >>
      else {
        arr = [...prependArray, "...", this.props.page, "...", ...appendArray];
      }
    }
    // else condition for the case of count exceeding 10
    // << Prev 1 2 3 4 5 6 7 8 9 10 Next >>
    else {
      arr = new Array(this.props.total).fill(0).map((item, i) => i + 1);
    }
    return arr;
  }

  // event handler on page click
  onPageClick = (item) => {
    if (item !== "...") {
      this.props.onPageChange(item);
    }
  };

  render() {
    return (
      <div className="paginate-container">
        <Button
          className="page-btn"
          label="<<"
          type="primary"
          width="2rem"
          height="2rem"
          fontSize="0.8rem"
          onClick={() => this.props.onPageChange(1)}
        />
        <Button
          className="page-btn"
          label="Prev"
          type="primary"
          width="3rem"
          height="2rem"
          fontSize="0.8rem"
          disabled={this.props.page === 1 ? true : false}
          onClick={() =>
            this.props.onPageChange(
              this.props.page - 1 <= 0 ? 1 : this.props.page - 1
            )
          }
        />
        {this.renderPaginate().map((item, i) => {
          return (
            <Button
              key={i}
              className="page-btn"
              label={`${item}`}
              type={this.props.page === item ? "primary" : "secondary"}
              width="2rem"
              height="2rem"
              fontSize="0.8rem"
              onClick={() => this.onPageClick(item)}
            />
          );
        })}
        <Button
          className="page-btn"
          label="Next"
          type="primary"
          width="3rem"
          height="2rem"
          fontSize="0.8rem"
          disabled={this.props.page === this.props.total ? true : false}
          onClick={() =>
            this.props.onPageChange(
              this.props.page + 1 >= this.props.total
                ? this.props.total
                : this.props.page + 1
            )
          }
        />
        <Button
          className="page-btn"
          label=">>"
          type="primary"
          width="2rem"
          height="2rem"
          fontSize="0.8rem"
          onClick={() => this.props.onPageChange(this.props.total)}
        />
      </div>
    );
  }
}

Paginate.propTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

Paginate.defaultProps = {
  total: 1,
  page: 1,
};
