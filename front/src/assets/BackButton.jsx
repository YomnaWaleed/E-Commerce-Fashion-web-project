import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button 
      onClick={() => navigate(-1)}
      className="flex items-center text-blue-600 hover:text-blue-800"
    >
      ← Back
    </button>
  );
}