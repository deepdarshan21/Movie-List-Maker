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

const Signup = (props) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        navigate("/");
    };

    const handleSignup = () => {
        if (userDetails.password === userDetails.confirmPassword) {
            axios
                .post("http://localhost:4509/auth/signup", {
                    email: userDetails.email,
                    name: userDetails.name,
                    password: userDetails.password,
                })
                .then((res) => {
                    alert("Successfully signed up. Now login to your account")
                    handleClose();
                })
                .catch((err) => {
                    alert("Internal error occoured! Please try again after some time");
                });
        } else {
            alert("Password and confirm password not matchs");
        }
    };

    const [userDetails, setUserDetails] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });

    const handleChangeInput = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ textAlign: "center" }}>Signup</DialogTitle>
            <DialogContent>
                <DialogContentText>Signup to get your account.</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
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
                    id="name"
                    label="Name"
                    type="text"
                    name="name"
                    fullWidth
                    variant="standard"
                    value={userDetails.name}
                    onChange={handleChangeInput}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Password"
                    type="password"
                    name="password"
                    fullWidth
                    variant="standard"
                    value={userDetails.password}
                    onChange={handleChangeInput}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    fullWidth
                    variant="standard"
                    value={userDetails.confirmPassword}
                    onChange={handleChangeInput}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleSignup}>
                    Signup
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Signup;
