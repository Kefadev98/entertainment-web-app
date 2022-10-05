import ReactDom from "react-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const Modal = ({ setOpenModal }) => {
  const { logoutUser } = useContext(AuthContext);

  return ReactDom.createPortal(
    <div className="fixed inset-0 bg-[rgba(0,0,0,.6)] flex items-center justify-center z-10">
      <div className="w-[450px] h-[300px] bg-[#161D2F] rounded-2xl flex flex-col justify-around items-center">
        <div className="ml-10 text-[#cbd4df] w-4/5 text-xl">
          <p>Are you sure you want to logout?</p>
        </div>
        <div className="w-[100%] mx-9 flex justify-evenly">
          <button
            className="text-xl  w-[140px] h-[50px] bg-[#FC4747] rounded-md hover:bg-[#e22121] ease-in duration-200"
            onClick={logoutUser}
          >
            Logout
          </button>
          <button
            className="text-xl  w-[140px] h-[50px] bg-[#10141e] rounded-md hover:bg-[#282c36] ease-in duration-200"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
