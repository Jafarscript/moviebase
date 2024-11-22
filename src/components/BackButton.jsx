import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  // const location = useLocation()

  return (
    <button
      onClick={() => navigate(-1)}
      className="text-[#099268] text-base hover:bg-[#099268] hover:text-white border-[#099268] px-5 py-1 border rounded-md flex items-center justify-center gap-2 font-medium"
    >
      <MdArrowBackIosNew className="text-xs" /> Back
    </button>
  );
};

export default BackButton;
