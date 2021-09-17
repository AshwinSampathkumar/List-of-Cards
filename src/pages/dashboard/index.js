// Packages
import React, { Component } from "react";
import { connect } from "react-redux";

// Layout
import Layout from "../../layout";

// Components
import { Paginate, Select } from "../../components";
import List from "./components/List";

// Actions
import { getList } from "../../actions/list";

// Constants
import { Constants } from "../../config";

class Dashboard extends Component {
  state = {
    page: 1,
    data: [],
    listType: Constants.LIST_TYPE,
    selectedListType: {
      id: "paginate",
      label: "Paginate",
    },
    limitData: Constants.LIMIT_DATA,
    selectedLimit: {
      id: "2",
      label: 10,
    },
    total: 10,
  };

  // mounting phase
  async componentDidMount() {
    await this.updateList();
  }

  // event handler for updating the page
  updatePage = async (page) => {
    await this.setState({ page });
    this.updateList();
  };

  // event handler for updating the list type => 'paginate' or 'load on scroll' and set default
  updateListType = async (value) => {
    await this.setState({
      selectedListType: value,
      selectedLimit: {
        id: "2",
        label: 10,
      },
      page: 1,
    });
    await this.updateList();
  };

  // event handler for updating the limit in case of pagination
  updateLimit = async (value) => {
    await this.setState({ selectedLimit: value, page: 1 });
    await this.updateList();
    await this.setPageCount();
  };

  //event handler for updating the list based on the respective parameters
  async updateList() {
    let start = (this.state.page - 1) * this.state.selectedLimit.label;
    await this.props.getList(start, this.state.selectedLimit.label);
    await this.setPageCount();
  }

  //event handler for fetching additional data on reaching the end of the scrolling behaviour
  fetchAdditionalData = async () => {
    await this.props.getList(0, this.props.list.length + 10);
  };

  // event handler to set the page count
  async setPageCount() {
    // Assuming total length of the list items is 100 with Constants.TOTAL_LIST_ITEM_LENGTH
    await this.setState({
      total: Math.ceil(
        Constants.TOTAL_LIST_ITEM_LENGTH / this.state.selectedLimit.label
      ),
    });
  }

  render() {
    return (
      <Layout>
        <div className="dashboard-container">
          <section className="dashboard-head">
            <h1 className="list-title">List of Items</h1>
            <div className="right-content">
              {this.state.selectedListType.id === "paginate" ? (
                <Select
                  className="limit-dropdown"
                  value={this.state.selectedLimit.label}
                  width="4rem"
                  dataSet={this.state.limitData}
                  itemName="label"
                  onSelect={this.updateLimit}
                />
              ) : (
                ""
              )}
              <Select
                value={this.state.selectedListType.label}
                width={
                  this.state.selectedListType.id === "paginate"
                    ? "8rem"
                    : "10rem"
                }
                dataSet={this.state.listType}
                itemName="label"
                onSelect={this.updateListType}
              />
            </div>
          </section>
          <section className="list-container">
            <List
              dataSet={this.props.list}
              type={this.state.selectedListType.id}
              onScrollEnd={this.fetchAdditionalData}
            />
          </section>
          {this.state.selectedListType.id === "paginate" ? (
            <Paginate
              total={this.state.total}
              page={this.state.page}
              onPageChange={this.updatePage}
            />
          ) : (
            ""
          )}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.list.list,
});

export default connect(mapStateToProps, { getList })(Dashboard);
