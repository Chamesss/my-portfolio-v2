'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '@/context/theme-context'

interface StarFieldProps {
  theme?: 'light' | 'dark'
}

export default function StarField() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const animationIdRef = useRef<number>()
  const { theme } = useTheme()

  useEffect(() => {
    if (!mountRef.current) return

    const mountNode = mountRef.current
    const containerWidth = mountNode.clientWidth || 800
    const containerHeight = mountNode.clientHeight || 600

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000)
    camera.position.z = 5
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(containerWidth, containerHeight)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    const starGeometry = new THREE.BufferGeometry()
    const starCount = 8000
    const positions = new Float32Array(starCount * 3)
    const sizes = new Float32Array(starCount)
    const colors = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      sizes[i] = Math.random() * 0.5 + 0.1

      if (theme === 'light') {
        colors[i * 3] = 0.3 + Math.random() * 0.4
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.4
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.4
      } else {
        colors[i * 3] = 1
        colors[i * 3 + 1] = 1
        colors[i * 3 + 2] = 1
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

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
          
          mvPosition.x += sin(time * 0.5 + position.y * 0.1) * 0.1;
          mvPosition.y += cos(time * 0.3 + position.x * 0.1) * 0.1;
          
          gl_PointSize = size * (150.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
`,
      fragmentShader: `
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5));
          if (distance > 0.2) discard;
          
          float twinkle = sin(time * 2.0 + gl_FragCoord.x * 0.01 + gl_FragCoord.y * 0.01) * 0.3 + 0.7;
          
          gl_FragColor = vec4(vColor * twinkle, 1.0 - distance * 5.0);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    })

    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001
      starMaterial.uniforms.time.value = time

      stars.rotation.x += 0.0005
      stars.rotation.y -= 0.002
      stars.rotation.z += 0.0002

      renderer.render(scene, camera)
    }
    animate()

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        if (width > 0 && height > 0) {
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
        }
      }
    })

    resizeObserver.observe(mountNode)

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      resizeObserver.disconnect()
      if (mountNode && renderer.domElement && mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starGeometry.dispose()
      starMaterial.dispose()
    }
  }, [theme])

  return (
    <div
      ref={mountRef}
      className="animate-gradient-x pointer-events-none absolute left-0 top-0 -z-10 h-full w-full"
      style={{
        background:
          theme === 'light'
            ? 'linear-gradient(135deg, #b8cae0 0%, #cbd5e1 20%, #e2e8f0 50%, #b8cae0 100%)'
            : 'linear-gradient(135deg, #050c1f 0%, #030712 20%, #1e293b 50%, #030712 100%)',
        backgroundSize: '200% 200%'
      }}
    ></div>
  )
}
