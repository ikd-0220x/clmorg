import React, { useState, useEffect } from "react";
import AvatarMenu from "./AvatarMenu";
import { LanguageSwitch } from "./LanguageSwitch";
import "../js/i18n";
import LogoutAdmin from "./LogOutAdmin";
import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        // localStorage'dan rolni olish
        const role = localStorage.getItem("role");
        if (role === "admin") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        navigate("/login"); 
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="bg-white p-4 shadow-sm w-full flex justify-between items-center border-b-2 border-blue-500 md:px-8">
            <button onClick={toggleSidebar} className="focus:outline-none h-8 w-8 md:none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
            </button>

            {/* Avatarni o‘ng tomonga joylash */}
            <div className="flex items-center gap-6 pr-16 md:gap-6 pr-8">
                <input type="checkbox" id="switch-mode" hidden />
                <label htmlFor="switch-mode" className="switch-mode"></label>
                <a href="#" className="profile">
                    {/* Agar admin bo'lsa, faqat Log Out modalini ko'rsat */}
                    {isAdmin ? (
                        <>
                            <button onClick={toggleModal} className="text-blue-500">
                                Log Out
                            </button>
                            {showModal && (
                                <LogoutAdmin onClose={toggleModal} onLogOut={handleLogOut} />
                            )}
                        </>
                    ) : (
                        <AvatarMenu />
                    )}
                </a>
                <LanguageSwitch />
            </div>
        </div>
    );
}
