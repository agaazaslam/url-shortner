import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DeleteUrlModal = ({ onClose, deleteId }) => {
  const baseUrl = import.meta.env.VITE_API_URL;

  const deleteUrl = async (deleteId: number) => {
    try {
      const response = await axios.delete(baseUrl + deleteId);
      toast.success(response.data.message || "url was deleted ");
    } catch (error) {
      console.log(error);
      toast.error("The URL could not be deleted ");
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed backdrop-blur-sm shadow-lg border border-white/50 inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2  text-gray-500 hover:text-red-800"
        >
          ✕
        </button>
        <p className="mt-4 text-center text-gray-700">
          Are you sure you want to Delete this Url
        </p>
        <div className="flex gap-5 p-4 mx-10">
          <button onClick={onClose} className="btn btn-secondary">
            {" "}
            Cancel
          </button>
          <button
            onClick={() => deleteUrl(deleteId)}
            className="btn btn-error text-white"
          >
            {" "}
            Delete{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUrlModal;
