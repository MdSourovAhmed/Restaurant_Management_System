import { Link } from "react-router-dom";
import Menu from "./Menu";
import Tables from "./Tables";
import Orders from "./Orders";
import homeImage from "../assets/home.jpg";
import HeroSection from "./HeroSection";
import OrderForm from "./OrderForm";
import Footer from "./Footer";
// import HeroSection from "./HeroSection";

const Home = () => {
  return (
    <>
      <div className="grid-col-1 container mx-auto max-w-7xl gap-6 ">
        <HeroSection />
        <Menu />
        <Tables />
      </div>
        <Footer/>
    </>
  );
};

export default Home;
