import React, { createContext, useContext, useEffect } from "react";
import axios from 'axios'

const AppContext = createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a'
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({children}) => {
    const [loading, setLoading] = React.useState(false)
    const [meals, setMeals] = React.useState([])

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
    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])
    return <>
        <AppContext.Provider value={{meals, loading}}>
            {children}
        </AppContext.Provider>
    </>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppProvider, AppContext}