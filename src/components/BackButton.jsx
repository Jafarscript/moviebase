import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate , useLocation } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const previousPage = location.state?.page || Number(sessionStorage.getItem("page")) || 1;

  return (
    <button
      onClick={() => navigate(-1, { state: { page: previousPage }, preventScrollReset: true })}
      className="text-[#099268] text-base hover:bg-[#099268] hover:text-white border-[#099268] px-5 py-1 border rounded-md flex items-center justify-center gap-2 font-medium"
    >
      <MdArrowBackIosNew className="text-xs" /> Back
    </button>
  );
};

export default BackButton;
