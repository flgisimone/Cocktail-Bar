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
      <section className='searchbar'>
          <div className='container_Searchbar'>
              <form className='formSearch' name='formSearch' onSubmit={inputSearch}>
                <input type='text' placeholder='Ordina il cocktail' className='inputSearch' required minLength='3' autoComplete='off'/>
                <button type='submit' className='btnSearch'>
                  <i className='fa-solid fa-martini-glass-citrus' />
                </button>
              </form>
              <p className='textDisclaimer'>Inserisci il nome completo del cocktail</p>
          </div>
      </section>
      
      <section className='containerCocktail'>
        <div className='cocktail'>
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
                        <div className='cardCocktail'>
                          <div className='containerInfo'>
                            <div className={infoCocktail ? 'infoCocktail hidden' : 'infoCocktail show'}>
                              <p className='presentationCocktail'>{presentation}</p>
                            </div>
                            <div className='containerBtn_InfoCocktail'>
                              <button className={infoCocktail ? 'btnOpenInfo show' : 'btnOpenInfo hidden'} onClick={btnOpenInfo}>
                                  <i className='fa-solid fa-circle-info' />
                              </button>
                              <button className={!infoCocktail ? 'btnCloseInfo show' : 'btnCloseInfo hidden'} onClick={btnCloseInfo}>
                                  <i className='fa-solid fa-circle-xmark' />
                              </button>
                            </div>
                          </div>
                          <img src={image} alt={name} className={!infoCocktail ? 'imgCocktail-onClick' : 'imgCocktail'} onClick={btnOpenInfo}/>
                        </div>
                      )
                })
            }
        </div>
      </section>
    </>
  )
}

export default SearchCocktail
