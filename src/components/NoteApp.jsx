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
      filteredNotes: getInitialData(),

      isEditOpen: false,
      editedNoteId: null,
      editedNote: null,
      editedNoteTitle: '',
      editedNoteId: ''
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
    const formattedDate = showFormattedDate()
    const noteWithDate = {
      ...newNote,
      date: formattedDate
    }
    this.setState(prevState => ({
      notes: [...prevState.notes, noteWithDate],
      filteredNotes: [...prevState.notes, noteWithDate]
    }))
  }

  onDeleteHandler(id) {
    const notes = this.state.notes
      .filter(note => note.id !== id)
      
    this.setState({ 
      notes, 
      filteredNotes: notes
    })
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
      }),
      filteredNotes: prevState.filteredNotes.map(note => {
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
    if (searchText.length !== 0 && searchText.trim() !== '') {
      this.setState({
        notes : this.state.filteredNotes.filter(note => 
          note.title.toLowerCase().includes(searchText.toLowerCase())
          // note.body.toLowerCase().includes(searchText.toLowerCase())
        )        
      })
    } else {
      this.setState({
        notes: this.state.filteredNotes
      })
    }
  }
  
  onEditHandler(id) {
    const editedNote = this.state.notes.find(note => note.id === id);
    this.setState({ 
      isEditOpen: true, 
      editedNoteId: id,
      editedNote: editedNote,
      editedNoteTitle: editedNote.title,
      editedNoteBody: editedNote.body
    });
  }

  onOpenEditHandler(id) {
    this.setState({
      isEditOpen: true,
      editedNoteId: id
    })
  }

  onCloseEditHandler(){
    this.setState({
      isEditOpen: false,
      editedNoteId: null
    })
  }

  onSaveEditHandler(updatedNote) {
    const formattedDate = showFormattedDate();
    const updatedNotes = this.state.notes.map(note => {
      if (note.id === this.state.editedNoteId) {
        return {
          ...note,
          title: updatedNote.title,
          body: updatedNote.body,
          date: formattedDate
        };
      }
      return note;
    });
  
    this.setState(prevState => ({
      notes: updatedNotes,
      filteredNotes: prevState.filteredNotes.map(note => {
        if (note.id === this.state.editedNoteId) {
          return {
            ...note,
            title: updatedNote.title,
            body: updatedNote.body,
            date: formattedDate
          };
        }
        return note;
      }),
      isEditOpen: false,
      editedNoteId: null,
      editedNoteTitle: '',
      editedNoteBody: '' 
    }));
  }
  
  render() {
    return (
      <>
        <Header onSearch={this.onSearchHandler}/>
        <div className="note-app__body">
          <NoteInput addNote={this.onAddNoteHandler} />
          <NoteList 
            notes={this.state.notes}
            onDelete={this.onDeleteHandler}
            onArchive={this.onArchiveHandler}
            onEdit={this.onOpenEditHandler}
          />

          {this.state.isEditOpen && (
            <NoteEdit 
              show={this.state.isEditOpen}
              onSave={this.onSaveEditHandler}
              onCancel={this.onCloseEditHandler}
              
              // title={this.state.notes
              //   .find(note => note.id === this.state.editedNoteId).title}
              // body={this.state.notes
              //   .find(note => note.id === this.state.editedNoteId).body}

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