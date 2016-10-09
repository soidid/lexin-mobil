import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { inputQuery,
         fetchDictionaryIndexIfNeeded,
         fetchDictionaryContentIfNeeded} from '../actions'
import Search from '../components/Search/Search'
import LexikonEntry from '../components/LexikonEntry/LexikonEntry'
import styles from "./App.css";

class App extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
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
      //dispatch(fetchResultIfNeeded(inputQuery))
    }
  }

  handleSearch = query => {
    this.props.dispatch(inputQuery(query))
    console.log(`input: ${query}`)
  }

  render() {
    const { isFetching, 
            results, 
            localLexikon } = this.props
    const { input, index, lexikonContent } = localLexikon


    /* local content */
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
          localLexikon } = state
  
  
  const {
    isFetching,
    items: results
  } = webLexikon[inputQuery] || {
    isFetching: true,
    items: []
  }
  return {
    isFetching,
    results,
    localLexikon,
    webLexikon
  }
}

export default connect(mapStateToProps)(App)
