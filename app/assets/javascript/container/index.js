import React from 'react';
import listData from '../../static/open_spendings.json';
import { fetch } from '../utils/restUtils';
import Header from '../components/header';
import ListView from '../components/listView';
import Filter from '../components/filter';

class Container extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            listData: listData.data,
            errorMessage: ''
        };
        this.filterList = [];
        this.isAnalyticsVisible = window.innerWidth >= 800;
        this.headerList = Object.keys(listData.data[0]);
        this.successHandler = this.successHandler.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
        this.filterListData = this.filterListData.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.getFilteredList = this.getFilteredList.bind(this);
        this.getListData = this.getListData.bind(this);
    }

    componentWillMount () {
        // function call in will mount to get the initial json
        // this.getListData();
    }

    getListData () {
        fetch('http://preview.sokrati.com/data/open_spendings.json', this.successHandler, this.errorHandler);
    }

    successHandler (result) {
        this.setState({
            listData: result.data
        })
    }

    errorHandler (error) {
        this.setState({
            errorMessage: error ? error.description : 'Error fetching data.'
        })
    }

    filterListData (filterData) {
        this.filterList.push(filterData);
        this.getFilteredList();
    }

    getFilteredList () {
        let filteredList = listData.data;
        this.filterList.map((filter, key) => {
            filteredList = filteredList.filter((row, key) => {
                return String(row[filter.headerName]).toLowerCase().indexOf(filter.searchString) !== -1;
            })
        });
        this.setState({
            listData: filteredList
        })
    }

    updateFilter (filterData, filterIndex) {
        if (filterData.searchString) {
            this.filterList[filterIndex] = filterData;
        } else {
            this.filterList.splice(filterIndex, 1);
        }
        this.getFilteredList();
    }

    render () {
        return (
            this.isAnalyticsVisible
                ? <section>
                      {this.state.errorMessage ? <span>{this.state.errorMessage}</span> : null}
                      <Header />
                      <div className="listDataView clearFloat">
                          <ListView listData={this.state.listData} headerList={this.headerList} />
                          <Filter headerList={this.headerList} filterListData={this.filterListData} filterList={this.filterList} updateFilter={this.updateFilter} />
                      </div>
                  </section>
                : <div className="notAccessibleBlock">
                      Sokrati Data Analytics can only be access from desktops.
                  </div>
        );
    }
};

export default Container;
