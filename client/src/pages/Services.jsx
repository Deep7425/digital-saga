import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const services = [
    {
      icon: 'fas fa-envelope',
      title: 'Web & App Development',
      description: 'Development using latest technologies which makes website or application much more dynamic and interactive.',
      features: ['SEO friendly', 'Interactive design', 'Responsive', 'Dynamic', 'Analytics and tracking', 'Fast Loading Speed']
    },
    {
      icon: 'fas fa-search',
      title: 'SEO Optimization',
      description: 'Boost your search engine rankings and drive organic traffic with our comprehensive SEO strategies.',
      features: ['Keyword Research', 'On-Page Optimization', 'Technical SEO', 'Link Building', 'Local SEO', 'SEO Audits']
    },
    {
      icon: 'fas fa-bullhorn',
      title: 'Social Media Marketing',
      description: 'Engage your audience and build brand awareness across all major social media platforms.',
      features: ['Content Strategy', 'Community Management', 'Paid Advertising', 'Influencer Marketing', 'Analytics & Reporting', 'Brand Monitoring']
    },
    {
      icon: 'fas fa-paint-brush',
      title: 'Brand Design',
      description: 'Create a memorable brand identity that resonates with your target audience and stands out from the competition.',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Marketing Materials', 'Website Design', 'Brand Strategy']
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Google and Facebook Ads',
      description: 'Run smart ads on Google, Instagram & Facebook to get instant visibility, leads, and sales. We manage everything — from setup to results.',
      features: ['Audience & keyword targeting', 'Creative ad copy and visuals', 'Campaign setup', 'A/B testing & daily optimization', 'Performance tracking & reports']
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile Marketing',
      description: 'Reach your customers on-the-go with targeted mobile marketing campaigns and responsive design.',
      features: ['Mobile App Marketing', 'SMS Campaigns', 'Mobile Advertising', 'App Store Optimization', 'Push Notifications', 'Mobile Analytics']
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />

      {/* Hero Section */}
      <section className="section bg-light" style={{ paddingTop: '120px' }}>
        <div className="container ">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="display-4 fw-bold mb-4">Our Services</h1>
            <p className="lead">Comprehensive digital marketing solutions designed to grow your business and maximize your online presence.</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="row g-4">
            {services.map((service, index) => (
              <div key={index} className="col-lg-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="services-card"
                    onClick={() => setSelectedService(service)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="service-icon-small">
                      <i className={service.icon}></i>
                    </div>
                    <h5 className="mb-2 fs-3">{service.title}</h5>
                    <p className="text-muted small mb-3 fs-5">{service.description.substring(0, 80)}...</p>
                    <motion.button
                      className="btn btn-sm btn-outline-primary"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: 'hsla(266, 90%, 44%, 1.00)',
                        color: '#fff'
                      }}
                      style={{
                        borderColor: 'hsla(266, 90%, 44%, 1.00)',
                        color: 'hsla(266, 90%, 44%, 1.00)',
                        fontWeight: '600'

                      }}
                    >
                      View Details
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-light">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Process
          </motion.h2>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="service-icon mx-auto">
                  <span className="fw-bold fs-3">1</span>
                </div>
                <h5 className="mb-3">Discovery</h5>
                <p>We analyze your business, audience, and competition to understand your unique needs.</p>
              </motion.div>
            </div>
            <div className="col-lg-3 col-md-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="service-icon mx-auto">
                  <span className="fw-bold fs-3">2</span>
                </div>
                <h5 className="mb-3">Strategy</h5>
                <p>We create a customized digital marketing strategy tailored to your goals and budget.</p>
              </motion.div>
            </div>
            <div className="col-lg-3 col-md-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="service-icon mx-auto">
                  <span className="fw-bold fs-3">3</span>
                </div>
                <h5 className="mb-3">Implementation</h5>
                <p>Our experts execute the strategy with precision and attention to detail.</p>
              </motion.div>
            </div>
            <div className="col-lg-3 col-md-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="service-icon mx-auto">
                  <span className="fw-bold fs-3">4</span>
                </div>
                <h5 className="mb-3">Optimization</h5>
                <p>We continuously monitor and optimize campaigns for maximum performance.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">Ready to Get Started?</h2>
            <p className="lead mb-4">Let's discuss how we can help grow your business with our digital marketing services.</p>
            <motion.a
              href="/contact"
              className="btn btn-primary-custom btn-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Free Consultation
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
            }}
            onClick={() => setSelectedService(null)}
          >
            {/* Blur Overlay */}
            <motion.div
              className="service-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(10px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
              }}
            />

            {/* Service Detail Card */}
            <motion.div
              className="service-detail-modal"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
                opacity: { duration: 0.3 },
              }}
              onClick={(e) => e.stopPropagation()} // prevent modal click from closing
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '3rem',
                maxWidth: '800px',
                width: '90%',
                maxHeight: '80vh',
                overflowY: 'auto',
                zIndex: 10000,
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="service-icon mb-3">
                  <i className={selectedService.icon}></i>
                </div>
                <button
                  className="btn-close"
                  onClick={() => setSelectedService(null)}
                  style={{ fontSize: '1.2rem' }}
                ></button>
              </div>

              <h2 className="mb-4" style={{ color: 'hsl(249, 83%, 63%)' }}>
                {selectedService.title}
              </h2>

              <p className="mb-4 fs-5">{selectedService.description}</p>

              <div className="row">
                <div className="col-md-6">
                  <h5 className="mb-3">What's Included:</h5>
                  <ul className="list-unstyled">
                    {selectedService.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="mb-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <i className="fas fa-check-circle me-2" style={{ color: 'hsl(249, 83%, 63%)' }}></i>
                        <strong>{feature}</strong>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5 className="mb-3">Why Choose This Service?</h5>
                  <div className="bg-light p-3 rounded-3">
                    <p className="mb-3">Our expert team delivers:</p>
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <i className="fas fa-star me-2" style={{ color: 'hsl(158, 64%, 52%)' }}></i>
                        Industry-leading expertise
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-star me-2" style={{ color: 'hsl(158, 64%, 52%)' }}></i>
                        Proven track record
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-star me-2" style={{ color: 'hsl(158, 64%, 52%)' }}></i>
                        Presence across Google, YouTube, Instagram & Facebook
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <motion.button
                  className="btn btn-primary-custom btn-lg me-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href="/contact" className='nav-linkk'>
                    Get Started Now
                  </a>
              </motion.button>

              <motion.button
                className="btn btn-outline-secondary btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedService(null)}
              >
                Close
              </motion.button>
          </div>
            </motion.div>
          </div >
        )}
      </AnimatePresence >


  <Footer />
    </motion.div >
  );
};

export default Services;
