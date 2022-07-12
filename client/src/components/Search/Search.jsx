import { useEffect, useRef, useState } from "react";
import { TextField, InputAdornment, Autocomplete, Paper, Popper } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

const Search = (props) => {
    const [value, setValue] = useState("");
    const [searchResults, setSearchResults] = useState(["Enter some more letter for search..."]);

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
        <>
            {/* {console.log(searchResults)} */}
            <Autocomplete
                freeSolo
                // loading
                // loadingText={(options)=> {
                //     console.log("Loading Text", options);
                //     if (typeof options[0] === "string") {
                //         return options[0];
                //     }
                //     return "Loading..."
                // }}
                disableClearable
                options={searchResults}
                getOptionLabel={(option) => {
                    // console.log("Typeof, ", typeof option);
                    // console.log(option);
                    if (typeof option === "string") {
                        return option;
                    }
                    return option.Title;
                }}
                PaperComponent={(props) => (
                    <Paper
                        {...props}
                        sx={{ width: "100%", padding: "0", "&::-webkit-scrollbar": { width: "0" } }}
                    />
                )}
                PopperComponent={(props) => (
                    <Popper
                        {...props}
                        sx={{ width: "100%", padding: "0", "&::-webkit-scrollbar": { width: "0" } }}
                        // sx={{ width: "200px", padding: "0" }}
                        placement="bottom-start"
                    />
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        fullWidth = {!props.inNavbar}
                        style={{width: props.inNavbar ? "300px": null}}
                        placeholder="Search a movie..."
                        value={value}
                        onChange={onChangeHandler}
                        InputProps={{
                            ...params.InputProps,
                            type: "search",
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AiOutlineSearch />
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />
        </>
    );
};

export default Search;
