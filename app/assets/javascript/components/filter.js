import React from 'react';

class Filter extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            addFilterStatus: false,
            filterList: this.props.filterList
        };
        this.addFilter = this.addFilter.bind(this);
        this.filterListData = this.filterListData.bind(this);
        this.enableUpdateFilter = this.enableUpdateFilter.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
    }

    addFilter () {
        this.setState({
            addFilterStatus: true
        })
    }

    filterListData () {
        if (this.refs.filterString.value) {
            let filterData = {
                headerName: this.refs.filterName.selectedOptions[0].value,
                searchString: this.refs.filterString.value.toLowerCase()
            };
            this.state.addFilterStatus = false;
            this.props.filterListData(filterData);
        }
    }

    enableUpdateFilter (filterIndex) {
        this.state.filterList[filterIndex].editStatus = true;
        this.setState(this.state);
    }

    updateFilter (filterIndex, filterHeader) {
        let filterData = {
            headerName: filterHeader,
            searchString: this.refs['filterListInput-' + filterIndex].value.toLowerCase()
        };
        this.props.updateFilter(filterData, filterIndex);
    }

    render () {
        return (
            <div className="filterListing floatRight">
                {this.state.filterList && this.state.filterList.length
                    ? <ul className="filtersList">
                          {this.state.filterList.map((row, key) => {
                              return (
                                  <li key={key}>
                                      <span>{row.headerName}</span>
                                      {row.editStatus
                                          ? <div className="clearFloat">
                                                <input ref={`filterListInput-${key}`} className="floatLeft" defaultValue={row.searchString} />
                                                <button className="floatRight" onClick={this.updateFilter.bind(this, key, row.headerName)}>+</button>
                                            </div>
                                          : <div className="clearFloat">
                                              <span className="floatLeft">{row.searchString}</span>
                                              <button className="floatRight" onClick={this.enableUpdateFilter.bind(this, key)}>update</button>
                                          </div>
                                        }
                                  </li>
                              );
                          })}
                      </ul>
                    : null
                }
                <div className="addFilterSection">
                    <button className="addFilterButton" onClick={this.addFilter}>Add Filter</button>
                    {this.state.addFilterStatus
                        ? <div className="addFilterWrap">
                              <select ref="filterName">
                                  {this.props.headerList.map((item, key) => {
                                      return (
                                          <option value={item} key={key}>{item}</option>
                                      )
                                  })}
                              </select>
                              <input ref="filterString" type="text" placeholder="text here..." />
                              <button onClick={this.filterListData}>+</button>
                          </div>
                        : null
                    }
                </div>
            </div>
        );
    }
};

export default Filter;
