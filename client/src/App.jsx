import { useEffect, useState } from 'react';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/AppRoutes';

export default function App(){const [dark,setDark]=useState(localStorage.getItem('theme')==='dark');useEffect(()=>{document.documentElement.classList.toggle('dark',dark);localStorage.setItem('theme',dark?'dark':'light');},[dark]);return <MainLayout toggleTheme={()=>setDark(!dark)}><AppRoutes/></MainLayout>;}
