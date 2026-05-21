import { Menu, X, Leaf } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ toggleTheme }) {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const links = ['/', '/about', '/chatbot', '/contact'];
  return <nav className="glass sticky top-0 z-50 p-3"><div className="max-w-6xl mx-auto flex items-center justify-between"><Link to='/' className='flex items-center gap-2 font-bold'><Leaf />Prakriti</Link><button className='md:hidden' onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><div className={`${open?'block':'hidden'} md:flex gap-3 items-center`}>
    {links.map((l)=><NavLink key={l} to={l} className='px-2 py-1'>{l==='/'?'Home':l.slice(1)}</NavLink>)}
    <button onClick={toggleTheme} className='px-3 py-1 rounded bg-emerald-600 text-white'>Theme</button>
    {isAuthenticated?<button onClick={logout}>Logout</button>:<NavLink to='/auth'>Login</NavLink>}
  </div></div></nav>;
}
