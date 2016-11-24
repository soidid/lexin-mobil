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
  if (!state.localLexikon || !state.localLexikon.content) {
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
  if (!state.searchKey || !state.searchKey.indexList) {
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


const parseAPIResult = (response) => {

  let html = response.text
  let matches = html.match(/<div>[\S\s]*?<\/div>/gi);
  let b = matches[0].match(/<b>[\S\s]*?<\/b>/gi);
  b = b[0].replace('<b>','').replace('</b>','');

  let u = matches[0].split('[')[1].split(']')[0];
  let a = matches[0].split('\"')[1];

  return {
    audioWord: b,
    audioUttal: u,
    audioLink: a
  }

}

const fetchLexinAPI= index => dispatch => {
  console.log('fetchLexinAPI **')
  
  index.map(query=>{
      dispatch(requestLexinAPI(query))
      return request.get(`https://crossorigin.me/http://lexin.nada.kth.se/lexin/service?searchinfo=to,swe_swe,${query}`, false)
                    .end((err,response) => {
                        dispatch(receiveLexinAPI(query, parseAPIResult(response)))
                    })
    
  })

 
}

const shouldFetchLexinAPI = (state, query) => {
  const results = state.webLexikon[query]
  if (!results) {
    return true
  }
  return false
  
}
export const fetchLexinAPIIfNeeded = query => (dispatch, getState) => {
  if (shouldFetchLexinAPI(getState(), query)) {
    let index = getState().searchKey.indexList[query];
    return dispatch(fetchLexinAPI(index))
  }
}
