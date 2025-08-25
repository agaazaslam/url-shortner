import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UrlInputBox from "../components/UrlInputBox";
import { useState } from "react";

function ShortenPage() {
  const [shortUrl, setShortUrl] = useState("");

  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <UrlInputBox setShortUrl={setShortUrl} />

          {shortUrl && <div>Shortened URL: {shortUrl}</div>}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ShortenPage;
