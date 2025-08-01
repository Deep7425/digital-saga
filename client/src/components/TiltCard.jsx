import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useMousePosition';

const TiltCard = ({ children, className = '', intensity = 15 }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isMobile = useIsMobile();

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -intensity;
    const rotateYValue = ((x - centerX) / centerX) * intensity;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: !isMobile ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` : 'none'
      }}
      animate={{
        scale: isHovered && !isMobile ? 1.05 : 1,
        rotateX: !isMobile ? rotateX : 0,
        rotateY: !isMobile ? rotateY : 0
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        scale: { duration: 0.3 }
      }}
    >
      <motion.div
        style={{
          transform: !isMobile && isHovered ? 'translateZ(20px)' : 'translateZ(0px)'
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;
