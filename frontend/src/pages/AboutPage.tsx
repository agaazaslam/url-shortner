import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center ">
        <p>About Page</p>{" "}
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
