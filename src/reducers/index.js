import { combineReducers } from 'redux'
import {

  INPUT_QUERY,

  REQUEST_LEXIN_API, 
  RECEIVE_LEXIN_API,

  REQUEST_DICTIONARY_CONTENT,
  RECEIVE_DICTIONARY_CONTENT,
  REQUEST_DICTIONARY_INDEX,
  RECEIVE_DICTIONARY_INDEX,

  
} from '../actions'


const webLexikon = (state = {}, action) => {
  switch (action.type) {
   
    case RECEIVE_LEXIN_API:
    case REQUEST_LEXIN_API:
      return {
        ...state,
        [action.query]: action.results
      }
    default:
      return state
  }
}

const localLexikon = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_DICTIONARY_CONTENT: 
    case RECEIVE_DICTIONARY_CONTENT: 
      return {
        content: action.dictionaryContent
      }
    
    default:
      return state
  }
}

const searchKey = (state = {input:'', index:[], indexList: ''}, action) => {
  switch (action.type) {
    
    case INPUT_QUERY:
      let index;

      if(state.indexList && state.indexList[action.query]){
        index = state.indexList[action.query]
      }
      
      return {
        ...state,
        input: action.query,
        index: index
      }

    case REQUEST_DICTIONARY_INDEX:
    case RECEIVE_DICTIONARY_INDEX:
      return {
        ...state,
        indexList: action.dictionaryIndex
      }

    default:
      return state
  }

}

const rootReducer = combineReducers({
  localLexikon,
  webLexikon,
  searchKey
})

export default rootReducer
