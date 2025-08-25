import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Copy, QrCode, Trash2 } from "lucide-react";
import QRCodeModal from "../components/QrCode";
import DeleteUrlModal from "../components/DeleteUrlModal";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";

interface Url {
  id: number;
  originalUrl: string;
  shortenCode: string;
  createdAt: string;
  createdBy: string;
  timesVisited: number;
}

function AllUrlPage() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showQR, setShowQR] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>();
  const [link, setLink] = useState("");

  const baseUrl = import.meta.env.VITE_API_URL + "v1/urls/";

  const copyText = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Successfully copied short link", {
      theme: "light",
      autoClose: 2000,
    });
  };
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        setUrls(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUrls();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center p-6">
        <span className="loading loading-spinner"></span>
      </div>
    );
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <Navbar />
        <div className="m-7 flex-grow flex items-center justify-center">
          <div className="overflow-x-auto rounded-box border  bg-base-100">
            <table className="table ">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Short Link </th>
                  <th>Original Link </th>
                  <th>QR Code </th>
                  <th>Clicks</th>
                  <th>Status </th>
                  <th>
                    <div className="flex justify-center"> Date </div>
                  </th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {urls.map((url, index) => {
                  return (
                    <tr className="hover:bg-base-200">
                      <th>{index + 1}</th>
                      <td className="flex gap-3 items-center">
                        <a
                          href={baseUrl + url.shortenCode}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="underline hover:text-blue-600"
                        >
                          {baseUrl + url.shortenCode}{" "}
                        </a>
                        <Copy
                          onClick={() => copyText(baseUrl + url.shortenCode)}
                          className="w-4 h-4 hover:text-green-500 cursor-pointer"
                        />
                      </td>
                      <td>{url.originalUrl}</td>
                      <td>
                        <QrCode
                          onClick={() => {
                            setLink(baseUrl + url.shortenCode);
                            setShowQR(true);
                          }}
                        />
                      </td>
                      <td> {url.timesVisited} </td>
                      <td> Active </td>
                      <td>
                        <div className="flex justify-center">
                          {url.createdAt}
                        </div>
                      </td>
                      <td className="flex justify-center items-center">
                        <Trash2
                          onClick={() => {
                            setShowDelete(true);
                            setDeleteId(url.id);
                          }}
                          className="w-4 h-4 cursor-pointer hover:text-red-700 hover:scale-110 transition-transform duration-200 ease-out"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {showQR && <QRCodeModal link={link} onClose={() => setShowQR(false)} />}
        {showDelete && (
          <DeleteUrlModal
            deleteId={deleteId}
            onClose={() => setShowDelete(false)}
          />
        )}
        <Footer />
      </div>
    </>
  );
}

export default AllUrlPage;
