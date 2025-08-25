import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
function HomePage() {
  const notify = () =>
    toast.success("Successfully submitted the URL ", {
      theme: "dark",
      autoClose: 3000,
    });

  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <h1 className="text-5xl">Home Page </h1>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
