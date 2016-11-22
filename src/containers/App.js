import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { inputQuery,
         fetchDictionaryIndexIfNeeded,
         fetchDictionaryContentIfNeeded,
         fetchLexinAPIIfNeeded } from '../actions'
import Search from '../components/Search/Search'
import LocalLexikon from '../components/LocalLexikon/LocalLexikon'
import styles from "./App.css";

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, query } = this.props
    dispatch(fetchDictionaryIndexIfNeeded());
    dispatch(fetchDictionaryContentIfNeeded());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchKey.input !== this.props.searchKey.input) {
      const { dispatch,  searchKey} = nextProps
      console.log('!== nextProps')
      console.log('searchKey.input:' +searchKey.input)
      dispatch(fetchLexinAPIIfNeeded(searchKey.input))
    }
  }

  handleSearch = query => {
    this.props.dispatch(inputQuery(query))
    
  }

  render() {
    console.log(this.props)
    const { localLexikon, webLexikon, searchKey } = this.props
   
    const lexikonContent = localLexikon.content || {}
    const { input, index } = searchKey

    const audioData = webLexikon[input];
   
    return (
      <div className={styles.app}>
        
        <Search onSearch={this.handleSearch} />
        { input === '' ?
          "": 
          (<div>
              <div>Search for: <b>{input} </b></div>
              <div>{index ? "": "No matching result."}</div>
              <div>{index === input ? "": (index ? "Key: "+index : "")}</div>
          </div>)
        }
        <LocalLexikon index={index} lexikonEntries={lexikonContent[index]} audioData={audioData}/>
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { webLexikon, 
          localLexikon,
          searchKey } = state
  
  return {
    localLexikon,
    webLexikon,
    searchKey
  }
}

export default connect(mapStateToProps)(App)
