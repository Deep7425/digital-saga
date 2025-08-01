import { motion } from 'framer-motion';
import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        alert('Thank you for your message! We will get back to you within 24 hours.');
        setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
        setIsSubmitting(false);
        console.log(formData)
        navigate('/');
      }, 2000);
    }
  };

  return (
    <div>
      <Navbar className='container'/>

      {/* Hero Section */}
      <section className="section bg-light" style={{ paddingTop: '120px' }}>
        <div className="container">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">Get In Touch</h1>
            <p className="lead">Ready to transform your digital presence? Let's start a conversation about your goals and how we can help achieve them.</p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="contact-form">
                <h3 className="mb-4">Send Us a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Full Name *</label>
                      <input 
                        type="text" 
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input 
                        type="email" 
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">Phone Number *</label>
                      <input 
                        type="tel" 
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required 
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="company" className="form-label">Company Name</label>
                      <input 
                        type="text" 
                        className="form-control"
                        id="company" 
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="service" className="form-label">Service Interest</label>
                      <select 
                        className="form-control"
                        id="service" 
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="">Select a service (optional)</option>
                        <option value="web">Web & App Development</option>
                        <option value="ai">AI Services & Chatbot</option>
                        <option value="seo">SEO Optimization</option>
                        <option value="social">Social Media Marketing</option>
                        <option value="design">Brand Design</option>
                        <option value="analytics">Analytics & Reporting</option>
                        <option value="mobile">Mobile Marketing</option>
                        <option value="email">Email Marketing</option>
                        <option value="consultation">General Consultation</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label htmlFor="message" className="form-label">Message *</label>
                      <textarea 
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="6" 
                        placeholder="Tell us about your project, goals, and how we can help..."
                        required
                      ></textarea>
                      {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </div>
                    <div className="col-12">
                      <motion.button 
                        type="submit" 
                        className="btn btn-primary-custom btn-lg"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </motion.button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-4">
              <div>
                <h3 className="mb-4">Contact Information</h3>
                <div className="mb-4">
                  <h6 className="mb-2"><i className="fas fa-envelope me-2" style={{ color: 'hsla(269, 76%, 35%, 1.00)' }}></i>Email</h6>
                  <p className="mb-0">info.thedigitalsaga@gmail.com</p>
                  <p className="text-muted small">We respond within 24 hours</p>
                </div>
                <div className="mb-4">
                  <h6 className="mb-2"><i className="fas fa-phone me-2" style={{ color: 'hsla(269, 76%, 35%, 1.00)' }}></i>Phone</h6>
                  <p className="mb-0">+91 9772419541 </p>
                </div>
                <div className="mb-4">
                  <h6 className="mb-2"><i className="fas fa-map-marker-alt me-2" style={{ color: 'hsla(269, 76%, 35%, 1.00)' }}></i>Address</h6>
                  <p className="mb-0">Operating all over country remotely</p>
                </div>
                <div className="mb-4">
                  <h6 className="mb-3">Follow Us</h6>
                  <div className="d-flex gap-3">
                    <a href="https://www.linkedin.com/company/the-digital-saga/" className="text-decoration-none">
                      <i className="fab fa-linkedin-in fa-lg" style={{ color: 'hsla(269, 76%, 35%, 1.00)' }}></i>
                    </a>
                    <a href="https://www.instagram.com/digital.saga.in?igsh=ZG91dHcwdXR2M3hu" className="text-decoration-none">
                      <i className="fab fa-instagram fa-lg" style={{ color: 'hsla(269, 76%, 35%, 1.00)' }}></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
