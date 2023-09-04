import React from 'react'
import "./style.css"
import Search from './component/Search'
import Favorite from './component/Favorite'
import Modal from './component/Modal'
import Meals from './component/Meal'
import { useGlobalContext } from './context'

export default function App() {
  const { favorites, showModal } = useGlobalContext()
  return (
    <main>
      <Search />
      {favorites.length > 0  && <Favorite />}
      {showModal && <Modal />}
      <Meals />
    </main>
  )
}
