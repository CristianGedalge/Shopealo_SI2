/* diseño pincipál */
/* se usara outlet  .. es para las otras paguinas quye estaran heredaran esta este principal diseño que obtenemos y por eso mismo   */
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import {Footer} from '../components/ui/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Sidebar } from '../components/ui/Sidebar';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const MainLayout = ({numCartItems}) => {

  const { roleId } = useContext(AuthContext);
  if (roleId === 1) return null; // Oculta todo para ADMIN
  return (
    <>
    <Navbar numCartItems={numCartItems}/>

    <ToastContainer />
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Outlet />
      </main>
    <Footer/>

    </>
  )
}
