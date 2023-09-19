import React, { useState } from "react";

import LightModeIcon from '@mui/icons-material/LightMode';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";

import Menu from "./Portals/Menu";

export default function NavTopContent ({ userId }) {
    const [ showMenu, setShowMenu ] = useState(false);
    function closeMenuHandle () {
        setShowMenu(false)
    }

    function openMenuHandle () {
        setShowMenu(true)
    }


    return (
        <div className="flex flex-row h-full w-full sm:py-3 py-1 justify-evenly items-center">
            <Menu onClose={closeMenuHandle} open={showMenu} userId={userId} />
            <div className="flex justify-center sm:w-1/4 w-1/5 sm:h-full h-3/4 my-auto text-var-3">
                <Link className="flex flex-row justify-center items-center lg:text-logoSizeLarge md:text-logoSizeMedium w-full" to="/" >
                    <div className="flex h-full w-fit sm:w-3/10 md:w-fit items-center">
                        <img className="w-full h-full object-cover p-1" src="images/logo.png" alt="jk-logo" />
                    </div>
                    <p className="sm:w-fit hidden md:block sm:pl-2 hover:text-var-3-hovered">Just Kittying!</p>
                </Link>
            </div>

            <div className="flex flex-row sm:w-1/3 w-3/5 sm:h-full h-3/4 my-auto bg-var-1 border-solid border-2 border-var-2 rounded-[20px] ">
                <input className=" w-full h-full outline-none pl-6 pr-4 rounded-input "/>
                <Link className="flex justify-center items-center" to="/searchresults">
                    <SearchIcon className="rounded-circular mx-2 py-1 hover:bg-var-2 hover:text-var-1 duration-200" fontSize="large"/>
                </Link>
            </div>

            <div className="flex justify-center sm:w-1/4 w-1/5 sm:h-full h-3/4 my-auto  text-var-3 ">
                <button className="hidden md:block hover:text-var-3-hovered " >
                    <LightModeIcon className="mx-4" fontSize="large" />
                </button>
                <Link className="justify-center items-center hidden md:flex hover:text-var-3-hovered " to="/myprofile">
                    <PersonIcon className="mx-4" fontSize="large" />
                </Link>
                <Link className="justify-center items-center hidden md:flex hover:text-var-3-hovered " to="/settings">
                    <SettingsIcon className="mx-4" fontSize="large" />
                </Link>
                <Link className="justify-center items-center hidden md:flex hover:text-var-3-hovered " state={{ user_id: userId }} to="/notifications">
                    <NotificationsIcon className="mx-4" fontSize="large" />
                </Link>
                <button className="mx-4 px-1 block md:hidden rounded-circular hover:bg-var-2 hover:text-var-1 duration-200 " onClick={openMenuHandle} >
                    <MenuOutlinedIcon fontSize="large" />
                </button>
            </div>
        </div>
    )
};