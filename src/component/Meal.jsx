import React, { useContext } from 'react'
import { AppContext, useGlobalContext } from '../context';

export default function Meal() {
  const { login } = useGlobalContext()
  return (
    <div>
      <h1>This is Meal Page!</h1>
    </div>
  )
}