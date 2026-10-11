import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import lilyImage from "./images/lili-pink.png";

const petalColors = [0xf4c3d2, 0xe8a9be, 0xd993ae, 0xf8dce5];

export const HeroScene = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas,
        powerPreference: "low-power",
      });
    } catch (error) {
      console.error("Unable to initialize the invitation's Three.js background.", error);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 12;

    const floralLayer = new THREE.Group();
    const petalLayer = new THREE.Group();
    scene.add(floralLayer, petalLayer);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const textures: THREE.Texture[] = [];
    const meshes: THREE.Mesh[] = [];
    const petals: THREE.Mesh[] = [];
    let disposed = false;
    let resizeObserver: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    let isVisible = true;
    const parallax = { x: 0, y: 0 };
    const moveX = gsap.quickTo(parallax, "x", { duration: 1.2, ease: "power3.out" });
    const moveY = gsap.quickTo(parallax, "y", { duration: 1.2, ease: "power3.out" });

    const placeFloralLayers = () => {
      const height = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const width = height * camera.aspect;
      const scale = Math.min(width * 0.28, height * 0.43, 3.8);
      const placements = [
        { x: -width * 0.43, y: -height * 0.3, size: scale, rotation: 0.28, opacity: 0.62 },
        { x: width * 0.44, y: height * 0.31, size: scale * 0.86, rotation: -0.38, opacity: 0.54 },
        { x: width * 0.46, y: -height * 0.38, size: scale * 0.55, rotation: 0.2, opacity: 0.32 },
      ];

      meshes.forEach((mesh, index) => {
        const placement = placements[index];
        if (!placement) return;
        mesh.position.set(placement.x, placement.y, -1.2 - index * 0.25);
        mesh.scale.set(placement.size, placement.size, 1);
        mesh.rotation.z = placement.rotation;
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.opacity = placement.opacity;
      });

      petals.forEach((petal, index) => {
        const side = index % 2 === 0 ? -1 : 1;
        const x = side * width * (0.18 + (index % 5) * 0.13);
        petal.position.set(x, height * (0.46 - (index % 7) * 0.14), 0.2 + (index % 3) * 0.08);
        petal.scale.setScalar(Math.min(width, height) * (0.009 + (index % 3) * 0.002));
      });
    };

    const loader = new THREE.TextureLoader();
    loader.load(
      lilyImage,
      (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        textures.push(texture);
        for (let index = 0; index < 3; index += 1) {
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.5,
            depthWrite: false,
            side: THREE.DoubleSide,
            color: 0xffe7ef,
          });
          const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
          floralLayer.add(mesh);
          meshes.push(mesh);
        }
        placeFloralLayers();
        renderer.render(scene, camera);
      },
      undefined,
      (error) => console.error(`Unable to load hero lily texture: ${lilyImage}`, error),
    );

    const petalGeometry = new THREE.CircleGeometry(0.12, 7);
    for (let index = 0; index < 14; index += 1) {
      const material = new THREE.MeshBasicMaterial({
        color: petalColors[index % petalColors.length],
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const petal = new THREE.Mesh(petalGeometry, material);
      petal.scale.set(0.7, 1.5, 1);
      petalLayer.add(petal);
      petals.push(petal);
    }

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      placeFloralLayers();
      if (reducedMotion) renderer.render(scene, camera);
    };

    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.documentElement);
    window.addEventListener("resize", resize);
    resize();

    const context = gsap.context(() => {
      if (!reducedMotion) {
        petals.forEach((petal, index) => {
          gsap.to(petal.position, {
            y: petal.position.y - 1.6,
            x: petal.position.x + (index % 2 === 0 ? 1.3 : -1.3),
            duration: 8 + (index % 5) * 1.6,
            delay: (index % 7) * 1.1,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
          gsap.to(petal.rotation, {
            z: index % 2 === 0 ? Math.PI : -Math.PI,
            duration: 12 + (index % 4) * 2,
            ease: "none",
            repeat: -1,
          });
        });
        meshes.forEach((mesh, index) => {
          gsap.to(mesh.rotation, {
            z: mesh.rotation.z + (index % 2 === 0 ? 0.08 : -0.08),
            duration: 8 + index * 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });
      }
    }, host);

    const render = () => {
      if (disposed || !isVisible || document.visibilityState === "hidden") return;
      floralLayer.position.x = parallax.x * -0.12;
      floralLayer.position.y = parallax.y * -0.1;
      petalLayer.position.x = parallax.x * -0.22;
      petalLayer.position.y = parallax.y * -0.18;
      renderer.render(scene, camera);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reducedMotion) return;
      const bounds = canvas.getBoundingClientRect();
      moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
      moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
    };
    const handlePointerLeave = () => {
      moveX(0);
      moveY(0);
    };

    host.addEventListener("pointermove", handlePointerMove);
    host.addEventListener("pointerleave", handlePointerLeave);
    intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? false;
    });
    intersectionObserver.observe(host);
    if (reducedMotion) render();
    else gsap.ticker.add(render);

    return () => {
      disposed = true;
      gsap.ticker.remove(render);
      context.revert();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resize);
      intersectionObserver?.disconnect();
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeEventListener("pointerleave", handlePointerLeave);
      moveX.tween.kill();
      moveY.tween.kill();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      petalGeometry.dispose();
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, []);

  return <canvas className="hero-three-stage" ref={canvasRef} aria-hidden="true" />;
};
