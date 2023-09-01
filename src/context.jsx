import React, { createContext, useContext, useEffect } from "react";
import axios from 'axios'

const AppContext = createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a'
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({children}) => {
    const [login, setLogin] = React.useState(false)
    const fetchMeals = async (url) => {
        try {
            const response  = await axios(url)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])
    return <>
        <AppContext.Provider value={{login, setLogin}}>
            {children}
        </AppContext.Provider>
    </>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppProvider, AppContext}