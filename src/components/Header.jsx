import React from 'react';
import NoteSearch from './NoteSearch';

function Header ({
  onSearch
}) {
  return (
    <header className='note-app__header'>
      <h1>My Personal Notes</h1>
      <div className='note-search'>
        <NoteSearch onSearch={onSearch}/>
      </div>
    </header>
  )
}

export default Header