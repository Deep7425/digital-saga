'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import PortfolioSection from '../components/portfolio-section';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <Hero />

      {/* About Section */}
      <section className="section bg-light">
        <div className="container">
          {/* Heading - only opacity animation for mobile */}
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About Digital Saga
          </motion.h2>

          <div className="row align-items-center">
            <div className="col-lg-6">
              {isMobile ? (
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Digital marketing team collaborating"
                  className="img-fluid rounded-3 shadow-lg"
                />
              ) : (
                <motion.img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Digital marketing team collaborating"
                  className="img-fluid rounded-3 shadow-lg"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                />
              )}
            </div>

            <div className="col-lg-6 mt-4 mt-lg-0">
              {isMobile ? (
                <div className='homeAbout'>
                  <h3 className="mb-4">Leading Digital Innovation Since 2020</h3>
                  <p className="mb-4">
                    Digital Saga is a cutting-edge digital marketing agency that specializes in creating compelling online experiences. Our team of creative professionals combines strategic thinking with innovative technology to deliver exceptional results for our clients.
                  </p>
                  <div className="row">
                    <div className="col-6">
                      <div className="text-center">
                        <h4 className="text-primary mb-2" style={{ color: 'hsla(251, 75%, 39%, 1.00)' }}>50+</h4>
                        <p>Projects Completed</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-center">
                        <h4 className="text-primary mb-2" style={{ color: 'hsla(251, 75%, 39%, 1.00)' }}>20+</h4>
                        <p>Happy Clients</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="mb-4">Leading Digital Innovation Since 2020</h3>
                  <p className="mb-4">
                    Digital Saga is a cutting-edge digital marketing agency that specializes in creating compelling online experiences. Our team of creative professionals combines strategic thinking with innovative technology to deliver exceptional results for our clients.
                  </p>
                  <div className="row">
                    <div className="col-6">
                      <div className="text-center">
                        <h4 className="text-primary mb-2" style={{ color: 'hsla(251, 75%, 39%, 1.00)' }}>50+</h4>
                        <p>Projects Completed</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-center">
                        <h4 className="text-primary mb-2" style={{ color: 'hsla(251, 75%, 39%, 1.00)' }}>20+</h4>
                        <p>Happy Clients</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Services />
      <PortfolioSection />
      <Contact isHomePage={true} />
      <Footer />
    </motion.div>
  );
};

export default Home;
