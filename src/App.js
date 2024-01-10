import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import { MutatingDots } from "react-loader-spinner";


const API_URL = "https://www.omdbapi.com?apikey=3782fe82";
const TRENDING_MOVIES = ["tt0816692", "tt12361974", "tt3152592", "tt1375666", "tt0848228", "tt2488496", "tt4154796", "tt0369610", "tt0167260", "tt4633694", "tt6751668"]; // IMDb IDs of trending movies


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search || []);
    };

    useEffect(() => {
        // Fetch trending movies
        const fetchTrendingMovies = async () => {
            const promises = TRENDING_MOVIES.map(async (imdbID) => {
                const response = await fetch(`${API_URL}&i=${imdbID}`);
                const data = await response.json();
                return data;
            });
            const trendingMovies = await Promise.all(promises);
            setMovies(trendingMovies);
        };

        fetchTrendingMovies();
    }, []);

    return (
        <div className="app">
            <h1 id="headTitle">MovieFox</h1>

            <div className="search">
                <input
                    placeholder="Enter Movie Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") searchMovies(searchTerm);
                    }}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                !movies.length ? (
                    <MutatingDots
                        visible={true}
                        height="100"
                        width="100"
                        color="#dbbba1"
                        secondaryColor="#dbbba1"
                        radius="12.5"
                        ariaLabel="mutating-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />) : (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default App;
