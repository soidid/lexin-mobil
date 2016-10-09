import React, { PropTypes } from 'react'
import styles from "./Search.css";

const Search = ({ input, onSearch }) => (
  <div className={styles.search}>
    <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        onSearch((input.value))
        input.value = ''
      }}>
        <input className={styles.input}
               ref={node => {
                 input = node
               }} 
               placeholder="Skriv ett ord ;)"
        />
        <button className={styles.submit} type="submit">
          Slå upp!
        </button>
      </form>
    
  </div>
)

Search.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default Search
