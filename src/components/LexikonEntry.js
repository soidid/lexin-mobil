import React, { PropTypes } from 'react'

let parseVerb = (current) => {
   
    
    if( !current || !current.paradigm || !current.paradigm.inflection){
        return false;

    }else{

        if(current.paradigm.inflection.length === 5){
            return [
              current.paradigm.inflection[2].value,
              current.paradigm.inflection[3].value,
              current.paradigm.inflection[4].value,
              current.paradigm.inflection[0].value,
              current.paradigm.inflection[1].value
            ]
  
        }else{//Imperativ === Infinitiv
            return [
              current.paradigm.inflection[2].value,
              current.paradigm.inflection[2].value,
              current.paradigm.inflection[3].value,
              current.paradigm.inflection[0].value,
              current.paradigm.inflection[1].value
            ]
  
        }
    }
   
  }
let parseCategory = (name)=>{
  switch(name){
    case 'jj':
      return 'adjektiv';
    case 'vb':
      return 'verb';
    default:
      return '(?)'
  }
}

const LexikonEntry = ({ entry }) => {
  const category = parseCategory(entry.class);

  const inflection = parseVerb(entry);
  const verb = ( inflection !== false ) ? (
    <div>
        <div>Imperativ: {inflection[0]}!</div>
        <div>Infinitiv: {inflection[1]}</div>
        <div>Presens: {inflection[2]}</div>
        <div>Preteritum {inflection[3]}</div>
        <div>Supinum: har {inflection[4]}</div>
    </div>
  ) : "";

  console.log(entry)

  return (
      <div>
        <br/>
        <div>({category}){entry.translation.value}</div>
        {verb} 
        <hr/>
      </div>
  )

}

export default LexikonEntry
