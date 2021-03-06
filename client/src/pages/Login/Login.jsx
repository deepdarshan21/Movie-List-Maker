import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    Button,
    DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        navigate("/");
    };

    const handleLogin = () => {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
                email: userDetails.email,
                password: userDetails.password,
            })
            .then((res) => {
                localStorage.setItem("userInfoToken", res.data.token);
                setOpen(false);
                navigate("/user");
            })
            .catch((err) => {
                console.log(err);
                alert("Invalid User-email or Password");
            });
    };

    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });

    const handleChangeInput = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ textAlign: "center" }}>Login</DialogTitle>
            <DialogContent>
                <DialogContentText>Login to your account.</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    name="email"
                    fullWidth
                    variant="standard"
                    value={userDetails.email}
                    onChange={handleChangeInput}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    fullWidth
                    variant="standard"
                    value={userDetails.password}
                    onChange={handleChangeInput}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleLogin}>
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Login;
