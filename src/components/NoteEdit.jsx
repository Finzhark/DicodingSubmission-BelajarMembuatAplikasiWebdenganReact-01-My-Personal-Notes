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

  onSaveChangeEventHandler(event) {
    event.preventDefault();

    this.props.onSave({
      id: this.props.id,
      date: this.props.date,
      title: this.state.title,
      body: this.state.body
    });

    this.setState({
      title: '',
      body: '',
      remainingTitleChars: 50
    });
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
              type="hidden" 
              name="id" 
              value={this.props.id} 
            />

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