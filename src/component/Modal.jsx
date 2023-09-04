import React from 'react'
import { useGlobalContext } from '../context'

export default function Modal() {
  const { selectedMeal, closeModal } = useGlobalContext()
  const { strMealThumb: image, strMeal: title, strInstruction: text, strSource: source } = selectedMeal
  return (
    <aside className='modal-overlay'>
        <div className='modal-container'>
        <img src={image} alt={title} className='img modal-img' />
        <div className='modal-content'>
          <h4>{title}</h4>
          <p>Cooking Instruction</p>
          <p>{text}</p>
          <a href={source} target='_blank'>Original Source</a>
          <button className='btn btn-hipster close-btn' onClick={closeModal}>Close</button>
        </div>
        </div>
    </aside>
  )
}
