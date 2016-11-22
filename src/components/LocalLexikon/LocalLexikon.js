import React, { PropTypes } from 'react'
import styles from './LocalLexikon.css'
import LexikonEntry from '../LexikonEntry/LexikonEntry'

const LocalLexikon = ({ index, lexikonEntries, audioData }) => {
  
  if(!lexikonEntries){
    return <div></div>
  }
  let audioContent = <div className={styles.audioTitle}>(Loading audio files)</div>;
  if(audioData){
     let { audioWord, audioUttal, audioLink } = audioData;
     audioContent = (
        <div>
            <div className={styles.audioWord}>{audioWord} <span className={styles.audioUttal}>[{audioUttal}]</span></div>
            <audio src={audioLink} preload="auto" controls></audio>
        </div>

     )
  }
  return (
      <div>
        <h3>{index}</h3>
        <div className={styles.audioPart}>
            <div className={styles.audioTitle}>LYSSNA</div>
            {audioContent}
        </div>

        {
          lexikonEntries.map((item, i)=>{
              return <LexikonEntry entry={item} key={item+i}/>
          })
        }
      </div>
  )

}

export default LocalLexikon
