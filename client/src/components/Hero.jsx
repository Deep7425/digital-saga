import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useIsMobile, useMousePosition } from '../hooks/useMousePosition';

const Hero = () => {
  const mousePosition = useMousePosition();
  const isMobile = useIsMobile();

  const gradientStyle = !isMobile ? {
    '--mouse-x': `${(mousePosition.x / window.innerWidth) * 100}%`,
    '--mouse-y': `${(mousePosition.y / window.innerHeight) * 100}%`
  } : {};

  return (
    <section className="hero-section">
      {!isMobile && (
        <motion.div 
          className="gradient-bg"
          style={gradientStyle}
          animate={{
            background: `radial-gradient(circle 300px at ${(mousePosition.x / window.innerWidth) * 100}% ${(mousePosition.y / window.innerHeight) * 100}%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)`
          }}
          transition={{ type: "tween", ease: "linear", duration: 0.1 }}
        />
      )}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <motion.div 
              className="hero-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Building Brands, <br />
                <span className="gradient-text">
                One Pixel At A Time.
                </span>
              </motion.h1>
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Experience the future of digital marketing with our innovative solutions. Our expert team helps you build stunning, high-converting campaigns that turn visitors into customers.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link href="/contact">
                  <motion.button 
                    className="btn btn-primary-custom btn-lg mt-4"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 15px 40px hsla(249, 83%, 63%, 0.5)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'linear-gradient(135deg, hsla(236, 68%, 44%, 1.00) 0%, hsla(288, 69%, 69%, 1.00) 50%, hsl(158, 64%, 52%) 100%)',
                      backgroundSize: '200% 200%',
                      animation: 'gradientShift 3s ease infinite'
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    Get Started Today
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
