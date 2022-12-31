import React, {useState, useEffect} from 'react'
import axios from "axios"
import "./Cocktail.scss"
const urlCocktail = "https://638b4f2581df38ab34661c0d.mockapi.io/CocktailBar";

const Cocktail = () => {

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

    /*
    const [recipeCocktail, setRecipeCocktail] = useState(true)

    const btnOpenRecipe = () =>{
        setInfoCocktail(true)
        setRecipeCocktail(false)
    }

    const btnCloseRecipe = () =>{
        setRecipeCocktail(true)
    }
    */

  return (
    <section className="containerCocktail">
        <div className="cocktail">
            {
                data.filter(el => el.id == 2)
                    .map(el =>  {
                    const {image, name, presentation, ingredients, id} = el
                    return (
                        <>       
                            <img src={image} alt={name} key={id} className="imgCocktail"/>
                            <div className={infoCocktail ? "infoCocktail hidden" : "infoCocktail show"}>
                                <p class="presentationCocktail">{presentation}</p>
                            </div>
                            {/*
                            <div className={recipeCocktail ? "recipeCocktail hidden" : "recipeCocktail show"}>
                                <p class="ingredientsCocktail">{ingredients[0]}</p>
                            </div>
                            */}
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
                        </>  
                    )
                })
            }
        </div>
    </section>
  )
}

export default Cocktail