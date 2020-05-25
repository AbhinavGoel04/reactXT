import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { removeFilter } from '../store';
import contentData from './Assets/Content.json'

class SelectedFilters extends Component {
    state = {
        selectedFilters: []
    }
    static getDerivedStateFromProps(props, state) {
        let updateState = {};
        const { selectedFilters } = props;
        if (selectedFilters) {
            updateState = {
                selectedFilters
            };
        }
        return updateState;
    }
    removeListItem = (e) => {
        const checkValue = e.target.value;
        const filterCat = e.target.dataset.category;
        this.props.removeFilter({checkValue, filterCat});
    }
    render() {
        return (
            <Fragment>
                <h2>{contentData.SelectedFiltersHeading}</h2>
                <div className="selectedList">
                    {
                        this.state.selectedFilters.map((data, i) => {
                            return <div key={i}><label>{data.value}</label><button className="close-btn" type="button" value={data.value} data-category={data.category} onClick={(e) => this.removeListItem(e)}>X</button></div>
                        })
                    }
                </div>
            </Fragment>);
    }
}

const mapStateToProps = state => ({
    selectedFilters: [...state.selectedFilters]
});

const mapDispatchToProps = dispatch => ({
    removeFilter: filters => dispatch(removeFilter(filters))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectedFilters)