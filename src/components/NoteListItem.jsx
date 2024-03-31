import React from 'react';
import { showFormattedDate } from '../utils' ;
import DeleteButton from './button/DeleteButton';
import ArchiveButton from './button/ArchiveButton';
import EditButton from './button/EditButton';

function NoteListItem ({
  id,
  title,
  body,
  onDelete, 
  onArchive,
  archive,
  onEdit 
}) {
  return (
    <div className="note-item">
      <div className="note-item__content">
        <h3 className='note-item__title'>
          {title}
        </h3>
        <p className='note-item__date'>
          {showFormattedDate(id)}
        </p>
        <p className='note-item__body'>
          {body}
        </p>
      </div>
      <div className="note-item__action">
        <DeleteButton 
          id={id} 
          title={title}
          onDelete={onDelete} 
        />
        <ArchiveButton
          id={id}
          archive={archive}
          onArchive={onArchive} 
        />
        <EditButton 
          id={id}
          onEdit={onEdit}
        />
      </div>
    </div>
  )
}

export default NoteListItem