import React from 'react';

function ArchiveButton ({
  id,
  archive,
  onArchive
}) {
  return (
    <div className="note-item__action">
      {
        archive === false?
        <button
          className='note-item__archive-button'
          onClick={() => onArchive(id)}
        >
          <span class="clarity--archive-solid"/>
        </button>
        :
        <button     
          className="note-item__archive-button"
          onClick={() => onArchive(id)}
        >
          <span class="clarity--unarchive-solid"/>
        </button>
      }
    </div>
  )
}

export default ArchiveButton