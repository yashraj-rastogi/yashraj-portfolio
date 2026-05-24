"use client"

import type React from "react"
import { useRef, useState, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"

interface MagneticTextProps {
  text: string
  hoverText?: string
  className?: string
  baseStyle?: React.CSSProperties
  hoverStyle?: React.CSSProperties
}

export function MagneticText({ text, hoverText, className, baseStyle, hoverStyle }: MagneticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const innerTextRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const isHoveredRef = useRef(false)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const mousePos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const currentScale = useRef(0)
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.15)
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.15)
      
      const targetScale = isHoveredRef.current ? 1 : 0
      currentScale.current = lerp(currentScale.current, targetScale, 0.15)

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%) scale(${currentScale.current})`
      }

      if (innerTextRef.current) {
        innerTextRef.current.style.transform = `translate(${-currentPos.current.x}px, ${-currentPos.current.y}px)`
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mousePos.current = { x, y }
    currentPos.current = { x, y }
    isHoveredRef.current = true
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false
    setIsHovered(false)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative flex items-center justify-start cursor-none select-none text-left w-full mx-auto overflow-hidden",
        className
      )}
    >
      {/* Base text layer (always visible, faint color) */}
      <span
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          fontStyle: "italic",
          lineHeight: 1.4,
          ...baseStyle,
        }}
        className="w-full text-left break-words block"
      >
        {text}
      </span>

      {/* Circle Mask Container */}
      <div
        ref={circleRef}
        className="absolute top-0 left-0 pointer-events-none rounded-full bg-transparent overflow-hidden"
        style={{
          width: 200,
          height: 200,
          willChange: "transform",
        }}
      >
        {/* Inner static wrapper (mirrors size of parent container) */}
        <div
          ref={innerTextRef}
          className="absolute"
          style={{
            width: containerSize.width,
            height: containerSize.height,
            top: "50%",
            left: "50%",
            willChange: "transform",
          }}
        >
          {/* Revealed spotlight layer */}
          <span
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontStyle: "italic",
              lineHeight: 1.4,
              ...hoverStyle,
            }}
            className="w-full text-left break-words block"
          >
            {hoverText || text}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAGNETIC QUOTE (Specifically designed for About Me Philosophy)
   ───────────────────────────────────────────────────────────── */

export function MagneticQuote() {
  const containerRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const innerTextRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const isHoveredRef = useRef(false)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const mousePos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const currentScale = useRef(0)
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    
    // Staged updates for font load adjustments
    const timer1 = setTimeout(updateSize, 100)
    const timer2 = setTimeout(updateSize, 500)
    
    return () => {
      window.removeEventListener("resize", updateSize)
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.15)
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.15)
      
      const targetScale = isHoveredRef.current ? 1 : 0
      currentScale.current = lerp(currentScale.current, targetScale, 0.15)

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%) scale(${currentScale.current})`
      }

      if (innerTextRef.current) {
        // Pinned to parent top-left by using translate(-x, -y) without (-50%, -50%)
        innerTextRef.current.style.transform = `translate(${-currentPos.current.x}px, ${-currentPos.current.y}px)`
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mousePos.current = { x, y }
    currentPos.current = { x, y }
    isHoveredRef.current = true
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false
    setIsHovered(false)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        borderLeft: "2px solid var(--color-accent-amber)",
        paddingLeft: "1.5rem",
        pointerEvents: "auto",
        minHeight: "120px",
      }}
      className="relative my-4 py-4 select-none cursor-none w-full overflow-hidden flex items-center justify-start"
      data-cursor="text"
    >
      {/* ── Layer 1: Base Quote (Always visible outside mask) ── */}
      <span
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          fontStyle: "italic",
          color: "var(--color-accent-amber)", // Warm saturated amber quote
          lineHeight: 1.4,
        }}
        className="text-lg md:text-xl lg:text-2xl w-full text-left break-words block"
      >
        "I don't just ship features. I build experiences that make people feel something."
      </span>

      {/* ── Circle Mask Container (Solid spotlight cream color) ── */}
      <div
        ref={circleRef}
        className="absolute top-0 left-0 pointer-events-none rounded-full overflow-hidden"
        style={{
          width: 260, // Fixed constant size!
          height: 260, // Fixed constant size!
          backgroundColor: "var(--color-accent-cream)", // Solid light cream spotlight background
          willChange: "transform",
        }}
      >
        {/* Inner static wrapper (mirrors size of parent container and is pinned top-left) */}
        <div
          ref={innerTextRef}
          className="absolute"
          style={{
            width: containerSize.width,
            height: containerSize.height,
            top: "50%",
            left: "50%",
            willChange: "transform",
          }}
        >
          {/* ── Layer 2: Revealed Subtitle (Perfect matching layout alignment as span block) ── */}
          <div
            style={{
              paddingLeft: "1.5rem", // mirrors parent left spacing exactly
            }}
            className="w-full h-full flex items-center justify-center py-4 text-center"
          >
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif", // Exact same font!
                fontWeight: 700, // Exact same bold weight!
                fontStyle: "italic", // Exact same italic style!
                color: "var(--color-bg-primary)", // Dark charcoal text inside light cream circle
                lineHeight: 1.4, // Exact same line height!
              }}
              className="text-lg md:text-xl lg:text-2xl w-full text-left break-words block"
            >
              "Just flexing some cool animation, nothing serious!"
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
