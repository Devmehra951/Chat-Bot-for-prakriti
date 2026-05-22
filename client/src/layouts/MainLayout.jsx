import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout({children, toggleTheme}) { return <div><Navbar toggleTheme={toggleTheme} /><main className='max-w-6xl mx-auto p-4'>{children}</main><Footer/></div>; }
