import { useEffect, useRef } from "react";
import * as THREE from "three";
import lilyImage from "./images/lili-pink.png";

export const LilyParallax = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 12;

    const lilies = new THREE.Group();
    const petals = new THREE.Group();
    scene.add(lilies, petals);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parallax = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let disposed = false;
    let frame = 0;
    let resizeObserver: ResizeObserver | undefined;
    const textures: THREE.Texture[] = [];
    const petalMeshes: THREE.Mesh[] = [];
    const lilyMeshes: THREE.Mesh[] = [];
    const positionLayers = () => {
      const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const viewWidth = viewHeight * camera.aspect;
      const lilySize = Math.min(viewWidth * 0.27, viewHeight * 0.27, 2.35);
      const smallLilySize = lilySize * 0.54;
      const side = viewWidth * 0.39;
      const top = viewHeight * 0.39;
      const bottom = -viewHeight * 0.39;
      const cornerPositions = [
        { x: -side, y: bottom, size: lilySize, rotation: 0.2 },
        { x: side, y: bottom, size: lilySize, rotation: -0.2 },
        { x: -side, y: top, size: smallLilySize, rotation: -0.25 },
        { x: side, y: top, size: smallLilySize, rotation: 0.25 },
      ];

      lilyMeshes.forEach((lily, index) => {
        const placement = cornerPositions[index];
        if (!placement) return;
        lily.scale.set(placement.size, placement.size * 0.99, 1);
        lily.position.set(placement.x, placement.y, index < 2 ? 0.4 : -1.1);
        lily.rotation.z = placement.rotation;
      });

      const petalPositions = [
        [-0.42, 0.2], [0.42, 0.2], [-0.46, -0.06], [0.46, -0.06],
        [-0.39, -0.34], [0.39, -0.34], [-0.18, 0.4], [0.18, 0.4],
      ];
      petalMeshes.forEach((petal, index) => {
        const [x, y] = petalPositions[index % petalPositions.length];
        petal.position.set(x * viewWidth, y * viewHeight, 1.5 + (index % 2) * 0.14);
      });
    };

    const loader = new THREE.TextureLoader();
    const loadTexture = (url: string, onLoad: (texture: THREE.Texture) => void) => {
      loader.load(url, (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        textures.push(texture);
        onLoad(texture);
      }, undefined, (error) => {
        console.error(`Unable to load opening floral texture: ${url}`, error);
      });
    };

    const makeLily = (texture: THREE.Texture, index: number, opacity: number) => {
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity,
        depthWrite: false,
        side: THREE.DoubleSide,
        color: index === 0 ? 0xffe4ed : 0xf7d0dd,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
      lilies.add(mesh);
      lilyMeshes[index] = mesh;
      positionLayers();
    };

    loadTexture(lilyImage, (texture) => {
      makeLily(texture, 0, 0.72);
      makeLily(texture, 1, 0.72);
      makeLily(texture, 2, 0.64);
      makeLily(texture, 3, 0.38);
    });

    const petalGeometry = new THREE.CircleGeometry(0.09, 7);
    for (let index = 0; index < 8; index += 1) {
      const material = new THREE.MeshBasicMaterial({
        color: index % 3 === 0 ? 0xffc2d3 : 0xe889a8,
        transparent: true,
        opacity: 0.68,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const petal = new THREE.Mesh(petalGeometry, material);
      petal.scale.set(0.68, 1.55, 1);
      petal.rotation.z = index % 2 === 0 ? 0.55 : -0.55;
      petals.add(petal);
      petalMeshes.push(petal);
    }
    positionLayers();

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) return;
      renderer.setSize(bounds.width, bounds.height, false);
      camera.aspect = bounds.width / bounds.height;
      camera.updateProjectionMatrix();
      positionLayers();
      if (reducedMotion) renderer.render(scene, camera);
    };

    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reducedMotion) return;
      const bounds = canvas.getBoundingClientRect();
      parallax.targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      parallax.targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * -2;
    };

    const handlePointerLeave = () => {
      parallax.targetX = 0;
      parallax.targetY = 0;
    };

    const pointerSurface = canvas.closest<HTMLElement>(".opening-screen");
    pointerSurface?.addEventListener("pointermove", handlePointerMove);
    pointerSurface?.addEventListener("pointerleave", handlePointerLeave);

    const render = (time: number) => {
      if (disposed) return;
      frame = window.requestAnimationFrame(render);

      if (!reducedMotion) {
        parallax.x += (parallax.targetX - parallax.x) * 0.025;
        parallax.y += (parallax.targetY - parallax.y) * 0.025;
        lilies.position.x = parallax.x * -0.09;
        lilies.position.y = parallax.y * -0.07;
        petals.position.x = parallax.x * -0.16;
        petals.position.y = parallax.y * -0.12;
      }

      renderer.render(scene, camera);
    };

    frame = window.requestAnimationFrame(render);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      pointerSurface?.removeEventListener("pointermove", handlePointerMove);
      pointerSurface?.removeEventListener("pointerleave", handlePointerLeave);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, []);

  return <canvas className="intro-three-stage" ref={canvasRef} aria-hidden="true" />;
};
