import React, { PropTypes } from 'react'
import styles from './LexikonEntry.css'
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
let parseSubstantiv = (current) => {
    if( !current || !current.paradigm || !current.paradigm.inflection){
        return false;
    }else{
        return [
          current.paradigm.inflection[0].value,
          current.paradigm.inflection[1].value
        ]
    }
}
let parseEttEn = (current) => {
    if( !current || !current.paradigm || !current.paradigm.inflection){
        return false;
    }else{
        let bestamd = current.paradigm.inflection[0].value;
        let lastCharacter = bestamd.slice(-1);
        if(lastCharacter === 'n'){
          return 'en';
        }else{
          return 'ett'
        }
    }
}
let parseCategory = (name)=>{
  switch(name){
    case 'jj':
      return 'adjektiv';
    case 'vb':
      return 'verb';
    case 'nn':
      return 'substantiv';
    default:
      return '(?)'
  }
}

const LexikonEntry = ({ entry }) => {
  const category = parseCategory(entry.class);
  let inflection = '';
  let inflectionBlock = '';

  switch(category){
    case 'substantiv':
      inflection = parseSubstantiv(entry);
      let etten = parseEttEn(entry);
      inflectionBlock = (
          <div>
              <div>{etten} {entry.value}</div>
              <div>{inflection[0]}</div>
              <div>2 {inflection[1]}</div>
          </div>
      )
    break;

    case 'verb':
      inflection = parseVerb(entry);
      inflectionBlock = (
          <div>
              <div><span className={styles.fix}>Imperativ:</span>{inflection[0]}!</div>
              <div><span className={styles.fix}>Infinitiv:</span>{inflection[1]}</div>
              <div><span className={styles.fix}>Presens:</span>{inflection[2]}</div>
              <div><span className={styles.fix}>Preteritum</span>{inflection[3]}</div>
              <div><span className={styles.fix}>Supinum:</span>har {inflection[4]}</div>
          </div>
      )
    break;

  }
  return (
      <div>
        <br/>
        <div>({category}){entry.translation.value}</div>
        {inflectionBlock}
        <hr/>
      </div>
  )

}

export default LexikonEntry
