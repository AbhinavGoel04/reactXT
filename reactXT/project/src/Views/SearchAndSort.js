import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSearch, updateSort } from '../store';
import contentData from './Assets/Content.json';
import Select from 'react-select';

const options = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' }
];
class SearchAndSort extends Component {
    state = {
        selectedVal: []
    }
    getSearchValue = (e) => {
        this.props.updateSearch(e.target.value);
    }
    getDropDownVal = (value) => {
        this.setState({selectedVal:value},()=>{
            this.props.updateSort(this.state.selectedVal.value);
        });
       
    }
    render() {
        return (
            <div className="search-sort-cont">
                <div className="searchBox float-left">
                    <p>{contentData.Search}</p>
                    <input type="text" onKeyUp={this.getSearchValue}></input>
                </div>
                <Select className="react-select-container" classNamePrefix="react-select"
                    value={this.state.selectedVal}
                    onChange={this.getDropDownVal}
                    options={options} placeholder={contentData.Sort}
                />
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    updateSearch: str => dispatch(updateSearch(str)),
    updateSort: val => dispatch(updateSort(val))  //action
})
export default connect(
    null,
    mapDispatchToProps
)(SearchAndSort)