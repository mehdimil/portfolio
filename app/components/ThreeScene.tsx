'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    const container = mountRef.current;
    // remove any old canvas before attaching a new one
    const existingCanvas = container.querySelector('#three-canvas');
    if (existingCanvas) container.removeChild(existingCanvas);
    renderer.domElement.id = 'three-canvas';
    container.appendChild(renderer.domElement);

    // ─── MAIN TECH SPHERE ────────────────────────────────────────────────────
    const group = new THREE.Group();
    scene.add(group);

    // Core icosahedron sphere
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 4);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00F5FF,
      emissive: 0x003344,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00F5FF,
      wireframe: true,
      opacity: 0.15,
      transparent: true,
    });
    const wireMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.52, 4), wireMat);
    group.add(wireMesh);

    // Outer glow shell
    const glowGeo = new THREE.SphereGeometry(1.7, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00F5FF,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    });
    group.add(new THREE.Mesh(glowGeo, glowMat));

    // ─── ORBIT RINGS ─────────────────────────────────────────────────────────
    const ringData = [
      { radius: 2.4, tube: 0.008, color: 0x00F5FF, opacity: 0.45, tilt: 15 },
      { radius: 3.0, tube: 0.006, color: 0xFFB800, opacity: 0.28, tilt: -35 },
    ];
    const rings: THREE.Mesh[] = [];
    ringData.forEach(r => {
      const geo = new THREE.TorusGeometry(r.radius, r.tube, 8, 120);
      const mat = new THREE.MeshBasicMaterial({ color: r.color, transparent: true, opacity: r.opacity });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = THREE.MathUtils.degToRad(r.tilt);
      // add rings to the main group so they stay centered on the sphere
      group.add(mesh);
      rings.push(mesh);
    });

    // ─── FLOATING PARTICLES ───────────────────────────────────────────────────
    const particleCount = 240;
    const positions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 4 + Math.random() * 4.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      particleSizes[i] = Math.random() * 2 + 0.8;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00F5FF,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Gold particles
    const goldPositions = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      goldPositions[i * 3] = (Math.random() - 0.5) * 20;
      goldPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      goldPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const goldGeo = new THREE.BufferGeometry();
    goldGeo.setAttribute('position', new THREE.BufferAttribute(goldPositions, 3));
    const goldMat = new THREE.PointsMaterial({ color: 0xFFB800, size: 0.05, transparent: true, opacity: 0.4 });
    scene.add(new THREE.Points(goldGeo, goldMat));

    // ─── ORBIT DOTS (satellites) ──────────────────────────────────────────────
    const satGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x00F5FF });
    const satGoldMat = new THREE.MeshBasicMaterial({ color: 0xFFB800 });
    const sat1 = new THREE.Mesh(satGeo, satMat);
    const sat2 = new THREE.Mesh(satGeo, satGoldMat);
    scene.add(sat1);
    scene.add(sat2);

    // ─── LIGHTS ───────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x111122, 1.5);
    scene.add(ambientLight);
    const cyanLight = new THREE.PointLight(0x00F5FF, 4, 12);
    cyanLight.position.set(3, 3, 3);
    scene.add(cyanLight);
    const goldLight = new THREE.PointLight(0xFFB800, 2, 10);
    goldLight.position.set(-3, -2, 2);
    scene.add(goldLight);
    const backLight = new THREE.PointLight(0x0033FF, 1.5, 8);
    backLight.position.set(0, -3, -3);
    scene.add(backLight);

    // ─── GSAP SCROLL ANIMATIONS ───────────────────────────────────────────────
    const scrollState = { progress: 0 };

    ScrollTrigger.create({
      trigger: '.content',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => {
        scrollState.progress = self.progress;
      }
    });

    // ─── MOUSE TRACKING ───────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ─── ANIMATION LOOP ───────────────────────────────────────────────────────
    let t = 0;
    let reqId = 0;
    // smooth progress for buttery interpolation
    let smoothP = 0;
    const smoothFactor = 0.08;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      t += 0.008;
      // lerp scroll progress for smooth motion
      smoothP += (scrollState.progress - smoothP) * smoothFactor;
      const p = smoothP;

      // Main sphere
      group.rotation.y = t * 0.3 + mouse.x * 0.3;
      group.rotation.x = mouse.y * 0.2;

      // Scroll-driven scale & position (smoothed)
      const targetScale = 1 - p * 0.35;
      const currentScale = group.scale.x;
      const scaleLerp = 0.08;
      const newScale = currentScale + (targetScale - currentScale) * scaleLerp;
      group.scale.setScalar(newScale);
      group.position.x += (p * 3 - group.position.x) * 0.08;
      group.position.y += (-p * 1.5 - group.position.y) * 0.08;

      // Rings spin
      if (rings[0]) rings[0].rotation.z += 0.003;
      if (rings[1]) rings[1].rotation.z -= 0.002;
      rings.forEach((r, index) => {
        if (index > 1) {
          r.rotation.y += 0.001;
        } else {
          r.rotation.y += 0.0008;
        }
      });

      // Satellite orbits
      sat1.position.x = Math.cos(t * 0.8) * 2.4;
      sat1.position.z = Math.sin(t * 0.8) * 2.4;
      sat1.position.y = Math.sin(t * 0.4) * 0.5;
      sat2.position.x = Math.cos(t * 0.5 + 2) * 3.0;
      sat2.position.z = Math.sin(t * 0.5 + 2) * 3.0;
      sat2.position.y = -Math.sin(t * 0.6) * 0.8;

      // Particles slow drift
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;

      // Camera parallax + scroll-driven depth for stronger 3D feel
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.03;
      const targetZ = 6 - p * 3.5; // move camera closer as user scrolls
      camera.position.z += (targetZ - camera.position.z) * 0.06;
      camera.lookAt(group.position);

      // Emissive pulse
      (coreMesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.4 + Math.sin(t * 2) * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    // Entrance animation
    gsap.fromTo(group.scale, { x: 0, y: 0, z: 0 }, {
      x: 1, y: 1, z: 1,
      duration: 1.8,
      ease: 'elastic.out(1, 0.5)',
      delay: 0.5
    });
    gsap.fromTo(group.rotation, { y: -Math.PI }, { y: 0, duration: 2, ease: 'power3.out', delay: 0.3 });

    // ─── RESIZE ───────────────────────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId as any);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
