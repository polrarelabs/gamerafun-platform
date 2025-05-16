import { Carousel } from "@components/screens/Carousel";
import { Typography } from "@mui/material";
import Iframe from "react-iframe";
import CreateReview from "./CreateReview";
import RelatedGames from "./RelatedGames";
import About from "./About";
const Overview = () => {
  return (
    <>
      <div>
        <CreateReview />
        <Typography variant="h2" component="h2" gutterBottom sx={{ my: 2 }}>
          Introduce
        </Typography>
        <Carousel />
        <Typography variant="h2" component="h2" gutterBottom sx={{ my: 2 }}>
          OverView
        </Typography>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/watch?v=pA31rxn3hYM&ab_channel=EndlessClouds"
          style={{ display: "block", position: "relative" }}
        />
        <Typography variant="h2" component="h2" gutterBottom sx={{ my: 2 }}>
          How to Get Started
        </Typography>
        <About />
        <RelatedGames />
      </div>
    </>
  );
};

export default Overview;
