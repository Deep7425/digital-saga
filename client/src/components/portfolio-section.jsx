'use client'
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function PortfolioSection() {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };
        if (!isMobile) {
            document.addEventListener('mousemove', handleMouseMove);
        }
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, [isMobile]);

    const scrollToTargetPosition = () => {
        const totalHeight = document.body.scrollHeight;
        const offset = window.innerHeight * 0.9; // 90% of viewport height
        window.scrollTo({
            top: totalHeight - offset,
            behavior: 'smooth',
        });
    };

    const portfolioItems = [
        {
            id: 1,
            clientName: "Jaipur Jazba",
            industry: "Content Strategy, Social Media Ads",
            result: "10,000+ Organic Followers within 2 Months",
            description: "We crafted a custom content strategy and ad funnel for Jaipur’s trendiest kurti brand. From concept to execution, every reel and post was designed to connect with Jaipur’s fashion-savvy audience.",
            image: "images/Jaipur-Jazba.png",
            color: "#08b5e9ff"
        },
        {
            id: 2,
            clientName: "Najin & Fatu",
            industry: "Website Design and Development",
            result: "A clean, educational platform for a cause-driven NGO.",
            description: "We designed and developed a responsive site highlighting their mission, projects, and adoption awareness.",
            image: "/images/NajinFatu.png",
            color: "#f993fbff"
        },
        {
            id: 3,
            clientName: "Mahanagar Times",
            industry: "Social Media Management, Visual Branding",
            result: "250% reach increase",
            description: "We handled end-to-end social media for one of Rajasthan’s renowned news publishers. From daily posting to interactive stories, we helped them modernize their digital voice.",
            image: "/images/MahanagarTimes.jpg",
            color: "#d4eb04ff"
        },
        {
            id: 4,
            clientName: "SEO Projects",
            industry: "On-page + Off-page SEO & Technical SEO",
            result: "Ranking That Speaks",
            description: "We’ve successfully executed SEO for multiple brands across different industries, increasing organic traffic and improving keyword rankings.",
            image: "images/SEO.jpg",
            color: "#fa709a"
        },
        {
            id: 5,
            clientName: "Engaging Video Edits",
            industry: "Trend-based Reels, Voiceover Edits, Social Ads",
            result: "Short, Smart, Scroll-Stopping, Increasing reach",
            description: "We specialize in creating compelling, thumb-stopping short videos that boost engagement. Each edit is designed for attention, storytelling, and conversion—perfect for reels, ads, and brand stories.",
            image: "/images/VideoEdits.png",
            color: "#a8edea"
        },
        {
            id: 6,
            clientName: "Graphic Designing",
            industry: "Visual Branding & Graphic Designing",
            result: "Crafted designs that speak your brand language.",
            description: "From scroll-stopping social media posts to campaign banners and print-ready creatives – we’ve designed visuals that not only look beautiful but drive results.",
            image: "/images/GraphicDesign.png",
            color: "#ffecd2"
        }
    ];

    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <section id="portfolio" className="py-5 text-white position-relative overflow-hidden" style={{ background: 'var(--dark-color)' }}>
            <div className="container-fluid" ref={sectionRef}>
                <motion.div
                    className="text-center mb-5"
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="h1 mb-4 text-white">Our Portfolio</h2>
                    <h3>Real Results. Meaningful Impact.</h3>
                    <p className="text-white-50 fs-5 mt-4">
                        We’ve partnered with diverse brands from growing startups to local legends to create stories that perform. <br />
                        Here's a glimpse into some of our proudest projects:
                    </p>
                </motion.div>

                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <motion.div
                            variants={listVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="portfolio-list"
                        >
                            {portfolioItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    variants={itemVariants}
                                    className="portfolio-list-item mb-4"
                                    onClick={scrollToTargetPosition}
                                    onMouseEnter={() => !isMobile && setHoveredItem(item.id)}
                                    onMouseLeave={() => !isMobile && setHoveredItem(null)}
                                    style={{
                                        backgroundColor: hoveredItem === item.id ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0)',
                                        padding: '2rem',
                                        borderRadius: '1rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div className="row align-items-center">
                                        <div className="col-md-8">
                                            <motion.div
                                                whileHover={!isMobile ? { x: 20 } : {}}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            >
                                                <div className="d-flex align-items-center mb-2">
                                                    <motion.div
                                                        className="me-3"
                                                        style={{
                                                            width: '60px',
                                                            height: '4px',
                                                            backgroundColor: item.color,
                                                            borderRadius: '2px'
                                                        }}
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: '60px' }}
                                                        transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                                                    />
                                                    <small className="text-white-50 text-uppercase fw-semibold">
                                                        {item.industry}
                                                    </small>
                                                </div>

                                                <motion.h3
                                                    className="h2 text-white mb-2 fw-bold"
                                                    whileHover={!isMobile ? { color: item.color } : {}}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {item.clientName}
                                                </motion.h3>

                                                <motion.p
                                                    className="text-white-50 mb-2"
                                                    initial={{ opacity: 0.7 }}
                                                    whileHover={!isMobile ? { opacity: 1 } : {}}
                                                >
                                                    {item.description}
                                                </motion.p>

                                                <motion.div
                                                    className="d-flex align-items-center"
                                                    whileHover={!isMobile ? { x: 10 } : {}}
                                                >
                                                    <i className="fas fa-chart-line me-2" style={{ color: item.color }}></i>
                                                    <strong className="text-white fs-5">{item.result}</strong>
                                                </motion.div>
                                            </motion.div>
                                        </div>

                                        <div className="col-md-4 text-end">
                                            <motion.i
                                                className="fas fa-arrow-right text-white-50 fs-3"
                                                whileHover={!isMobile ? {
                                                    x: 10,
                                                    color: item.color
                                                } : {}}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Cursor Following Image Preview - only for desktop */}
            {hoveredItem && !isMobile && (
                <motion.div
                    className="position-fixed"
                    style={{
                        left: cursorPosition.x + 20,
                        top: cursorPosition.y - 150,
                        zIndex: 1000,
                        pointerEvents: 'none',
                        width: '300px',
                        height: '200px'
                    }}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <motion.div
                        className="position-relative overflow-hidden rounded-4 shadow-lg"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        style={{
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(45deg, ${portfolioItems.find(item => item.id === hoveredItem)?.color}40, ${portfolioItems.find(item => item.id === hoveredItem)?.color}20)`
                        }}
                    >
                        <img
                            src={portfolioItems.find(item => item.id === hoveredItem)?.image}
                            alt="Portfolio preview"
                            className="img-fluid w-100 h-100"
                            style={{
                                objectFit: 'cover',
                                filter: 'brightness(0.9) contrast(1.1)'
                            }}
                        />
                        <div
                            className="position-absolute top-0 start-0 w-100 h-100"
                            style={{
                                background: `linear-gradient(135deg, ${portfolioItems.find(item => item.id === hoveredItem)?.color}20, transparent 50%)`
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
}
