import { useState } from 'react'
import './App.css'
import FormContainer from './components/FormContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FormContainer />
    </> 
  )
}

export default App
