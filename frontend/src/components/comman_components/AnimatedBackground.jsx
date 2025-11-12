import React, { useState, useEffect, useRef } from "react";

export default function AnimatedSquares({ style = "modern" }) {
    const [mouse, setMouse] = useState({ x: 50, y: 50 });
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    // Handle mouse movement
    const handleMouseMove = (e) => {
        if (style === "minimalist") return;
        
        const newMouse = {
            x: (e.clientX / window.innerWidth) * 100,
            y: (e.clientY / window.innerHeight) * 100,
        };
        setMouse(newMouse);
    };

    // Canvas animation for grid lines
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let time = 0;

        const animate = () => {
            // Clear canvas with style-specific background
            if (style === "minimalist") {
                ctx.fillStyle = '#ffffff';
            } else if (style === "organic") {
                ctx.fillStyle = '#f8f8f8';
            } else {
                ctx.fillStyle = '#000011';
            }
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cellSize = style === "minimalist" ? 40 : 
                           style === "organic" ? 60 : 50;

            const cols = Math.ceil(canvas.width / cellSize);
            const rows = Math.ceil(canvas.height / cellSize);

            // Set line style based on theme
            if (style === "minimalist") {
                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 1;
                ctx.shadowBlur = 0;
            } else if (style === "organic") {
                ctx.strokeStyle = 'rgba(80, 80, 80, 0.8)';
                ctx.lineWidth = 1.2;
                ctx.shadowBlur = 0;
            } else {
                ctx.strokeStyle = 'rgba(0, 150, 255, 0.9)';
                ctx.lineWidth = 1.5;
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(0, 150, 255, 0.7)';
            }

            // Calculate mouse influence for modern style
            const mouseX = (mouse.x / 100) * canvas.width;
            const mouseY = (mouse.y / 100) * canvas.height;

            // Draw vertical lines with animation
            for (let i = 0; i <= cols; i++) {
                const baseX = i * cellSize;
                let wave = 0;
                let pulse = 0;

                if (style === "minimalist") {
                    wave = Math.sin(time * 0.002 + i * 0.3) * 1.5;
                } else if (style === "organic") {
                    wave = Math.sin(time * 0.001 + i * 0.2) * 4;
                    pulse = Math.sin(time * 0.0008) * 1;
                } else {
                    // Modern style - more dynamic waves with mouse influence
                    wave = Math.sin(time * 0.0015 + i * 0.25) * 3;
                    pulse = Math.sin(time * 0.0006) * 2;
                    
                    // Mouse proximity effect
                    const distFromMouse = Math.abs(mouseX - baseX);
                    if (distFromMouse < 200) {
                        wave += (1 - distFromMouse / 200) * 8;
                    }
                }

                const x = baseX + wave + pulse;
                
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();

                // Add subtle glow points at intersections for modern style
                if (style === "modern") {
                    for (let j = 0; j <= rows; j++) {
                        const y = j * cellSize;
                        const dist = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
                        if (dist < 150) {
                            const intensity = (1 - dist / 150) * 0.3;
                            ctx.beginPath();
                            ctx.arc(x, y, 2, 0, Math.PI * 2);
                            ctx.fillStyle = `rgba(0, 200, 255, ${intensity})`;
                            ctx.fill();
                        }
                    }
                }
            }

            // Draw horizontal lines with animation
            for (let i = 0; i <= rows; i++) {
                const baseY = i * cellSize;
                let wave = 0;
                let pulse = 0;

                if (style === "minimalist") {
                    wave = Math.cos(time * 0.002 + i * 0.3) * 1.5;
                } else if (style === "organic") {
                    wave = Math.cos(time * 0.001 + i * 0.2) * 4;
                    pulse = Math.cos(time * 0.0008) * 1;
                } else {
                    // Modern style
                    wave = Math.cos(time * 0.0015 + i * 0.25) * 3;
                    pulse = Math.cos(time * 0.0006) * 2;
                    
                    // Mouse proximity effect
                    const distFromMouse = Math.abs(mouseY - baseY);
                    if (distFromMouse < 200) {
                        wave += (1 - distFromMouse / 200) * 8;
                    }
                }

                const y = baseY + wave + pulse;
                
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Add data stream effect for modern style
            if (style === "modern") {
                ctx.strokeStyle = 'rgba(0, 255, 200, 0.6)';
                ctx.lineWidth = 1;
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'rgba(0, 255, 200, 0.8)';

                // Create flowing data streams along grid lines
                for (let i = 0; i < 3; i++) {
                    const streamPos = (time * 0.02 + i * 100) % (cols * cellSize);
                    const streamRow = Math.floor((time * 0.01 + i * 50) % rows);
                    
                    ctx.beginPath();
                    ctx.moveTo(streamPos, streamRow * cellSize);
                    ctx.lineTo(streamPos + 50, streamRow * cellSize);
                    ctx.stroke();
                }

                // Reset shadow
                ctx.shadowBlur = 0;
            }

            // Add subtle distortion for organic style
            if (style === "organic") {
                // Draw subtle wave patterns over the grid
                ctx.strokeStyle = 'rgba(120, 120, 120, 0.1)';
                ctx.lineWidth = 0.5;
                
                for (let i = 0; i < cols; i += 2) {
                    const x = i * cellSize;
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    for (let j = 0; j <= rows; j++) {
                        const y = j * cellSize;
                        const wave = Math.sin(time * 0.001 + x * 0.01 + y * 0.01) * 3;
                        ctx.lineTo(x + wave, y);
                    }
                    ctx.stroke();
                }
            }

            time += 16;
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [style, mouse]);

    // Background based on style
    const getBackground = () => {
        switch(style) {
            case "minimalist":
                return "bg-white";
            case "organic":
                return "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200";
            default:
                return "bg-gradient-to-br from-black via-blue-900 to-purple-900";
        }
    };

    return (
        <div
            className={`relative w-full h-screen overflow-hidden ${getBackground()}`}
            onMouseMove={handleMouseMove}
        >
            {/* Main Canvas Grid */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
            />

            {/* Subtle overlay effects for modern style */}
            {style === "modern" && (
                <>
                    <div 
                        className="absolute rounded-full pointer-events-none transition-all duration-300"
                        style={{
                            left: `${mouse.x}%`,
                            top: `${mouse.y}%`,
                            transform: 'translate(-50%, -50%)',
                            width: '300px',
                            height: '300px',
                            background: `radial-gradient(circle, 
                                rgba(0, 180, 255, 0.1) 0%,
                                rgba(0, 100, 255, 0.05) 40%,
                                transparent 70%
                            )`,
                            filter: 'blur(40px)'
                        }}
                    />
                    
                    {/* Ambient background glows */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div 
                            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20"
                            style={{
                                background: 'radial-gradient(circle, rgba(0, 150, 255, 0.4) 0%, transparent 70%)'
                            }}
                        />
                        <div 
                            className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-15"
                            style={{
                                background: 'radial-gradient(circle, rgba(100, 200, 255, 0.3) 0%, transparent 70%)'
                            }}
                        />
                    </div>
                </>
            )}

            {/* Subtle overlay for organic style */}
            {style === "organic" && (
                <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, 
                            rgba(255,255,255,0.1) 0%,
                            transparent 50%
                        )`
                    }}
                />
            )}

            {/* Animation Styles for subtle elements */}
            <style jsx>{`
                @keyframes gridPulse {
                    0% {
                        opacity: 0.8;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0.8;
                    }
                }

                canvas {
                    animation: gridPulse 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}