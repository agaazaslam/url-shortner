import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
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

export default App;
