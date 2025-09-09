// list of all movies
import MovieCard from "../components/MovieCard";
import {useState , useEffect} from "react";
import '../css/Home.css';
import { searchMovies , getPopularMovies} from "../services/api";




function Home() {


    const [searchQuery , setSearchQuery] = useState("");


    // const movies = [
    //     {id:1 , title:"John Wick" , release_date:"2020"},
    //     {id:2 , title:"Terminator" , release_date:"1999"},
    //     {id:3 , title:"The Matrix" , release_date:"1998"},
    // ];


    const [movies , setMovies] = useState([]); // to store the movies

    const [error , setError] = useState(null); // 1 st variable
    const [loading , setLoading] = useState(true); // 2nd variable




    useEffect(() => {
      const loadPopularMovies = async () => {
        try{
          const popularMovies = await getPopularMovies(); // fetch the movies from api
          setMovies(popularMovies); // set the movies in the state
        }catch(err){
          console.log(err);
          setError("failer to fetch movies..."); 
        }
        finally{
          setLoading(false)
        }
      }

      loadPopularMovies(); 
    }, []); // to fetch the movies when the component mounts



    // 2 variables
    // 1.loading state
    // 2.potential error 
    // when working with api's

    const handleSearch = async (e) => {   // if we use await in the function then we have to use async in the function
        e.preventDefault(); // prevent the text in that page even after refreshing inside text box
        if(!searchQuery.trim()) return ;
        if(loading) return; // if loading is true then do not search again
        setLoading(true); // set loading to true when searching

        try{
          const searchResults = await searchMovies(searchQuery);  // APi call to search for movies
          setMovies(searchResults); 
          setError(null); // reset error (i.e..) to clear old error 
        }catch(err){
          console.log(err);
          setError("Failed to search movies..."); 
        }finally{
          setLoading(false); // set loading to false when searching is done
        }

        // setSearchQuery(""); // clear the search input after searching
    }






  return (
    <div className="home">

        <form onSubmit={handleSearch} className="search-form">
            <input 
                type="text" 
                placeholder="Search for movies..."
                className="search-input"
                value={searchQuery}  // we cant type in that box so that introduce onchange
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error">{error}</div>}

        {loading ? <div className="loading">Loading...</div> : 
            <div className="movies-grid">
            {movies.map((movie) => (
            // movie.title.toLowerCase().startsWith(searchQuery) && (
            //     <MovieCard movie={movie} key={movie.id} />
            // )
            (
                <MovieCard movie={movie} key={movie.id} />
            )
            ))}
          </div>
        } 


      <div className="movies-grid">
        {movies.map((movie) => (
        // movie.title.toLowerCase().startsWith(searchQuery) && (
        //     <MovieCard movie={movie} key={movie.id} />
        // )
        (
            <MovieCard movie={movie} key={movie.id} />
        )
        ))}
      </div>
    </div>
  );
}



export default Home