import About from "../components/About";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";
import Offer from "../components/Offer";
import PopularProducts from "../components/PopularProducts";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <PopularProducts />
      <Offer />
      <NewArrivals />
    </>
  );
};

export default Home;
