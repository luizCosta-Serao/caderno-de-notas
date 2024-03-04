import React, { ChangeEvent, FormEvent } from 'react'
import './App.css'
import Notes from './components/Notes/Notes'
import api from './services/api'
import RadioButton from './components/RadioButton/RadioButton'

type AllNotesProps = {
  _id: string;
  title: string;
  notes: string;
  priority: boolean;
}

function App() {
  const [title, setTitle] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [allNotes, setAllNotes] = React.useState<AllNotesProps[] | null>(null)
  const [selectedValue, setSelectedValue] = React.useState('all')

  // Delete note
  async function handleDelete(_id: string) {
    const notes = await api.delete(`/annotations/${_id}`)
    if (notes && selectedValue !== 'all') {
      loadNotes(selectedValue)
    } else if (notes) {
      getAllNotes()
    }
  }

  // Change priority
  async function changePriority(_id: string) {
    const notes = await api.post(`/priorities/${_id}`)
    if (notes && selectedValue !== 'all') {
      loadNotes(selectedValue)
    } else if (notes) {
      getAllNotes()
    }
  }

  // Show filtered notes
  async function loadNotes(option: string) {
    const params = { priority: option }
    const response = await api.get('/priorities', { params })
    if (response.status === 200) {
      setAllNotes(response.data)
    }
  }

  // Change filter and notes
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedValue(event.target.value)

    if (event.target.checked && event.target.value !== 'all') {
      loadNotes(event.target.value)
    } else {
      getAllNotes()
    }
  }

  const btnRef = React.useRef<HTMLButtonElement>(null)

  // Add new note
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const response = await api.post('/annotations', {
      title,
      notes,
      priority: false
    })

    setTitle('')
    setNotes('')
    setSelectedValue('all')
    getAllNotes()

    if (allNotes) {
      setAllNotes([...allNotes, response.data])
    }
  }

  // Show all notes
  async function getAllNotes() {
    const response = await api.get('/annotations')
    setAllNotes(response.data)
  }

  React.useEffect(() => {
    getAllNotes()
  }, [])

  React.useEffect(() => {
    function enableSubmitButton() {
      if (btnRef.current) {
        title && notes ?
          btnRef.current.style.backgroundColor = "#eb8f7a" 
          :
          btnRef.current.style.backgroundColor = '#ffd3ca'
      }
    }
    enableSubmitButton()
  }, [title, notes])

  if (!allNotes) return null
  return (
    <section className='app'>
      <aside>
        <strong>Caderno de Notas</strong>
        <form onSubmit={handleSubmit} action="">
          <div className='input_block'>
            <label htmlFor="title">Título da Anotação</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={30}
            />
          </div>

          <div className='input_block'>
            <label htmlFor="notes">Anotações</label>
            <textarea
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              name=""
              id=""
            ></textarea>
          </div>

          <button ref={btnRef} type='submit'>Salvar</button>
        </form>
        <RadioButton
          selectedValue={selectedValue}
          handleChange={handleChange}
        />
      </aside>
      <main>
        <ul>
          {allNotes.map((note) => (
            <Notes
              key={note._id}
              _id={note._id}
              title={note.title}
              notes={note.notes}
              priority={note.priority}
              handleDelete={handleDelete}
              changePriority={changePriority}
            />
          ))}
        </ul>
      </main>
    </section>
  )
}

export default App
