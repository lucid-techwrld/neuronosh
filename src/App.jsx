import {
  useState,
  useEffect
} from 'react'
import Header from "./components/Header"
import AddIngredient from "./components/AddIngredient"
import Loader from "./components/loading"

function App() {
  const [isLoading,
    setIsLoading] = useState(true);

  useEffect(()=> {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer)
  }, [])
  return (
    <main className="font-myFont">
      {isLoading ? (<Loader />): (
      <>
        <Header />
        <AddIngredient />
      </>
      )}
    </main>
  )
}

export default App