// State Manager For Fav Movies

import React, { createContext, useContext , useEffect , useState } from 'react';

const MovieContext = createContext(); 

export const useMovieContext = () => useContext(MovieContext); // custom hook to use the context

export const MovieProvider = ({children}) => {  // Provide State to any of the components surrounded around it

    

    const [favourites , setFavourites] = useState([]); 


    useEffect(() => {  // Look inside and check whether we already have any movies in the local storage or not
        const storedFavs = localStorage.getItem("favourites"); 
        if(storedFavs) setFavourites(JSON.parse(storedFavs));   // We change it as json coz local storage only stores strings
    } , [])
    

    useEffect(() => {
        localStorage.setItem("favourites" , JSON.stringify(favourites));  // Store the favourites in the local storage whenever state changes
    } , [favourites])






    // Add to favourites

    const addToFavourites = (movie) => {
        setFavourites((prev) => [...prev , movie]); // add the movie to the favourites
    }


    // Remove from favourites

    const removeFromFavourites = (movieId) => {
        setFavourites((prev) => prev.filter((fav) => fav.id !== movieId)); // remove the movie from the favourites
    }


    // Check if the movie is favourite or not

    const isFavourite = (movieId) => {
        return favourites.some(movie => movie.id === movieId); // check if the movie is in the favourites
    }




    const value = {
        favourites , 
        addToFavourites , 
        removeFromFavourites , 
        isFavourite
    }





    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}