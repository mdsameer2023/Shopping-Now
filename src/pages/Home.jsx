import Hero from "../components/Hero/Hero";
import Products from "../components/Products/Products";
import TopProducts from "../components/TopProducts/TopProducts";
import Banner from "../components/Banner/Banner";
import Subscribe from "../components/Subscribe/Subscribe";
import Testimonials from "../components/Testimonials/Testimonials";

const Home = ({ handleOrderPopup }) => {
  return (
    <>
      <div className="space-y-10">
        <Hero />
        <Products />
        <TopProducts />
        <Banner />
        <Subscribe />
        <Testimonials />
      </div>
    </>
  );
};

export default Home;
