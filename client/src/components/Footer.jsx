import { motion } from 'framer-motion';
import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h5 className='footer-head'><img src="/images/logo.png" alt="" className='logo'/>Digital Saga</h5>
              <p>Transforming businesses through innovative digital marketing strategies and creative solutions.</p>
              <div className="social-links">
                <a href="https://www.linkedin.com/company/the-digital-saga/ " className="me-3"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://www.instagram.com/digital.saga.in?igsh=ZG91dHcwdXR2M3hu " className="me-3"><i className="fab fa-instagram"></i></a>
              </div>
            </motion.div>
          </div>
          <div className="col-lg-4 mb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h5>Services</h5>
              <ul className="list-unstyled">
                <li><Link href="/services">Web & App Development</Link></li>
                <li><Link href="/services">SEO Optimization</Link></li>
                <li><Link href="/services">Social Media Marketing</Link></li>
                <li><Link href="/services">Brand Design</Link></li>
                
                
              </ul>
            </motion.div>
          </div>
          <div className="col-lg-4 mb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h5>Contact Info</h5>
              <p><i className="fas fa-envelope me-2"></i>info.thedigitalsaga@gmail.com</p>
              <p><i className="fas fa-phone me-2"></i> +91 9772419541</p>
              <p><i className="fas fa-map-marker-alt me-2"></i>Operating Remotely.</p>
            </motion.div>
          </div>
        </div>
        <hr className="my-4" />
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2025 Digital Saga. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
