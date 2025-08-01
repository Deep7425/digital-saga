import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    document.body.style.overflow = !sidebarOpen ? 'hidden' : '';
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <motion.nav
        className={`navbar navbar-expand-lg navbar-custom fixed-top ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{
          y: 0,
          padding: isScrolled ? '0.5rem 0' : '1rem 0'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        id='navbarr'
      >
        <motion.div
          className="container"
          animate={{
            maxWidth: isScrolled ? '1000px' : '1320px',
            padding: isScrolled ? '0 2rem' : '0 1rem'
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Link href="/" className="navbar-brand fs-3 pt-2">
            <img src="images/logo.png" alt="logo" className='logo' />Digital Saga
          </Link>

          <button
            className="navbar-toggler d-lg-none border-0"
            type="button"
            onClick={toggleSidebar}
            style={{ background: 'none', boxShadow: 'none' }}
          >
            <i className="fas fa-bars" style={{ color: 'hsla(72, 83%, 63%, 1.00)' }}></i>
          </button>

          <div className="collapse navbar-collapse d-none d-lg-block">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/" className={`nav-link ${location === '/' ? 'active' : ''}`}>
                  <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Home
                  </motion.span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className={`nav-link ${location === '/about' ? 'active' : ''}`}>
                  <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    About
                  </motion.span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/services" className={`nav-link ${location === '/services' ? 'active' : ''}`}>
                  <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Services
                  </motion.span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className={`nav-link ${location === '/contact' ? 'active' : ''}`}>
                  <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Contact
                  </motion.span>
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="sidebar-overlay active"
            onClick={closeSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="sidebar"
        initial={{ x: 300 }}
        animate={{ x: sidebarOpen ? 0 : 300 }}
        exit={{ x: 300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="sideNavHead mb-0" style={{ color: 'white' }}>Digital Saga</h4>
          <button className="btn-close btn-close-white" onClick={closeSidebar}></button>
        </div>

        <ul className="sidebar-nav list-unstyled">
          <li>
            <Link href="/" onClick={closeSidebar}>
              <motion.span whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                Home
              </motion.span>
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={closeSidebar}>
              <motion.span whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                About
              </motion.span>
            </Link>
          </li>
          <li>
            <Link href="/services" onClick={closeSidebar}>
              <motion.span whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                Services
              </motion.span>
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={closeSidebar}>
              <motion.span whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                Contact
              </motion.span>
            </Link>
          </li>
        </ul>
      </motion.div>


    </>
  );
};

export default Navbar;
