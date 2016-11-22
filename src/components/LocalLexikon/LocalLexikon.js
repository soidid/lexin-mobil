import React, { PropTypes } from 'react'
// import styles from './LocalLexikon.css'
import LexikonEntry from '../LexikonEntry/LexikonEntry'

const LocalLexikon = ({ lexikonEntries }) => {
  
  if(!lexikonEntries){
    return <div></div>
  }
  return (
      <div>
        {
          lexikonEntries.map((item, i)=>{
              return <LexikonEntry entry={item} key={item+i}/>
          })
        }
      </div>
  )

}

export default LocalLexikon
