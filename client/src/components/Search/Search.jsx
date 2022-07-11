import "./Search.css";
import { useEffect, useRef, useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import SearchResult from "./SearchResult";

const Search = (props) => {
    const [value, setValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const onChangeHandler = (e) => {
        setValue(e.target.value);
    };

    // const cancelTokenSource = useRef();
    // let cancelToken;
    const cancelToken = useRef();

    useEffect(() => {
        const fetch = async () => {
            if (typeof cancelTokenSource != typeof undefined) {
                // cancelTokenSource.current.cancel();
                cancelToken.current.cancel("Canceling the previous request");
            }
            // cancelTokenSource.current = Axios.CancelToken.source();
            cancelToken.current = axios.CancelToken.source();

            const { data } = await axios.get(
                `https://www.omdbapi.com/?s=${value}&apikey=${process.env.REACT_APP_API_KEY}`,
                {
                    cancelToken: cancelToken.current.token,
                }
            );
            // console.log(value, data);
            if (data.Response === "False") {
                if (data.Error === "Too many results.") {
                    setSearchResults(["Enter some more letter for search..."]);
                } else if (data.Error === "Movie not found!") {
                    setSearchResults(["Movie not found!"]);
                }
            } else {
                setSearchResults([...data.Search]);
            }
        };
        fetch();
    }, [value]);
    return (
        <div className="search-box">
            <TextField
                autoComplete="off"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AiOutlineSearch />
                        </InputAdornment>
                    ),
                }}
                variant="standard"
                placeholder="Search a movie..."
                value={value}
                onChange={onChangeHandler}
            />
            {value.length ? (
                <div className="search-box-result-header">
                    {searchResults.map((result, index) => {
                        if (typeof result === "object") {
                            return <SearchResult key={index} movieName={result.Title} />;
                        } else return <SearchResult key={index} movieName={result} />;
                    })}
                </div>
            ) : null}
        </div>
    );
};

export default Search;
