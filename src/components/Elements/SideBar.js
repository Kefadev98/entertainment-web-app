import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";

const SideBar = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <aside className="fixed flex flex-col items-center justify-between left-10 h-[90%] w-[86px] m-0 bg-[#161D2F] rounded-2xl">
      <div className="flex flex-col items-center mt-10">
        <img src="./assets/logo.svg" alt="logo" className="w-8 h-7 mb-20" />
        <div className="w-[20px] h-[200px] flex flex-col justify-around">
          <NavLink
            to="/homepage"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src="./assets/icon-nav-home.svg" alt="logo" />
          </NavLink>
          <NavLink
            to="/moviepage"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src="./assets/icon-nav-movies.svg" alt="logo" />
          </NavLink>
          <NavLink
            to="/showspage"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src="./assets/icon-nav-tv-series.svg" alt="logo" />
          </NavLink>
          <NavLink
            to="/bookmarkpage"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src="./assets/icon-nav-bookmark.svg" alt="logo" />
          </NavLink>
        </div>
      </div>

      <div className="mb-10 flex flex-col items-center">
        <img
          src="./assets/image-avatar.png"
          alt="/"
          className="w-12 h-12 mb-10 border-white border-2 rounded-3xl"
        ></img>

        <img
          src="./assets/logout.png"
          alt="/"
          className="w-12 h-12 border-white border-2 rounded-3xl cursor-pointer"
          onClick={() => setOpenModal(true)}
        ></img>
      </div>
      {openModal && <Modal setOpenModal={setOpenModal} />}
    </aside>
  );
};

export default SideBar;
