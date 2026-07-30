import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { apiUrl } from '../lib/api';
import TiltCard from './TiltCard';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch(apiUrl('/api/services'));
        const data = await res.json().catch(() => []);
        if (!res.ok || !Array.isArray(data)) return;
        if (!ignore) setServices(data);
      } catch {
        // keep empty state if API unavailable
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Services
        </motion.h2>
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={service.id} className="col-lg-4 col-md-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TiltCard intensity={16}>
                  <div className="services-card">
                    <div className="service-icon">
                      <i className={service.icon || 'fas fa-star'}></i>
                    </div>
                    <h4 className="mb-3">{service.title}</h4>
                    <p className="mb-4">{service.description}</p>
                    <div className="mt-auto">
                      <Link href="/services">
                        <motion.button 
                          className="btn btn-outline-primary w-100"
                          whileHover={{
                            scale: 1.05,
                            boxShadow:'0px 2px 7px gray'
                          }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            borderColor: 'hsl(249, 83%, 63%)',
                            color: '#fff',
                            fontWeight: '600',
                            backgroundColor: 'hsl(249, 83%, 63%)'
                          }}
                        >
                          Learn More
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
