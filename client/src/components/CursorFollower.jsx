'use client'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CursorFollower() {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const scale = useSpring(1, { stiffness: 300, damping: 20 })

    const springX = useSpring(mouseX, { stiffness: 180, damping: 20 })
    const springY = useSpring(mouseY, { stiffness: 180, damping: 20 })

    const [isHovering, setIsHovering] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768) // adjust breakpoint if needed
        }

        checkIsMobile()
        window.addEventListener('resize', checkIsMobile)

        return () => {
            window.removeEventListener('resize', checkIsMobile)
        }
    }, [])

    useEffect(() => {
        if (isMobile) return

        const handleMouseMove = (e) => {
            mouseX.set(e.clientX - 10)
            mouseY.set(e.clientY - 10)
        }

        const handleMouseOver = (e) => {
            if (e.target !== document.body && e.target !== document.documentElement) {
                setIsHovering(true)
            }
        }

        const handleMouseOut = () => setIsHovering(false)

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseover', handleMouseOver)
        window.addEventListener('mouseout', handleMouseOut)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseover', handleMouseOver)
            window.removeEventListener('mouseout', handleMouseOut)
        }
    }, [isMobile])

    useEffect(() => {
        if (!isMobile) {
            scale.set(isHovering ? 1.8 : 1)
        }
    }, [isHovering, scale, isMobile])

    if (isMobile) return null

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: 25,
                height: 25,
                borderRadius: '50%',
                backgroundColor: '#fff',
                mixBlendMode: 'difference',
                pointerEvents: 'none',
                zIndex: 9999,
                x: springX,
                y: springY,
                scale: scale,
            }}
        />
    )
}
