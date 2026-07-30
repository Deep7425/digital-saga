'use client'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { apiUrl } from '../lib/api';

const FALLBACK_IMAGE =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480"><rect width="640" height="480" fill="#1a1030"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#a78bfa" font-family="Arial,sans-serif" font-size="28">Image unavailable</text></svg>'
    );

const fallbackItems = [
    {
        id: 1,
        clientName: "Jaipur Jazba",
        industry: "Content Strategy, Social Media Ads",
        result: "10,000+ Organic Followers within 2 Months",
        description: "We crafted a custom content strategy and ad funnel for Jaipur’s trendiest kurti brand.",
        image: "/images/Jaipur-Jazba.jpg",
        color: "#08b5e9"
    },
    {
        id: 2,
        clientName: "Najin & Fatu",
        industry: "Website Design and Development",
        result: "A clean, educational platform for a cause-driven NGO.",
        description: "We designed and developed a responsive site highlighting their mission and projects.",
        image: "/images/NajinFatu.jpg",
        color: "#f993fb"
    }
];

export default function PortfolioSection() {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        (async () => {
            try {
                const res = await fetch(apiUrl('/api/portfolios'));
                const data = await res.json().catch(() => []);
                if (!res.ok || !Array.isArray(data)) {
                    if (!ignore) setPortfolioItems(fallbackItems);
                    return;
                }
                const mapped = data.map((item) => ({
                    id: item.id,
                    clientName: item.client_name,
                    industry: item.industry,
                    result: item.result,
                    description: item.description,
                    image: item.image || '',
                    color: item.accent_color || '#7c3aed',
                }));
                if (!ignore) setPortfolioItems(mapped.length ? mapped : fallbackItems);
            } catch {
                if (!ignore) setPortfolioItems(fallbackItems);
            } finally {
                if (!ignore) setLoading(false);
            }
        })();

        return () => {
            ignore = true;
        };
    }, []);

    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 24, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 14,
            },
        },
    };

    const handleImageError = (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = FALLBACK_IMAGE;
        e.currentTarget.classList.add('portfolio-image-missing');
    };

    return (
        <section id="portfolio" className="py-5 text-white position-relative overflow-hidden" style={{ background: 'var(--site-gradient)' }}>
            <div className="container-fluid">
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
                        Here's a glimpse into some of our proudest projects:
                    </p>
                </motion.div>

                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        {loading ? (
                            <p className="text-center text-white-50 mb-0">Loading portfolio...</p>
                        ) : portfolioItems.length === 0 ? (
                            <p className="text-center text-white-50 mb-0">Portfolio projects will appear here soon.</p>
                        ) : (
                            <motion.div
                                key={portfolioItems.map((item) => item.id).join('-')}
                                variants={listVariants}
                                initial="hidden"
                                animate="visible"
                                className="portfolio-list"
                            >
                                {portfolioItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        variants={itemVariants}
                                        className="portfolio-list-item mb-4"
                                        style={{
                                            backgroundColor: 'rgba(255,255,255,0.04)',
                                            padding: '1.5rem',
                                            borderRadius: '1rem',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                        }}
                                    >
                                        <div className="row align-items-center g-4">
                                            <div className={item.image ? 'col-md-7 col-lg-8' : 'col-12'}>
                                                <div className="d-flex align-items-center mb-2">
                                                    <motion.div
                                                        className="me-3"
                                                        style={{
                                                            width: '60px',
                                                            height: '4px',
                                                            backgroundColor: item.color,
                                                            borderRadius: '2px',
                                                        }}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: '60px' }}
                                                        transition={{ delay: 0.15 + index * 0.08, duration: 0.6 }}
                                                    />
                                                    <small className="text-white-50 text-uppercase fw-semibold">
                                                        {item.industry}
                                                    </small>
                                                </div>

                                                <h3 className="h2 text-white mb-2 fw-bold">{item.clientName}</h3>
                                                <p className="text-white-50 mb-3">{item.description}</p>

                                                <div className="d-flex align-items-center">
                                                    <i className="fas fa-chart-line me-2" style={{ color: item.color }} />
                                                    <strong className="text-white fs-5">{item.result}</strong>
                                                </div>
                                            </div>

                                            {item.image ? (
                                                <div className="col-md-5 col-lg-4">
                                                    <div
                                                        className="portfolio-card-image overflow-hidden rounded-4 shadow-lg"
                                                        style={{
                                                            background: `linear-gradient(135deg, ${item.color}33, rgba(0,0,0,0.35))`,
                                                        }}
                                                    >
                                                        <img
                                                            src={item.image}
                                                            alt={item.clientName}
                                                            className="img-fluid w-100 portfolio-card-image-img"
                                                            loading="lazy"
                                                            onError={handleImageError}
                                                        />
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
