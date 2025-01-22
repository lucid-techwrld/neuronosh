import {
  useState
} from 'react'
import Header from "./components/Header"
import AddIngredient from "./components/AddIngredient"

function App() {
  return (
    <main className="font-myFont">
      <Header />
      <AddIngredient />
    </main>
  )
}

export default App