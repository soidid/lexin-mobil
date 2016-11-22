export const INPUT_QUERY = 'INPUT_QUERY'

export const REQUEST_LEXIN_API = 'REQUEST_LEXIN_API'
export const RECEIVE_LEXIN_API = 'RECEIVE_LEXIN_API'

export const REQUEST_DICTIONARY_CONTENT = 'REQUEST_DICTIONARY_CONTENT'
export const RECEIVE_DICTIONARY_CONTENT = 'RECEIVE_DICTIONARY_CONTENT'

export const REQUEST_DICTIONARY_INDEX = 'REQUEST_DICTIONARY_INDEX'
export const RECEIVE_DICTIONARY_INDEX = 'RECEIVE_DICTIONARY_INDEX'

import request from 'superagent';


/* Fetch Dictionar Content */

export const requestDictionaryContent = ()=>({
  type: REQUEST_DICTIONARY_CONTENT
})
export const receiveDictionaryContent = (dictionaryContent)=>({
  type: RECEIVE_DICTIONARY_CONTENT,
  dictionaryContent
})
const shouldFetchDictionaryContent = (state, query) => {
  if (!state.localLexikon || !state.localLexikon.lexikonContent) {
    return true
  }
  else {
    return false
  }
}
const fetchDictionaryContent = () => dispatch => {
  dispatch(requestDictionaryContent())
  console.log("[ fetchDictionaryContent ]")
  return request(`./public/dictionary-content.json`)
         .then(response => {
            dispatch(receiveDictionaryContent(JSON.parse(response.text)))
         })        
}
export const fetchDictionaryContentIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchDictionaryContent(getState())) {
      return dispatch(fetchDictionaryContent())
  }
}


/* Fetch Dictionar Index --- for search matching */
export const requestDictionaryIndex = ()=>({
  type: REQUEST_DICTIONARY_INDEX
})
export const receiveDictionaryIndex = (dictionaryIndex)=>({
  type: RECEIVE_DICTIONARY_INDEX,
  dictionaryIndex
})

const shouldFetchDictionaryIndex = (state, query) => {
  if (!state.key || !state.key.lexikonIndex) {
    return true
  }
  else {
    return false
  }
}
const fetchDictionaryIndex = () => dispatch => {
  dispatch(requestDictionaryIndex())
  console.log("<fetchDictionaryIndex>")
  return request(`./public/dictionary-index.json`)
         .then(response => {
            dispatch(receiveDictionaryIndex(JSON.parse(response.text)))
         })        
}
export const fetchDictionaryIndexIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchDictionaryIndex(getState())) {
      return dispatch(fetchDictionaryIndex())
  }
}

export const inputQuery = query => ({
  type: INPUT_QUERY,
  query
})



export const requestLexinAPI = query => ({
  type: REQUEST_LEXIN_API,
  query
})
export const receiveLexinAPI = (query, results) => ({
  type: RECEIVE_LEXIN_API,
  query,
  results: results
})



const fetchLexinAPI= query => dispatch => {
  dispatch(requestLexinAPI(query))
  
  return request.get(`https://crossorigin.me/http://lexin.nada.kth.se/lexin/service?searchinfo=to,swe_fin,katt `, false)
                .end((err,response) => {
                  console.log("response:")
                  console.log(response)
                  dispatch(receiveLexinAPI(query, response))
                })
}

const shouldFetchLexinAPI= (state, query) => {
  const results = state.webLexikon[query]
  console.log('shouldFetchLexinAPI:')
  console.log(results)
  if (!results) {
    return true
  }
  if (results.isFetching) {
    return false
  }
  return results.didInvalidate
  
}
export const fetchLexinAPIIfNeeded = query => (dispatch, getState) => {
  if (shouldFetchLexinAPI(getState(), query)) {
    return dispatch(fetchLexinAPI(query))
  }
}
