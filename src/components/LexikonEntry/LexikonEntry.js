import React, { PropTypes } from 'react'
import styles from './LexikonEntry.css'
import parseLexkikonEntry from '../../helpers/parseLexikonEntry.js';



const LexikonEntry = ({ entry }) => {
  
  console.log(entry);
  let word = parseLexkikonEntry(entry);

  console.log(word)
  return (
      <div>
        { word.category ? `(${word.category}) ` :''}  
        { word.translation.map((t,i)=>`${t}${i===word.translation.length-1 ? "":", "}`) }<br/>
        
        <div>{word.inflections.map((t,i)=>`${t}${i===word.inflections.length-1 ? "":", "}`) }</div>
        <ul>
        {
          word.examples.map((e,i)=>(
          <li key={`${e.value.slice(0,5)}-${i}`}>
            {e.value}.
            {" "} 
            {e.translation?`(${e.translation})`:''}</li>
          ))
          
        }
        </ul>
        
        <hr/>
      </div>
  )

}

export default LexikonEntry
