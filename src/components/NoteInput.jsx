import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      remainingTitleChars: 50
    }

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this)
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this)
    this.onSubmitChangeEventHandler = this.onSubmitChangeEventHandler.bind(this)
  }

  onTitleChangeEventHandler(event) {
    const newTitle = event.target.value;
    const remainingTitleChars = 50 - newTitle.length;
  
    this.setState({
      title: newTitle,
      remainingTitleChars: remainingTitleChars
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      }
    })
  }

  onSubmitChangeEventHandler(event) {
    event.preventDefault()

    this.props.addNote({
      id: +new Date(),
      date: new Date(),
      title: this.state.title,
      body: this.state.body,
    })

    this.setState({
      title: '',
      body: '',
      remainingTitleChars: 50
    })
  }

  render() {
    return (
      <div className="note-input">
        <h2>Membuat Catatan</h2>
        <form 
          onSubmit={this.onSubmitChangeEventHandler}
        >
          <p className='note-input__title__char-limit'>
            Sisa karakter: {this.state.remainingTitleChars}
          </p>
          <input 
            type="text" 
            className='note-input__title'
            placeholder='Tulis judul di sini...' 
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
            maxLength={50}
            required
          />
          <textarea 
            type="text" 
            className='note-input__body'
            placeholder='Silakan tulis catatanmu di sini saja...' 
            value={this.state.body}
            onChange={this.onBodyChangeEventHandler}
            required
          />
          <button type='submit'>Buat</button>
        </form>
      </div>
    )
  }
}

export default NoteInput