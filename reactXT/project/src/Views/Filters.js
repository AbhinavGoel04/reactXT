import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFilter, removeFilter } from '../store';
import contentData from './Assets/Content.json';

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtersData: []
        }
    }
    static getDerivedStateFromProps(props, state) {
        let updateState = {};
        const { filtersData } = props;
        if (Object.keys(filtersData).length) {
            updateState = {
                filtersData
            };
        }
        return updateState;
    }
    checkFilter = (e) => {
        const isChecked = e.target.checked;
        const checkValue = e.target.value;
        const filterCat = e.target.dataset.category;
        let filtersData_copy = JSON.parse(JSON.stringify(this.state.filtersData));

        if (isChecked) {
            filtersData_copy = {
                ...filtersData_copy,
                [filterCat]: {
                  ...filtersData_copy[filterCat],
                  [checkValue]: !filtersData_copy[filterCat][checkValue]
                }
              }
            this.props.updateFilter(filtersData_copy);
        } else {
            this.props.removeFilter({checkValue, filterCat});
        }
    }
    render() {
        const { filtersData } = this.state;
        return (
            <div className="filterSection float-left">
                <h2>
                    {contentData.FiltersHeading}
                    </h2>
                {
                    Object.keys(filtersData).map((category) => {
                        return  <div className="filterList" key={category}>
                            <h3>{category}</h3>
                            <ul >
                            {
                            Object.keys(filtersData[category]).map((filter, index) => 
                                <li key={`${category}${index}`}>
                                    <input type="checkbox" checked={filtersData[category][filter]} data-category={category} value={filter} onChange={(e) => this.checkFilter(e)}></input>
                                    <span>{filter}</span>
                                </li>
                            )
                            }
                            </ul>
                        </div>
                    })
                }
            </div>
        );
    }   
}
const mapDispatchToProps = dispatch => ({
    updateFilter: filters => dispatch(addFilter(filters)),
    removeFilter: item => dispatch(removeFilter(item))
})
const mapStateToProps = state => ({
    filtersData: JSON.parse(JSON.stringify(state.filters))
    
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters)
