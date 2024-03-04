import React from 'react'
import { AiTwotoneDelete, AiOutlineExclamation } from "react-icons/ai";
import styles from './Notes.module.css'
import api from '../../services/api';

type NotesProps = {
  _id: string;
  title: string;
  notes: string;
  priority: boolean;
  handleDelete: (_id: string) => Promise<void>;
  changePriority: (_id: string) => Promise<void>;
}

const Notes = ({
  _id,
  title,
  notes,
  priority,
  handleDelete,
  changePriority
}: NotesProps ) => {
  const [changedNote, setChangedNote] = React.useState('')
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  // Edit note
  async function handleSave(notes: string) {
    if (textareaRef.current) {
      textareaRef.current.style.cursor = 'pointer'
      textareaRef.current.style.borderRadius = 'initial'

      priority ?
        textareaRef.current.style.boxShadow = 'initial'
        :
        textareaRef.current.style.boxShadow = 'initial'
    }

    if (changedNote && changedNote !== notes) {
      await api.post(`/contents/${_id}`, {
        notes: changedNote
      })
    }
  }

  function handleEdit(priority: boolean) {
    if (textareaRef.current) {
      textareaRef.current.style.cursor = 'text'
      textareaRef.current.style.borderRadius = '5px'

      priority ?
        textareaRef.current.style.boxShadow = '0 0 5px #fff'
        :
        textareaRef.current.style.boxShadow = '0 0 5px #888'
    }
  }

  return (
    <li className={`${styles.notepadInfos} ${priority ? styles.priority : ''}`}>
      <div>
        <strong>{title}</strong>
        <div onClick={() => handleDelete(_id)}>{<AiTwotoneDelete size='20'/>}</div>
      </div>

      <textarea
        ref={textareaRef}
        defaultValue={notes}
        onClick={(e) => handleEdit(priority)}
        onChange={(e) => setChangedNote(e.target.value)}
        onBlur={(e) => handleSave(notes)}
      />
      <span onClick={() => changePriority(_id)}>
        <AiOutlineExclamation size='20'/>
      </span>
    </li>
  )
}

export default Notes