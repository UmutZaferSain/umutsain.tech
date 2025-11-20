"use client";

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Effects, RoundedBox, Environment } from "@react-three/drei";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { UnrealBloomPass } from "three-stdlib";

extend({ UnrealBloomPass });

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

function GlassCube() {
  const mesh = useRef();
  const mat = useRef();
  const coreMat = useRef();

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const elapsed = state.clock.elapsedTime;
    const appear = THREE.MathUtils.clamp((elapsed - 1.0) / 1.1, 0, 1);
    const eased = easeOutBack(appear);
    mesh.current.scale.setScalar(0.05 + 0.95 * eased);
    mesh.current.rotation.y += delta * 0.2;
    mesh.current.rotation.x += delta * 0.05;
    if (mat.current) {
      mat.current.opacity = THREE.MathUtils.lerp(0, 0.9, eased);
      mat.current.emissiveIntensity = THREE.MathUtils.lerp(0, 0.4, eased);
    }
    if (coreMat.current) {
      coreMat.current.emissiveIntensity = THREE.MathUtils.lerp(0, 2.2, easeOutCubic(appear));
      coreMat.current.opacity = THREE.MathUtils.lerp(0, 0.45, eased);
    }
  });

  return (
    <group>
      <RoundedBox
        ref={mesh}
        args={[2.4, 2.4, 2.4]}
        radius={0.28}
        smoothness={6}
      >
        <meshPhysicalMaterial
          ref={mat}
          color="#2cff79"
          emissive="#2cff79"
          emissiveIntensity={0}
          transmission={0.95}
          thickness={1.5}
          roughness={0.05}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.08}
          reflectivity={1}
          ior={1.25}
          attenuationDistance={8}
          attenuationColor="#2cff79"
          transparent
          opacity={0}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          ref={coreMat}
          emissive="#2cff79"
          emissiveIntensity={0}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}

function FloatingCubes({ count = 160 }) {
  const meshRef = useRef();
  const matRef = useRef();
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const speeds = useMemo(() => Array.from({ length: count }, () => 0.2 + Math.random() * 0.6), [count]);
  const positions = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 16,
        z: (Math.random() - 0.5) * 14
      })),
    [count]
  );

  useLayoutEffect(() => {
    positions.forEach((pos, i) => {
      dummy.position.set(pos.x, pos.y, pos.z);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const s = 0.08 + Math.random() * 0.2;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy, positions]);

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    const fade = easeOutCubic(THREE.MathUtils.clamp((elapsed - 0.6) / 0.8, 0, 1));
    if (matRef.current) {
      matRef.current.opacity = 0.4 * fade;
      matRef.current.emissiveIntensity = 0.4 * fade;
    }
    positions.forEach((pos, i) => {
      pos.y += speeds[i] * delta;
      if (pos.y > viewport.height * 1.2) {
        pos.y = -viewport.height * 1.2;
        pos.x = (Math.random() - 0.5) * 16;
        pos.z = (Math.random() - 0.5) * 14;
      }
      dummy.position.set(pos.x, pos.y, pos.z);
      dummy.rotation.x += delta * 0.05;
      dummy.rotation.y += delta * 0.08;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial
        ref={matRef}
        color="#2cff79"
        transparent
        opacity={0}
        metalness={0.5}
        roughness={0.25}
        emissive="#2cff79"
        emissiveIntensity={0}
      />
    </instancedMesh>
  );
}

function SceneContents() {
  const group = useRef();
  const baseLight = useRef();
  const backLight = useRef();
  const sideLight = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const elapsed = state.clock.elapsedTime;
    const idleX = Math.sin(elapsed * 0.2) * 0.05;
    const idleY = Math.cos(elapsed * 0.16) * 0.08;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, idleX, 0.08);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, idleY, 0.08);

    const lightFade = easeOutCubic(THREE.MathUtils.clamp((elapsed - 0.8) / 0.8, 0, 1));
    if (baseLight.current) baseLight.current.intensity = 12 * lightFade;
    if (backLight.current) backLight.current.intensity = 7 * lightFade;
    if (sideLight.current) sideLight.current.intensity = 4 * lightFade;
  });

  return (
    <group ref={group}>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 8, 28]} />

      <hemisphereLight intensity={0.12} skyColor="#1aff6e" groundColor="#050505" />
      <pointLight ref={baseLight} position={[0, -3, 3]} intensity={0} distance={30} color="#2cff79" />
      <pointLight ref={backLight} position={[0, 2.5, -2]} intensity={0} distance={18} color="#2cff79" />
      <pointLight ref={sideLight} position={[4, 0, 4]} intensity={0} distance={12} color="#53ff97" />

      <GlassCube />
      <FloatingCubes />

      <Environment preset="city" />

      <BloomEffect />
    </group>
  );
}

function BloomEffect() {
  const { size } = useThree();
  const resolution = useMemo(() => new THREE.Vector2(size.width, size.height), [size.width, size.height]);

  return (
    <Effects disableGamma multisamping={0}>
      <unrealBloomPass args={[resolution, 0.95, 0.75, 0.17]} />
    </Effects>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.2]}
        camera={{ position: [0, 0, 9], fov: 46, near: 0.1, far: 80 }}
        gl={{ preserveDrawingBuffer: false, antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}
