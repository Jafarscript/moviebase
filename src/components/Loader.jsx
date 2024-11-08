
import { TfiReload } from "react-icons/tfi";



// eslint-disable-next-line react/prop-types
const Loader = ({error}) => {
  return (
    <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[50vh]">
      <TfiReload className="text-green-500 text-4xl animate-spin" />
      Loading.... Please wait
      <p>{error}</p>
    </div>
  );
};

export default Loader;
