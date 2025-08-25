import React, { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type UrlInputBoxProps = {
  setShortUrl: React.Dispatch<React.SetStateAction<string>>;
};

const UrlInputBox: React.FC<UrlInputBoxProps> = ({ setShortUrl }) => {
  const [url, setUrl] = useState<string>("");
  const getUrl = import.meta.env.VITE_API_URL;
  const baseUrl = `${getUrl}v1/urls/`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      new URL(url); // throws if invalid

      const data = {
        originalUrl: url,
        createdBy: "Agaaz Aslam",
      };

      const response = await axios.post(baseUrl, data);

      console.log(response.data.url);
      const shortCode = response.data.url.shortenCode;
      const currentshortUrl = baseUrl + shortCode;
      setShortUrl(currentshortUrl);

      toast.success("Url submitted successfully ", {
        theme: "dark",
        autoClose: 3000,
      });
    } catch {
      toast.error("Write a valid Url ", {
        theme: "dark",
        autoClose: 3000,
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex items-center gap-2">
      <label htmlFor="urlInput" className="font-medium">
        Enter a URL:
      </label>
      <div>
        <input
          type="url"
          id="urlInput"
          placeholder="https://example.com"
          value={url}
          onChange={handleChange}
          className="border p-2 w-2xl rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="btn btn-neutral rounded-r-0 rounded-r-md p-4"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UrlInputBox;
