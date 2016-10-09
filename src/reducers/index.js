import { combineReducers } from 'redux'
import {

  INPUT_QUERY,

  REQUEST_RESULTS, RECEIVE_RESULTS,

  REQUEST_DICTIONARY_CONTENT,
  RECEIVE_DICTIONARY_CONTENT,
  REQUEST_DICTIONARY_INDEX,
  RECEIVE_DICTIONARY_INDEX,

  
} from '../actions'



const results = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  console.log("***** Results")

  switch (action.type) {
    
    case REQUEST_RESULTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_RESULTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.results,
      }
    default:
      return state
  }
}


const webLexikon = (state = {}, action) => {
  switch (action.type) {
   
    case RECEIVE_RESULTS:
    case REQUEST_RESULTS:
      return {
        ...state,
        [action.query]: results(state[action.query], action)
      }
    default:
      return state
  }
}

const localLexikon = (state = { input:'', index:'', lexikonIndex:'', lexikonContent:'' }, action) => {
  switch (action.type) {
    case REQUEST_DICTIONARY_CONTENT: 
    case RECEIVE_DICTIONARY_CONTENT: 
      return {
        ...state,
        lexikonContent: action.dictionaryContent
      }
    
    case REQUEST_DICTIONARY_INDEX:
    case RECEIVE_DICTIONARY_INDEX:
      return {
        ...state,
        lexikonIndex: action.dictionaryIndex
      }

    case INPUT_QUERY:
      var index = '';
      console.log("INPUT QUERY")
      console.log(state)
      if(state.lexikonIndex && state.lexikonIndex[action.query]){
        index = state.lexikonIndex[action.query]
      }
      
      return {
        ...state,
        input: action.query,
        index: index
      }

    default:
      return state
  }
}

const rootReducer = combineReducers({
  localLexikon,
  webLexikon
})

export default rootReducer
