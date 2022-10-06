import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppProvider = ({ children }) => {

    const [ meals, setMeals ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ searchCount, setSearchCount ] = useState(0);
    const [ selectedMeal, setSelectedMeal ] = useState(null);
    const [ favorites, setFavorites ] = useState(JSON.parse(localStorage.favorites ?? '[]'));

    const addToFavorites = idMeal => {
        const isAlreadyFavorite = favorites.some(meal => meal.idMeal == idMeal);
        if(isAlreadyFavorite) return;
        const meal = meals.find(meal => meal.idMeal == idMeal);
        const updatedFavorites = [ ...favorites, meal ];
        setFavorites(updatedFavorites);
        localStorage.favorites = JSON.stringify(updatedFavorites);
    };

    const removeFromFavorites = idMeal => {
        const updatedFavorites = favorites.filter(meal => meal.idMeal != idMeal);
        setFavorites(updatedFavorites);
        localStorage.favorites = JSON.stringify(updatedFavorites);
    };

    const selectMeal = (idMeal, isFavoriteMeal = false) => {
        setSelectedMeal(
            (isFavoriteMeal ? favorites : meals).find(meal => meal.idMeal == idMeal)
        );
    };

    const closeModal = () => setSelectedMeal(null);

    const incrementSearchCount = () => setSearchCount(searchCount + 1);

    const isCacheSupported = 'caches' in window;

    const fetchMeals = async url => {
        setLoading(true);
        try
        {
            let meals;
            const setMealsArray = async res => {
                meals = await res.json().then(({ meals }) => meals);
            };
            if (isCacheSupported && url != randomMealUrl)
            {
                await window.caches.open('meals-cache')
                    .then(async cache => {
                        await cache.match(url)
                            .then(async res => {
                                if(res) await setMealsArray(res);
                                else
                                {
                                    await cache.add(url);
                                    await cache.match(url)
                                        .then(async res => await setMealsArray(res));
                                }
                            });
                    });
            }
            else
            {
                const res = await fetch(url);
                await setMealsArray(res);
            }
            setMeals(meals ?? []);
        }
        catch(error)
        {
            console.log(error);
            setMeals([]);
        }
        finally
        {
            setLoading(false);
        }
    };

    const fetchRandomMeal = () => fetchMeals(randomMealUrl);

    useEffect(() => {
        fetchMeals(`${allMealsUrl}${searchTerm}`);
    }, [ searchCount ]);

    return (
        <AppContext.Provider value={{ favorites, meals, loading, selectedMeal, selectMeal, setSearchTerm, fetchRandomMeal, incrementSearchCount, closeModal, addToFavorites, removeFromFavorites }}>
            { children }
        </AppContext.Provider>
    );
};

const useGlobalContext = () => useContext(AppContext);

export { AppProvider, AppContext, useGlobalContext };
