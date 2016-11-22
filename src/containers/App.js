import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { inputQuery,
         fetchDictionaryIndexIfNeeded,
         fetchDictionaryContentIfNeeded,
         fetchLexinAPIIfNeeded } from '../actions'
import Search from '../components/Search/Search'
import LexikonEntry from '../components/LexikonEntry/LexikonEntry'
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
    if (nextProps.inputQuery !== this.props.inputQuery) {
      const { dispatch,  inputQuery } = nextProps
      console.log('!== nextProps')
      dispatch(fetchLexinAPIIfNeeded(inputQuery))
    }
  }

  handleSearch = query => {
    this.props.dispatch(inputQuery(query))
    console.log(`input: ${query}`)
  }

  render() {
    console.log(this.props)
    const { localLexikon, searchKey } = this.props
   
    const lexikonContent = localLexikon.content
    const { input, index } = searchKey
    


    /* Local Lexkin Content */
    let localResults = "";
    if(index){
      if(lexikonContent[index]){
          localResults = lexikonContent[index].map((item, i)=>{
              return <LexikonEntry entry={item} key={item+i}/>
          })
      }
    }
   
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
        { localResults }
        
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
