import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import TiltCard from '../components/TiltCard';
import useIsMobile from '../hooks/useIsMobile';

const About = () => {
  const isMobile = useIsMobile();
  const MotionDiv = isMobile ? 'div' : motion.div;
  const MotionImg = isMobile ? 'img' : motion.img;

  const teamMembers = [
    {
      name: 'Kanchan Lakhani',
      position: 'Founder & Chief Brand Strategist',
      bio: 'The brain behind Digital Saga – turning ideas into powerful brand stories and strategies.'
    },
        {
      name: 'Deepak Bhatt',
      position: 'Chief Techical Officer (CTO)',
      bio: 'Designing stunning, high-performance websites that bring brands to life.'
    },
    {
      name: 'Meghna Sharma',
      position: 'Head of Social Strategy & Content',
      bio: 'Leads our social media magic – creating scroll-stopping content and engaging communities.'
    },

    {
      name: 'Chetna Sharma',
      position: 'Creative Operations Specialist',
      bio: 'Ensuring smooth execution of ideas with flawless editing and creative precision.'
    }
  ];

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="section bg-light" style={{ paddingTop: '120px' }}>
        <div className="container">
          <MotionDiv
            className="text-center"
            {...(!isMobile && {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6 }
            })}
          >
            <h1 className="display-4 fw-bold mb-4">About Digital Saga</h1>
            <p className="lead">
              We're a passionate team of digital marketing experts dedicated to transforming businesses through
              innovative strategies and creative solutions.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <MotionDiv
                {...(!isMobile && {
                  initial: { opacity: 0, x: -30 },
                  whileInView: { opacity: 1, x: 0 },
                  transition: { duration: 0.6 },
                  viewport: { once: true }
                })}
              >
                <h2 className="mb-4">Our Story</h2>
                <p className="mb-4">
                  Founded in 2020, Digital Saga began as a small team of digital marketing enthusiasts who believed
                  that every business deserves exceptional online presence. What started as a local agency has grown
                  into a trusted partner for companies worldwide.
                </p>
                <p className="mb-4">
                  Our mission is simple: to help businesses thrive in the digital landscape through innovative marketing
                  strategies, creative design, and data-driven insights.
                </p>
                <div className="row">
                  <div className="col-4 text-center">
                    <h3 className="text-primary">50+</h3>
                    <p className="small">Projects Completed</p>
                  </div>
                  <div className="col-4 text-center">
                    <h3 className="text-primary">20+</h3>
                    <p className="small">Happy Clients</p>
                  </div>
                  <div className="col-4 text-center">
                    <h3 className="text-primary">7</h3>
                    <p className="small">Years Experience</p>
                  </div>
                </div>
              </MotionDiv>
            </div>
            <div className="col-lg-6">
              <MotionImg
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Our team at work"
                className="img-fluid rounded-3 shadow-lg"
                {...(!isMobile && {
                  initial: { opacity: 0, x: 30 },
                  whileInView: { opacity: 1, x: 0 },
                  transition: { duration: 0.6, delay: 0.2 },
                  viewport: { once: true }
                })}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section bg-light">
        <div className="container">
          <MotionDiv
            className="section-title"
            {...(!isMobile && {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.6 },
              viewport: { once: true }
            })}
          >
            <h2 className="text-center mb-5">Meet Our Team</h2>
          </MotionDiv>
          <div className="row g-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <MotionDiv
                  {...(!isMobile && {
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: { duration: 0.6, delay: index * 0.1 },
                    viewport: { once: true }
                  })}
                >
                  {isMobile ? (
                    <div className="services-card text-center">
                      <i className="bi bi-person-fill rounded-circle mb-3 fs-2"></i>
                      <h5 className="mb-2">{member.name}</h5>
                      <p className="text-primary mb-3">{member.position}</p>
                      <p className="small">{member.bio}</p>
                    </div>
                  ) : (
                    <TiltCard intensity={20}>
                      <div className="services-card text-center">
                        <i className="bi bi-person-fill rounded-circle mb-3 fs-2"></i>
                        <h5 className="mb-2">{member.name}</h5>
                        <p className="text-primary mb-3">{member.position}</p>
                        <p className="small">{member.bio}</p>
                      </div>
                    </TiltCard>
                  )}
                </MotionDiv>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section">
        <div className="container">
          <MotionDiv
            className="section-title"
            {...(!isMobile && {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.6 },
              viewport: { once: true }
            })}
          >
            <h2 className="text-center mb-5 ">Our Values</h2>
          </MotionDiv>
          <div className="row g-4">
            {[
              {
                icon: 'fas fa-lightbulb',
                title: 'Creativity',
                text: 'We constantly explore creative ways and strategies to stay ahead of the digital competition.'
              },
              {
                icon: 'fas fa-handshake',
                title: 'Partnership',
                text: 'We believe in building long-term relationships based on trust and mutual success.'
              },
              {
                icon: 'fas fa-chart-line',
                title: 'Results',
                text: 'Everything we do is measured and optimized to deliver tangible business outcomes.'
              }
            ].map((value, index) => (
              <div key={index} className="col-lg-4">
                <MotionDiv
                  className="text-center"
                  {...(!isMobile && {
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: { duration: 0.6, delay: index * 0.1 },
                    viewport: { once: true }
                  })}
                >
                  <div className="service-icon mx-auto mb-3">
                    <i className={value.icon}></i>
                  </div>
                  <h4 className="mb-3">{value.title}</h4>
                  <p>{value.text}</p>
                </MotionDiv>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
