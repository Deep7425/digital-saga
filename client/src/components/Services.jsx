import { motion } from 'framer-motion';
import { Link } from 'wouter';
import TiltCard from './TiltCard';

const Services = () => {
  const services = [
    {
      icon: 'fas fa-envelope',
      title: 'Web & App Development',
      description: 'Development using latest technologies which makes website or application much more dynamic and interactive.'
    },
    {
      icon: 'fas fa-search',
      title: 'SEO Optimization',
      description: 'Boost your search engine rankings and drive organic traffic with our comprehensive SEO strategies.'
    },
    {
      icon: 'fas fa-bullhorn',
      title: 'Social Media Marketing',
      description: 'Engage your audience and build brand awareness across all major social media platforms.'
    },
    {
      icon: 'fas fa-paint-brush',
      title: 'Brand Design',
      description: 'Create a memorable brand identity that resonates with your target audience and stands out from the competition.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Google and Facebook Ads',
      description: 'Run smart ads on Google, Instagram & Facebook to get instant visibility, leads, and sales.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile Marketing',
      description: 'Reach your customers on-the-go with targeted mobile marketing campaigns and responsive design.'
    }
  ];

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
            <div key={index} className="col-lg-4 col-md-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TiltCard intensity={16}>
                  <div className="services-card">
                    <div className="service-icon">
                      <i className={service.icon}></i>
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
                            borderColor: 'hsla(261, 79%, 28%, 1.00)',
                            color: '#fff',
                            fontWeight: '600',
                            backgroundColor: 'hsla(261, 79%, 28%, 1.00)'
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
