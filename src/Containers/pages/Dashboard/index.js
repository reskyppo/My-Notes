import React, { Component, Fragment } from 'react';
import './Dashboard.scss'
import { addDataAPI, getdataFromAPI, updatedataFromAPI, deletedataFromAPI } from '../../../Config/redux/action';
import { connect } from 'react-redux';

class Dashboard extends Component {
    state = {
        title     : '',
        date      : '',
        content   : '',
        textButton: 'Simpan',
        noteId    : ''
    }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.props.getNotes(userData.uid)
    }
    

    handleSaveNotes = () => {
        const {title, content, textButton, noteId} = this.state;
        const {saveNotes,updateNotes} = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            title  : title,
            content: content,
            date   : new Date().getTime(),
            userId : userData.uid
        }

        if (textButton === 'Simpan'){
            saveNotes(data)
        } else{
            data.noteId = noteId
            updateNotes(data)
        }       
    }

    onInputChange = (e, type) => {
        this.setState({
            [type] : e.target.value
        })
    }

    updateNotes = (note) => {
        console.log(note);
        this.setState({
            title     : note.data.title,
            content   : note.data.content,
            textButton: 'Update',
            noteId    : note.id
        })
    }

    cancelUpdate = () => {
        this.setState({
            title  : '',
            content: '',
            textButton : 'Simpan'
        })
    }

    deleteNote = (e, note) => {
        e.stopPropagation();
        const {deleteNotes} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'));
        const data = {
            userId : userData.uid,
            noteId : note.id
        }
        deleteNotes(data);
    }

    render() {
        const {title, content, textButton} = this.state
        const {notes}                = this.props
        const {updateNotes}          = this
        return (
            <div className = 'App'>
                <div className = 'container'>
                    <div className = 'header'>
                        <p>Masukkan Catatan Anda</p>
                        <input    placeholder = 'title' value = {title} onChange = {(e) => this.onInputChange(e, 'title')} />
                        <textarea placeholder = 'context' value = {content} onChange = {(e) => this.onInputChange(e, 'content')}/>
                        <div className= 'button-action'>
                            {
                                textButton === 'Update' ? (
                                    <button className = 'cancel' onClick = {this.cancelUpdate} >Cancel</button>
                                ) : null
                            }
                            <button onClick = {this.handleSaveNotes}>{textButton}</button>
                        </div>
                    </div>
                        <hr/>
                        {
                            notes.length > 0 ? (
                                <Fragment>
                                    {
                                        notes.map(note => {
                                            const ts = note.data.date;
                                            const Date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(ts);
                                            return(
                                                <div className = 'content' key = {note.id} onClick = {() => updateNotes(note)} >
                                                    <p className = 'body-title'>{note.data.title}</p>
                                                    <p className = 'body-date'>{Date}</p>
                                                    <p className = 'body-content'>{note.data.content}</p>
                                                    <div className= 'delete-btn' onClick={(e) => { if (window.confirm('Apakah kamu yakin menghapus catatan ini?'))
                                                     this.deleteNote(e,note) 
                                                     } }>
                                                        Hapus  
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </Fragment>
                            ) : null 
                        }                         
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes   : state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes  : (data) => dispatch(addDataAPI(data)),
    getNotes   : (data) => dispatch(getdataFromAPI(data)),
    updateNotes: (data) => dispatch(updatedataFromAPI(data)),
    deleteNotes: (data) => dispatch(deletedataFromAPI(data))
})

export default connect (reduxState, reduxDispatch) (Dashboard);