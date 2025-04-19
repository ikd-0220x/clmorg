import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SiteBar from '../components/SiteBar';
import Footer from '../components/Footer';

export default function AppLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const sidebarRef = useRef(null);

    useEffect(() => {
        if (window.innerWidth < 700) {
            setIsSidebarOpen(false);
        }
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    const handleOutsideClick = (event) => {
        if (
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target) &&
            isSidebarOpen &&
            window.innerWidth < 700 // optional: faqat kichik ekranlarda
        ) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isSidebarOpen]);

    return (
        
        <div className="flex h-screen overflow-hidden">
            {isSidebarOpen && <SiteBar ref={sidebarRef} />}
            <div className="flex flex-col w-full">
                <Navbar toggleSidebar={toggleSidebar} />
                <div className="h-[90vh] overflow-y-scroll">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    );
}
