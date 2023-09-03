import React, { createContext, useContext, useEffect } from "react";
import axios from 'axios'

const AppContext = createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a'
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({children}) => {
    const [loading, setLoading] = React.useState(false)
    const [meals, setMeals] = React.useState([])
    const [searchTerm, setSearchTerm] = React.useState('')

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

    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])

    useEffect(() => {
        if(!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])

    return <>
        <AppContext.Provider value={{meals, loading, setSearchTerm, fetchRandomMeals}}>
            {children}
        </AppContext.Provider>
    </>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppProvider, AppContext}