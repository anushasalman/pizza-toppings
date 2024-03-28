import { useState, useEffect } from 'react'
import { pizzaList } from './pizza-data.js'
import './App.css'

const App = () => {
  const [pizzas, setPizzaList] = useState(pizzaList)
  const [featPizzaId, setFeatPizzaId] = useState(null)
  const featuredPizza = pizzas.find((pizza)=> pizza.id === featPizzaId)
  const [pizzaNameInput, setPizzaNameInput] = useState("");
  const [pizzaToppingInput, setPizzaToppingInput] = useState("");

  useEffect(() => {
    const getPizza = async() => {
      const response = await fetch (pizzaList);
      const json = await response.json();
      const topSeven = json;
      setPizzaList(topSeven);
    }

    getPizza();
  }, []);

  const onPizzaNameChange = (event) => {
    setPizzaNameInput(event.target.value);
  }

  const onPizzaToppingChange = (event) => {
    setPizzaToppingInput(event.target.value);
  }

  const onPizzaFormSubmit =(event) => {
    event.preventDefault();
    setPizzaList([...pizzaList, { name: pizzaNameInput, topping: pizzaToppingInput }]);

  }

  return (
    <>
    <h2>Slice to meet you, please choose your pizza:</h2>
    <h2>Or add one of your own!</h2>

    <form onSubmit={onPizzaFormSubmit}>
      <input placeholder="pizza name" name="newPizzaName" onChange={(event) => setPizzaNameInput(event.target.value)}/>
      <input placeholder="pizza topping" name="newPizzaTopping" onChange={(event) => setPizzaToppingInput(event.target.value)}/>
        <button>Submit New Pizza!</button>
    </form>
    
    <div>
        { featPizzaId && ( 
        <div>
          <h2>{featuredPizza.name}</h2>
          <ul>
            <p>Topping: {featuredPizza.topping}</p>
            </ul>
          </div>
      )}
{
  pizzas.map((pizza) => {
    return <p onClick={() => {setFeatPizzaId(pizza.id)}} key={pizza.id}>{pizza.name}</p>
  })
}
    </div>



    </>
  )
}

export default App