import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProperty } from '@/context/PropertyContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useProperty();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Plots', path: '/plots' },
    { name: 'Rental Houses', path: '/rentals' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="VR Land Developers and Infrastructure"
              className="h-10 w-auto object-contain"
            />
            <span className="text-xl sm:text-2xl font-heading font-bold gradient-text leading-tight">
              VR Land Developers <span className="hidden sm:inline">and Infrastructure</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary ${
                  isActive(link.path) ? 'text-primary' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Admin Button */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/admin">
                  <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                    Dashboard
                  </Button>
                </Link>
                <Button onClick={handleLogout} variant="ghost" className="text-muted-foreground hover:text-white">
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/admin/login">
                <Button className="btn-gradient px-6">
                  Admin Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-primary py-2 ${
                    isActive(link.path) ? 'text-primary' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link to="/admin" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10">
                      Dashboard
                    </Button>
                  </Link>
                  <Button onClick={handleLogout} variant="ghost" className="w-full text-muted-foreground hover:text-white">
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/admin/login" onClick={() => setIsOpen(false)}>
                  <Button className="btn-gradient w-full">
                    Admin Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
