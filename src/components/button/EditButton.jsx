import React from 'react';

function EditButton({
  id,
  onEdit
}) {
  return (
    <button
      className="note-item__edit-button"
      onClick={onEdit}
    >
      <span className="clarity--note-edit-solid"/>
    </button>
  );
}

export default EditButton;