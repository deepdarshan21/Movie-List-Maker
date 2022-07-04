import "./Footer.css";
import { Button } from "@mui/material";

const Footer = (props) => {
    return (
        <footer className="footer">
            <Button variant="text">
                <h4>© Movie List Maker 2022</h4>
            </Button>
            <span>
                <Button variant="text">Support</Button> {" | "}
                <Button variant="text">About</Button> {" | "}
                <Button variant="text">Terms</Button> {" | "}
                <Button variant="text">Privacy</Button>
            </span>
        </footer>
    );
};

export default Footer;
