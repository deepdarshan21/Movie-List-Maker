import "./Navbar.css";
import { Typography, Button, Avatar } from "@mui/material";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = (props) => {
    const { isAlreadyLogin } = props;
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const getUserName = async () => {
            const res = await axios.post("/user/username", {
                jwtToken: localStorage.getItem("userInfoToken"),
            });
            setUserName(res.data.name);
        };
        if (isAlreadyLogin) {
            getUserName();
        }
    }, [isAlreadyLogin]);

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(" ")[0][0]}`,
        };
    }

    return (
        <nav className="nav">
            <Typography
                component="h2"
                className="nav-title"
                sx={{ fontSize: "32px", fontWeight: "600" }}
            >
                Movie List Maker
            </Typography>
            <span className="nav-links">
                <Search />
                {isAlreadyLogin ? (
                    <>
                        <Avatar
                            // alt="Remy Sharp"
                            // src="/static/images/avatar/1.jpg"
                            {...stringAvatar(userName)}
                            sx={{ marginLeft: "20px" }}
                        />
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <Button variant="text" sx={{ marginLeft: "20px" }}>
                                Login
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="contained" sx={{ marginLeft: "20px" }}>
                                Sign Up
                            </Button>
                        </Link>
                    </>
                )}
            </span>
        </nav>
    );
};

export default Navbar;
