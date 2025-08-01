import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = ({ isHomePage = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ email: '', phone: '', message: '' });
    }
  };

  const sectionClass = isHomePage ? 'section' : 'section mt-5';

  return (
    <section className={sectionClass}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <motion.div 
              className="contact-form"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
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
                  {!isHomePage && (
                    <div className="col-12">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea 
                        className="form-control" 
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5" 
                        placeholder="Tell us about your project..."
                      ></textarea>
                    </div>
                  )}
                  <div className="col-12 text-center">
                    <motion.button 
                      type="submit" 
                      className="btn"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor:'hsla(288, 88%, 19%, 1.00)',
                        color:'#fff',
                        boxShadow:'0px 2px 10px black'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send Message 
                    </motion.button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
