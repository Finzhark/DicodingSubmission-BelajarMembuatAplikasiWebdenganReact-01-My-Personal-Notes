import React from 'react';
import NoteListItem from '../NoteListItem';

function DeleteButton ({
  id,
  title,
  onDelete
}) {
  const onDeleteEventHandler = () => {
    const confirmToDelete = confirm(`Yakin ingin menghapus catatan ${title}?`)

    if (confirmToDelete) {
      onDelete(id);
      alert(`Anda telah menghapus catatan "${title}"`)
    }
  }

  return (
    <button 
      className="note-item__delete-button"
      onClick={onDeleteEventHandler}
    >
      <span class="material-symbols--delete-forever"/>
    </button>
  )
}

export default DeleteButton