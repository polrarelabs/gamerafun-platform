import { Carousel } from "@components/screens/Carousel";
import { Typography } from "@mui/material";
import Iframe from "react-iframe";
import LayoutModalReview from "./LayoutModalReview";
const LayoutOverview = () => {
  return (
    <>
      <div>
        <LayoutModalReview />
        <Typography variant="h2" component="h2" gutterBottom sx={{ my: 2 }}>
          Introduce
        </Typography>
        <Carousel />
        <Typography variant="h2" component="h2" gutterBottom sx={{ my: 2 }}>
          OverView
        </Typography>
        <Iframe
          width="100%"
          height="100%"
          url="https://www.sdrive.app/embed/1ptBQD"
          display="block"
          position="relative"
        />
        <Typography variant="h2" component="h2" gutterBottom sx={{ my: 2 }}>
          How to Get Started
        </Typography>
      </div>
    </>
  );
};

export default LayoutOverview;
