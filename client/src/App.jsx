import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import Services from './pages/Services';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Admin from './pages/Admin';

const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        <header className="px-6 py-4 bg-brand-black border-b border-gray-800 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
            <h1 className="text-2xl font-bold text-brand-yellow tracking-tighter cursor-pointer" onClick={() => window.location.href='/'}>GRUB & HUB</h1>
            <nav className="flex gap-8 items-center">
                <a href="/" className="hover:text-brand-yellow transition-colors font-medium">Home</a>
                <a href="/services" className="hover:text-brand-yellow transition-colors font-medium">Restaurants</a>
                <a href="/cart" className="hover:text-brand-yellow transition-colors font-medium">Cart</a>
                {user ? (
                    <div className="flex items-center gap-4">
                        {user.role === 'admin' && <a href="/admin" className="text-brand-purple font-bold hover:underline">Admin Panel</a>}
                        <span className="text-brand-white font-bold flex items-center gap-2"><User size={18}/> {user.name}</span>
                        <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors"><LogOut size={18}/></button>
                    </div>
                ) : (
                    <a href="/login" className="px-4 py-2 bg-brand-purple text-white rounded-full hover:bg-purple-600 transition-colors text-sm font-bold">Login</a>
                )}
            </nav>
        </header>
    );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-brand-black text-brand-white font-sans">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/services" element={<Services />} />
                <Route path="/menu/:id" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
