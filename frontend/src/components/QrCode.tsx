import QRCode from "react-qr-code";

type QRCodeModalProps = {
  link: string;
  onClose: () => void;
};

const QRCodeModal: React.FC<QRCodeModalProps> = ({ link, onClose }) => {
  return (
    <div className="fixed backdrop-blur-sm shadow-lg border border-white/50 inset-0 flex bg-white/80 items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* QR Code */}
        <QRCode value={link} size={200} />

        <p className="mt-4 text-center text-gray-700">
          Scan this QR to visit the link!
        </p>
      </div>
    </div>
  );
};

export default QRCodeModal;
