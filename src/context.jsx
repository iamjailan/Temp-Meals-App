import React, { createContext, useContext, useEffect } from "react";
import axios from 'axios'

const AppContext = createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a'
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({children}) => {
    const [loading, setLoading] = React.useState(false)
    const [meals, setMeals] = React.useState([])
    const [searchTerm, setSearchTerm] = React.useState('')

    const [showModal, setShowModal] = React.useState(false)
    const [selectedMeal, setSelectedMeal] = React.useState(null)
    const [favorites, setFavorite] = React.useState([])

    const fetchMeals = async (url) => {
        setLoading(true)
        try {
            const {data}  = await axios(url)
            if(data.meals) {
                setMeals(data.meals)
            }else {
                setMeals([])
            }
        } catch (error) {
            console.log(error.response);
        }
        setLoading(false)
    }

    const fetchRandomMeals = () => {
        fetchMeals(randomMealUrl)
    }

    const selectMeal = (idMeal, favoriteMeal) => {
        let meal;
        meal = meals.find(meal => meal.idMeal === idMeal)
        setSelectedMeal(meal)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }
    const addToFavorite = idMeal => {
        const alreadyFavorite = favorite.find(meal => meal.idMeal === idMeal)
        if(alreadyFavorite) return ;
        const meal = meals.find(meal => meal.idMeal === idMeal)
        const updatedFavorite = [...favorite, meal]
        setFavorite(updatedFavorite)
        localStorage.setItem("favorites", JSON.stringify(updatedFavorite))
    } 
    const removeFromFavorite = idMeal => {
        const updatedFavorite = favorite.filter(meal => meal.id !== idMeal)
        setFavorite(updatedFavorite)
        localStorage.setItem("favorites", JSON.stringify(updatedFavorite))
    }

    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])

    useEffect(() => {
        if(!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])

    return <>
        <AppContext.Provider value={{meals, loading, setSearchTerm, fetchRandomMeals, showModal, selectMeal, selectedMeal, closeModal, addToFavorite, removeFromFavorite, favorites}}>
            {children}
        </AppContext.Provider>
    </>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppProvider, AppContext}