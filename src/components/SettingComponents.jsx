/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

const SettingsModal = ({setOpenSettings }) => {
    const { darkTheme, toogleTheme } = useContext(GlobalContext);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold dark:text-white">Settings</h2>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-200">Dark Mode</span>
          <button
            onClick={toogleTheme}
            className={`w-12 h-6 rounded-full flex items-center ${darkTheme ? "bg-[#099268]" : "bg-gray-300"} p-1`}
          >
            <div className={`h-5 w-5 bg-white rounded-full transition-transform ${darkTheme ? "translate-x-5" : ""}`} />
          </button>
        </div>
        <button
          onClick={() => setOpenSettings(false)}
          className="mt-6 text-green-700 text-base hover:bg-green-700 hover:text-white border border-green-700 px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
