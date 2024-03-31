import React from 'react';
import NoteSearch from './NoteSearch';

function Header ({
  onSearch
}) {
  return (
    <div className="note-app__header">
      <header className='sticky-header'>
        <h1>My Personal Notes</h1>
        <div className='note-search'>
          <NoteSearch onSearch={onSearch}/>
        </div>
      </header>
    </div>
  )
}

export default Header