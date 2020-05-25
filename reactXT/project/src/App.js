import React, { Component, Fragment } from 'react';
import './styles.scss';
import Filters from './Views/Filters';
import Card from './Views/Card'
import SelectedFilters from './Views/SelectedFilters';
import SearchAndSort from './Views/SearchAndSort';
import { connect } from 'react-redux';
import { getCharaterData } from './store';
import InfiniteScroll from 'react-infinite-scroller';
class App extends Component {

  state = {
    info: {},
    charDetails: [],
    selectedFilters: [],
    searchedVal: '',
    sortVal: ''
  }
  componentDidMount() {
     this.props.getCharaterData();
  }
  filterOutData() {
    let allData = this.state.charDetails || [];
    if (Object.keys(this.state.selectedFilters).length) {
      const filterSpeciesValue = [];
      const filterGenderValue = [];
      const filterOriginValue = [];
      this.state.selectedFilters.forEach(elem => {
        elem.category === 'Species' && filterSpeciesValue.push(elem.value);
        elem.category === 'Gender' && filterGenderValue.push(elem.value);
        elem.category === 'Origin' && filterOriginValue.push(elem.value);
      })

      if (filterSpeciesValue.length > 0) {
        allData = allData.filter(elem => filterSpeciesValue.indexOf(elem.species) !== -1);
      }
      if (filterGenderValue.length > 0) {
        allData = allData.filter(elem => filterGenderValue.indexOf(elem.gender) !== -1);
      }
      if (filterOriginValue.length > 0) {
        allData = allData.filter(elem => filterOriginValue.indexOf(elem.origin) !== -1);
      }
    }

    if (this.state.searchedVal.length) {
      allData = allData.filter(elem => (elem.name.toLowerCase()).indexOf(this.state.searchedVal.toLowerCase()) !== -1);
    }

    if (this.state.sortVal) {
      allData = allData.sort((first, second) => {
        return this.state.sortVal === 'asc' ? (first.id - second.id) : (second.id - first.id)
      });
    }

    return [...allData];
  }
  static getDerivedStateFromProps(props, prevState) {
    let updateState = {};
    const { selectedFilters, charDetails, searchedVal, sortVal } = props;
    if (selectedFilters) {
      updateState = {
        ...updateState,
        selectedFilters
      };
    }
    if (JSON.stringify(prevState.charDetails) !== JSON.stringify(props.charDetails.charDetails)) {
      updateState = {
        ...updateState,
        info: charDetails.info,
        charDetails: charDetails.charDetails//,
      };
    }
    if (props.searchedVal !== prevState.searchedVal) {
      updateState = {
        ...updateState,
        searchedVal
      }
    }
    if (props.sortVal !== prevState.sortVal) {
      updateState = {
        ...updateState,
        sortVal
      }
    }
    return updateState;
  }
  
  render() {
    const filteredCharDetails = this.filterOutData();
    return (
      <Fragment>
        <Filters />
        <div className="mainSection float-left">
          <SelectedFilters />
          <SearchAndSort />
        </div>
        <div className="displayList clearfix">
          <ul>
            <InfiniteScroll
              initialLoad={true}
              pageStart={0}
              loadMore={()=> this.props.getCharaterData(this.state.info.next)}
              hasMore={!!this.state.info.next}
              loader={<div className="loader" key={0}>Loading ...</div>}
            >
              {
                filteredCharDetails.length ?
                  filteredCharDetails.map(function (data) {
                    return <Card characterDetail={data} key={data.id} />
                  })
                  :
                  <div className="no-match">No matches found</div>

              }
            </InfiniteScroll>
          </ul>
        </div>

      </Fragment>

    );
  }
}

const mapStateToProps = state => {

  return {
    selectedFilters: [...state.selectedFilters],
    charDetails: state.characterData,
    searchedVal: state.searchVal,
    sortVal: state.sortVal
  }
};
const mapDispatchToProps = dispatch => ({
  getCharaterData: (url) => dispatch(getCharaterData(url))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
