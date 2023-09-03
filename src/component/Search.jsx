import React from 'react'
import { useGlobalContext } from '../context'

export default function Search() {
  const [text, setText] = React.useState("")
  const { setSearchTerm, fetchRandomMeals } = useGlobalContext

  function handleSubmit(e) {
    e.preventDefault()
    if(text) {
      setSearchTerm(text)
    }
  }

  function handleRadomMeal() {
    setSearchTerm('')
    setText('')
    fetchRandomMeals()
  }
  return (
    <header className='search-container'>
        <form onSubmit={handleSubmit}>
          <input type='text' value={text} onChange={e => setText(e.target.value)} placeholder='type favorite meal' className='form-input' />
          <button className='btn'>Search</button>
          <button className='btn btn-hipster' onClick={handleRadomMeal}>Surprise me</button>
        </form>
    </header>
  )
}
