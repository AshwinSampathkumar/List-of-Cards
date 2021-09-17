// Packages
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import { Card } from "../../../components";

// Constants
import { Constants } from "../../../config";

export default class List extends Component {
  state = {
    isFetching: false,
    count: 1,
  };

  // mounting phase
  componentDidMount() {
    // adding an event listener for monitoring scroll behaviour
    window.addEventListener("scroll", this.handleScroll);
    return () => window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = async () => {
    let screenHeight = window.innerHeight + document.documentElement.scrollTop;
    // if condition for not reaching the end of the page
    if (screenHeight !== document.documentElement.offsetHeight) return;


    // on reaching the end of the scroll
    // Assuming total length of the list items is 100 with Constants.TOTAL_LIST_ITEM_LENGTH
    if (
      this.props.type !== "paginate" &&
      this.props.dataSet.length !== Constants.TOTAL_LIST_ITEM_LENGTH
    ) {
      await this.setState({ isFetching: true });
      setTimeout(async () => {
        window.scroll(0, screenHeight - 650);
        await this.onScrollEnd();
        await this.setState({ isFetching: false });
      }, 3000);
    }
  };

  onScrollEnd = () => {
    console.log("inside onScrollEnd");
    this.props.onScrollEnd();
  };

  render() {
    return (
      <>
        <ul className="card-list">
          {this.props.dataSet.map((item, i) => {
            return (
              <li>
                <Card className={`item-${item.id}`} key={i} data={item} />
              </li>
            );
          })}
        </ul>
        {/* Assuming total length of the list items is 100 with Constants.TOTAL_LIST_ITEM_LENGTH */}
        {this.state.isFetching &&
        this.props.dataSet.length !== Constants.TOTAL_LIST_ITEM_LENGTH ? (
          <h3 className="fetch-text">Please wait! Fetching more data...</h3>
        ) : (
          ""
        )}
      </>
    );
  }
}

List.propTypes = {
  dataSet: PropTypes.array.isRequired,
  type: PropTypes.string,
  onScrollEnd: PropTypes.func.isRequired,
};

List.defaultProps = {
  dataSet: [],
  type: "paginate",
};
