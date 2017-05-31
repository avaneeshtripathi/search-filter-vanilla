import React from 'react';

class ListView extends React.Component{
    getTableHead () {
        return (
            <li className="tableHead">
                {this.props.headerList.map((row, key) => {
                    return (
                        <div className="tableCell" key={key}>{row}</div>
                    );
                })}
            </li>
        )
    }

    getTableContent () {
        return this.props.listData.map((row, key) => {
            let dataList = Object.values(row);
            return (
                <li className="tableBody" key={key}>
                    {dataList.map((data, key) => {
                        return (
                            <div className="tableCell" key={key}>{data}</div>
                        );
                    })}
                </li>
            );
        });
    }

    render () {
        return (
            <ul className="dataListingTable floatLeft">
                {this.getTableHead()}
                {this.getTableContent()}
            </ul>
        );
    }
};

export default ListView;
