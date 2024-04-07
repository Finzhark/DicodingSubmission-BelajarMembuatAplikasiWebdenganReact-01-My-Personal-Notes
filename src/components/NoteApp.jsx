import React from 'react';
import { getInitialData, showFormattedDate } from '../utils/index'
import NoteInput from './NoteInput';
import NoteList from './NoteList';
import NoteEdit from './NoteEdit';
import Header from './Header';
import Footer from './Footer';

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      isEditOpen: false,
      editedNoteId: null,
      editedNote: null,
      editedNoteTitle: '',
      editedNoteBody: '',

      keyword: ''
    }

    this.onDeleteHandler = this.onDeleteHandler.bind(this)
    this.onArchiveHandler = this.onArchiveHandler.bind(this)
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this)
    this.onSearchHandler = this.onSearchHandler.bind(this)

    this.onOpenEditHandler = this.onOpenEditHandler.bind(this)
    this.onCloseEditHandler = this.onCloseEditHandler.bind(this)
    this.onEditHandler = this.onEditHandler.bind(this)
    this.onSaveEditHandler = this.onSaveEditHandler.bind(this);    
  }

  onAddNoteHandler(newNote) {
    // const formattedDate = showFormattedDate(newNote.createdAt)
    // const noteWithDate = {
    //   ...newNote,
    //   createdAt: formattedDate
    // }
    // this.setState(prevState => ({
    //   notes: [...prevState.notes, noteWithDate]
    // }))
    this.setState(prevState => ({
      notes: [...prevState.notes, newNote]
    }))

    console.log(newNote)
  }

  onDeleteHandler(id) {
    const notes = this.state.notes
      .filter(note => note.id !== id)
      
    this.setState({ 
      notes
    })

    console.log(notes.length, notes)
  }

  onArchiveHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.map(note => {
        if (note.id === id) {
          return {
            ...note,
            archived: !note.archived
          }
        }
        return note
      })
    }))
  }

  onSearchHandler(searchText) {
    this.setState({
      keyword: searchText.toLowerCase()
    })
  }
  
  onEditHandler(id) {
    // const editedNote = this.state.notes
    //   .find(note => note.id === id);
    this.setState({ 
      isEditOpen: true, 
      editedNoteId: id,
      editedNote: editedNote,
      editedNoteTitle: editedNote.title,
      editedNoteBody: editedNote.body
    });

    // console.log(editedNote)
  }

  onOpenEditHandler(id) {
    const editedNote = this.state.notes
      .find(note => note.id === id);

    console.log("Catatan yang ditemukan:", editedNote);

    this.setState({
      isEditOpen: true,
      editedNoteId: id,
    })
    
    console.log("ID catatan yang sedang diedit:", id);
    console.log("State setelah setState:", this.state);
  }

  onCloseEditHandler(){
    this.setState({
      isEditOpen: false,
      editedNoteId: null
    })
  }

  onSaveEditHandler(updatedNote) {
    const formattedDate = showFormattedDate(updatedNote.createdAt);
    const updatedNotes = this.state.notes.map(note => {
      if (note.id === this.state.editedNoteId) {
        return {
          ...note,
          title: updatedNote.title,
          body: updatedNote.body,
          createdAt: formattedDate
        };
      }
      return note
    })
  
    this.setState(prevState => ({
      notes: updatedNotes,
      isEditOpen: false,
      editedNoteId: null,
      editedNoteTitle: updatedNotes.title,
      editedNoteBody: updatedNotes.body 
    }));
  }
  
  render() {
    const filteredNotes = this.state.notes
      .filter((note) =>
        note.title.toLowerCase()
        .includes(this.state.keyword)
      )

    return (
      <>
        <Header onSearch={this.onSearchHandler}/>
        <div className="note-app__body">
          <NoteInput addNote={this.onAddNoteHandler} />
          <NoteList 
            notes={filteredNotes}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
            onEdit={this.onOpenEditHandler}
          />

          {this.state.isEditOpen && (
            <NoteEdit 
              show={this.state.isEditOpen}
              onSave={this.onSaveEditHandler}
              onCancel={this.onCloseEditHandler}
              title={this.state.editedNoteTitle}
              body={this.state.editedNoteBody}
            />
          )}        
        </div>
        <Footer />
      </>
    )
  }
}

export default NoteApp