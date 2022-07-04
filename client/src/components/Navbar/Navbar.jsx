import "./Navbar.css";
import { Typography, TextField, InputAdornment, Button, Avatar } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = (props) => {
    const { isAlreadyLogin, userName } = props;

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
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AiOutlineSearch />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    sx={{ marginLeft: "20px" }}
                    placeholder="Search a movie..."
                />
                {isAlreadyLogin ? (
                    <>
                        <Avatar
                            // alt="Remy Sharp"
                            // src="/static/images/avatar/1.jpg"
                            {...stringAvatar("Prashant Pathak")}
                            sx={{ marginLeft: "20px" }}
                        />
                    </>
                ) : (
                    <>
                        <Button variant="text" sx={{ marginLeft: "20px" }}>
                            Login
                        </Button>
                        <Button variant="contained" sx={{ marginLeft: "20px" }}>
                            Sign Up
                        </Button>
                    </>
                )}
            </span>
        </nav>
    );
};

export default Navbar;
