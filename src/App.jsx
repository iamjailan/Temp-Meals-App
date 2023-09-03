import React from 'react'
import "./style.css"
import Search from './component/Search'
import Favorite from './component/Favorite'
import Modal from './component/Modal'
import Meals from './component/Meal'

export default function App() {
  return (
    <main>
      <Search />
      {/* <Favorite />
      <Modal /> */}
      <Meals />
    </main>
  )
}
