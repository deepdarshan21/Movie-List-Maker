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

const Login = (props) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(props.open);

    const handleClose = () => {
        setOpen(false);
        navigate("/");
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
                <Button variant="contained" onClick={handleClose}>
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Login;