import React, { PropTypes } from 'react'

const Search = ({ input, onSearch }) => (
  <div>
    <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        onSearch((input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Slå upp!
        </button>
      </form>
    
  </div>
)

Search.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default Search
