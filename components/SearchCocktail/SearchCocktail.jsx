import React, {useState, useEffect} from 'react'
import axios from "axios"
//import Cocktail from "../Cocktail/Cocktail"

import "./SearchCocktail.scss"
import "../Cocktail/Cocktail.scss"

const urlCocktail = "https://638b4f2581df38ab34661c0d.mockapi.io/CocktailBar";

const SearchCocktail = () => {

  let [searchName, setSearchName] = useState("")


  const inputSearch = (e) =>{
    e.preventDefault()
    const formSearch = document.forms.formSearch
    const element = formSearch.elements
    setSearchName(searchName = element[0].value)
  }
  

  const [data, setData] = useState([])

  const getData = async() => {
      const res = await axios.get(urlCocktail)
      console.log(res.data)
      setData(res.data)
  }
  useEffect(() => {
      getData(data)
  },[])

  const [infoCocktail, setInfoCocktail] = useState(true)

  const btnOpenInfo = () =>{
      setInfoCocktail(false)
      //setRecipeCocktail(true)
  }

  const btnCloseInfo = () =>{
      setInfoCocktail(true)
  }

  return (
    <>
      <section className="searchbar">
          <div className='container_Searchbar'>
              <form className="formSearch" name="formSearch" onSubmit={inputSearch}>
                <input type="text" placeholder='Ordina il cocktail' className='inputSearch' required minlength="3" autoComplete='off'/>
                <button type="submit" className="btnSearch">
                  <i class="fa-solid fa-martini-glass-citrus"></i>
                </button>
              </form>
          </div>
      </section>
      
      <section className="containerCocktail">

        <div className="cocktail">
            {
                data.filter((value) => {
                  if(searchName === "") {
                    return;
                  } else if(value.name.toLowerCase().includes(searchName.toLowerCase())) {
                    return value
                  }
                })
                .map(el =>  {
                    const {image, name, presentation, ingredients, id} = el
                    return (
                        <>       
                            <img src={image} alt={name} key={id} className="imgCocktail"/>
                            <div className={infoCocktail ? "infoCocktail hidden" : "infoCocktail show"}>
                                <p class="presentationCocktail">{presentation}</p>
                            </div>
                            <div className="containerButton">
                              <div className="containerBtn_InfoCocktail">
                                <button className={infoCocktail ? "btnOpenInfo show" : "btnOpenInfo hidden"} onClick={btnOpenInfo}>
                                  <i class="fa-solid fa-circle-info"></i>
                                </button>
                                <button className={!infoCocktail ? "btnCloseInfo show" : "btnCloseInfo hidden"} onClick={btnCloseInfo}>
                                    <i class="fa-solid fa-circle-xmark"></i>
                                </button>
                              </div>
                            {/*
                            <div className="containerBtn_RecipeCocktail">
                                <button className={recipeCocktail ? "btnOpenRecipe show" : "btnOpenRecipe hidden"} onClick={btnOpenRecipe}>
                                <i class="fa-solid fa-scroll"></i>
                                </button>
                                <button className={!recipeCocktail ? "btnCloseRecipe show" : "btnCloseRecipe hidden"} onClick={btnCloseRecipe}>
                                    <i class="fa-solid fa-circle-xmark"></i>
                                </button>
                              </div>
                              */}
                            </div>
                              {/*
                              <div className={recipeCocktail ? "recipeCocktail hidden" : "recipeCocktail show"}>
                                  <p class="ingredientsCocktail">{ingredients[0]}</p>
                              </div>
                              */}
                        </>  
                      )
                })
            }
        </div>
    </section>
    </>
  )
}

export default SearchCocktail

/*
 onSubmit={(e) =>{
              e.preventDefault()
              const searchString = element[0].value
              nameCocktail
              .filter(nameCocktail => nameCocktail.name.includes(searchString) || nameCocktail.name.toLowerCase().includes(searchString))
              .map(nameCocktail => containerCocktail(nameCocktail))
            }}*/