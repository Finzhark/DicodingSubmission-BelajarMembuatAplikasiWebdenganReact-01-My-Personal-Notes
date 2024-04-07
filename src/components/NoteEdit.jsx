import React from 'react';

class NoteEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title || '',
      body: props.body || '',
      remainingTitleChars: 50
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSaveChangeEventHandler = this.onSaveChangeEventHandler.bind(this);
    this.onCancelChangeEventHandler = this.onCancelChangeEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const newTitle = event.target.value;
    const maxTitleLength = 50
    const remainingTitleChars = maxTitleLength - newTitle.length
  
    if (remainingTitleChars >= 0) {
      this.setState({
        title: newTitle, 
        remainingTitleChars: remainingTitleChars
      })
    }
  }

  onBodyChangeEventHandler(event) {
    const newBody = event.target.value;
    this.setState({
      body: newBody,
    });
  }

  onSaveChangeEventHandler(event) {
    event.preventDefault();

    this.props.onSave({
      id: this.props.id,
      createdAt: this.props.createdAt,
      title: this.state.title,
      body: this.state.body
    });

    this.setState({
      title: '',
      body: '',
      remainingTitleChars: 50
    });

    console.log("ID note (tidak berubah):", this.props.id, " | Date:", this.props.date, " | Title:", this.state.title, " | Body:", this.state.body);
  }

  onCancelChangeEventHandler(event) {
    event.preventDefault();
    this.props.onCancel();
  }

  render() {
    return (
      <div 
        className={
          `modal-overlay ${this.props.show ? 'show' : ''}`
        }
      >
        <div className="modal-content note-input">
          <h2>Edit Catatan</h2>
          <p className='note-input__title__char-limit'>
            Sisa karakter: {this.state.remainingTitleChars}
          </p>
          <form
            onSubmit={this.onSaveChangeEventHandler}
          >
            <input 
              type="text" 
              className='note-input__title'
              placeholder='Tulis judul di sini...' 
              value={this.state.title}
              onChange={this.onTitleChangeEventHandler}
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
            <div className="note-edit__action">
              <button type="submit">
                Simpan
              </button>
              <button 
                className='note-edit__cancel'
                onClick={this.onCancelChangeEventHandler}
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NoteEdit