import React from 'react';
import { getInitialData, showFormattedDate } from '../utils/index'
import NoteInput from './NoteInput';
import NoteList from './NoteList';
import Header from './Header';
import Footer from './Footer';

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      filteredNotes: getInitialData(),
    }

    this.onDeleteHandler = this.onDeleteHandler.bind(this)
    this.onArchiveHandler = this.onArchiveHandler.bind(this)
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this)
    this.onSearchHandler = this.onSearchHandler.bind(this)
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
          />     
        </div>
        <Footer />
      </>
    )
  }
}

export default NoteApp