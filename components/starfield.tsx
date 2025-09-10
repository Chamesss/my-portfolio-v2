'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '@/context/theme-context'

export default function StarField() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const animationIdRef = useRef<number>()
  const { theme } = useTheme()

  useEffect(() => {
    if (!mountRef.current) return

    const mountNode = mountRef.current

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Create stars
    const starGeometry = new THREE.BufferGeometry()
    const starCount = 2000
    const positions = new Float32Array(starCount * 3)
    const sizes = new Float32Array(starCount) // Fix: should be starCount, not starCount/8
    const colors = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      // Random positions in a sphere
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      // Random sizes - much smaller now
      sizes[i] = Math.random() * 0.5 + 0.1

      // Theme-aware star colors
      if (theme === 'light') {
        // Darker stars for light theme
        colors[i * 3] = 0.3 + Math.random() * 0.4 // Red channel
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.4 // Green channel
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.4 // Blue channel
      } else {
        // Bright white stars for dark theme
        colors[i * 3] = 1
        colors[i * 3 + 1] = 1
        colors[i * 3 + 2] = 1
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Star material
    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
  attribute float size;
  attribute vec3 color;
  varying vec3 vColor;
  uniform float time;
  
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    
    // Add subtle movement
    mvPosition.x += sin(time * 0.5 + position.y * 0.1) * 0.1;
    mvPosition.y += cos(time * 0.3 + position.x * 0.1) * 0.1;
    
    gl_PointSize = size * (150.0 / -mvPosition.z); // Increased from 100.0 for sharper stars
    gl_Position = projectionMatrix * mvPosition;
  }
`,
      fragmentShader: `
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5));
          if (distance > 0.2) discard; // Further reduced for much sharper, less blurry stars
          
          // Twinkling effect
          float twinkle = sin(time * 2.0 + gl_FragCoord.x * 0.01 + gl_FragCoord.y * 0.01) * 0.3 + 0.7;
          
          gl_FragColor = vec4(vColor * twinkle, 1.0 - distance * 5.0); // Further increased multiplier for crisper edges
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001
      starMaterial.uniforms.time.value = time

      // More horizontal rotation with adjusted direction
      stars.rotation.x += 0.0005 // Reduced for more horizontal movement
      stars.rotation.y -= 0.005 // Increased for stronger horizontal rotation
      stars.rotation.z += 0.0002 // Added subtle z rotation for more dynamic movement

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        window.removeEventListener('resize', handleResize)
        if (mountNode && renderer.domElement) {
          mountNode.removeChild(renderer.domElement)
        }
        renderer.dispose()
        starGeometry.dispose()
        starMaterial.dispose()
      }
    }
  }, [theme])

  return (
    <div
      ref={mountRef}
      className="animate-gradient-x pointer-events-none absolute left-0 top-0 -z-10 h-[calc(100vh+4.5rem)] w-screen"
      style={{
        background:
          theme === 'light'
            ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
            : 'linear-gradient(135deg, #030712 0%, #1e293b 50%, #334155 100%)',
        backgroundSize: '200% 200%'
      }}
    >
      <div className="pointer-events-none absolute -bottom-10 left-0 right-0 h-[5.5rem] bg-gradient-to-b from-transparent to-white/20 backdrop-blur-[14px] dark:from-transparent dark:to-gray-900/90"></div>
    </div>
  )
}
