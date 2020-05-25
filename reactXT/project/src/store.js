import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import filtersData from './filters.json';

// actions.js
export const getCharaterData = (nextApiCall) => (dispatch, getState) => {
  const nextUrl = nextApiCall || 'https://rickandmortyapi.com/api/character/';
  fetch(nextUrl)
    .then(res => res.json())
    .then((data) => {
      dispatch({ type: 'UPDATE_CHAR_DATA', data });
    })
    .catch(console.log)

};

export const addFilter = (filters) => async (dispatch, getState) => {
  await dispatch({ type: 'UPDATE_FILTER', filters });
  const updatedFilters = getState().filters;
  await dispatch({ type: 'UPDATE_SEL_FILTER', updatedFilters });
};

export const removeFilter = (removeData) => async (dispatch, getState) => {
  await dispatch({ type: 'REMOVE_FILTER', removeData });
  const updatedFilters = getState().filters;
  await dispatch({ type: 'UPDATE_SEL_FILTER', updatedFilters });
};
export const updateSearch = (str) => ({
  type: 'UPDATE_SEARCH',
  str
});
export const updateSort = (val) => ({
  type: 'UPDATE_SORT',
  val
});

// reducers.js
export const sortVal = (state = "", action) => {
  switch (action.type) {
    case 'UPDATE_SORT':
      return action.val;
    default:
      return state;
  }
};
export const searchVal = (state = "", action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH':
      return action.str;
    default:
      return state;
  }
};
export const filters = (state = filtersData, action) => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return action.filters;
    case 'REMOVE_FILTER':
      return removeFilters(state, action.removeData.checkValue, action.removeData.filterCat);
    default:
      return state;
  }
};
export const characterData = (state = { info: {}, charDetails: [] }, action) => {
  switch (action.type) {
    case 'UPDATE_CHAR_DATA':
      return {
        info: action.data.info,
        charDetails: [...state.charDetails, ...action.data.results]
      }
    default:
      return state;
  }
};
export const selectedFilters = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_SEL_FILTER':
      return parseFiltersToArr(action.updatedFilters);
    default:
      return state
  }
};

const removeFilters = (state, val, cat) => {
  return {
    ...state,
    [cat]: {
      ...state[cat],
      [val]: !state[cat][val]
    }
  }
}

const parseFiltersToArr = (filters) => {
  let filterArr = [];
  for (let category in filters) {
    if (filters.hasOwnProperty(category)) {
      for (let value in filters[category]) {
        if (filters[category].hasOwnProperty(value) && filters[category][value]) {
          filterArr.push({ value, category })
        }
      }
    }
  }
  return filterArr;
}

export const rootReducer = combineReducers({
  filters,
  selectedFilters,
  characterData,
  searchVal,
  sortVal
});

// Note: this API requires redux@>=3.1.0
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
