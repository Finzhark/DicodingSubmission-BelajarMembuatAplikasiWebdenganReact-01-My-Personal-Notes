import React from 'react';
import NoteListItem from './NoteListItem';

function NoteList ({
  notes, 
  onDelete, 
  onArchive,
  onEdit
}) {
  const activeNotes = notes
    .filter(note => !note.archived)
  const archivedNotes = notes
    .filter(note => note.archived)
  console.table('Catatan aktif:', activeNotes, 'Arsip:', archivedNotes)
  return (
    <>
      <h2>Catatan Aktif</h2>
      {activeNotes.length !== 0 ? (
        <div className="notes-list">
          {activeNotes.map((note) => (
            <NoteListItem 
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              onDelete={onDelete}
              onArchive={onArchive}
              archive={note.archived}
              onEdit={onEdit}
            />
          ))}
        </div>
      ) : (
        <div className="notes-list">
          <p className='notes-list__empty-message'>
            Tidak ada catatan
          </p>
        </div>
      )}

      <h2>Arsip</h2>
      {archivedNotes.length !== 0 ? (
        <div className="notes-list">
          {archivedNotes.map((note) => (
            <NoteListItem 
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              onDelete={onDelete}
              onArchive={onArchive}
              archive={note.archived}
              onEdit={onEdit}
            />
          ))}
        </div>
      ) : (
        <div className="notes-list">
          <p className='notes-list__empty-message'>
            Tidak ada catatan
          </p>
        </div>
      )}
    </>
  )
}

export default NoteList