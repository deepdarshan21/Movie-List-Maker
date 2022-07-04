import "./Home.css";
import { Button, Typography } from "@mui/material";
import { BsPencilFill } from "react-icons/bs";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Home = (props) => {
    return (
        <>
            <Navbar />
            <div className="head">
                <Typography component="h1" sx={{ fontSize: "48px", fontWeight: "700" }}>
                    Movie List Maker
                </Typography>
                <Typography component="h4" sx={{ fontSize: "28px", fontWeight: "500" }}>
                    Share Opinions. Keep Track. Make Lists
                </Typography>
                <Typography sx={{ fontSize: "22px", fontWeight: "100" }}>
                    Create a Movie Lists fast for free. Opinion lists on private or public access
                    type.
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<BsPencilFill />}
                    sx={{ width: "200px" }}
                    size="large"
                >
                    Make a list
                </Button>
            </div>
            <div className="main">
                <div>
                    <Typography component="h4" variant="h4">
                        Top Liked Lists
                    </Typography>
                </div>
                <div>
                    <Typography component="h4" variant="h4">
                        My Lists
                    </Typography>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
