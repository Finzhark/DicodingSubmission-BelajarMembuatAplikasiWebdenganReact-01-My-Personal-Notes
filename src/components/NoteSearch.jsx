import React from 'react';

function NoteSearch ({
  onSearch
}) {
  const onSearchEventHandler = (event) => {
    onSearch(event.target.value)
  }

  return (
    <input 
      type="text" 
      placeholder='Mencari judul catatan...'
      onChange={onSearchEventHandler}
    />
  )
}

export default NoteSearch