import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ChatbotPage from '../pages/ChatbotPage';
import ContactPage from '../pages/ContactPage';
import AuthPage from '../pages/AuthPage';

export default function AppRoutes(){return <Routes><Route path='/' element={<HomePage/>}/><Route path='/about' element={<AboutPage/>}/><Route path='/chatbot' element={<ChatbotPage/>}/><Route path='/contact' element={<ContactPage/>}/><Route path='/auth' element={<AuthPage/>}/></Routes>;}
