import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, OrbitControls, Sparkles } from '@react-three/drei'
import { Suspense, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { bones, organs } from './data'

function InteractivePart({ id, data, position, children, selected, onSelect, dimmed = false }) {
  const group = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    if (!group.current) return
    const targetScale = selected ? 1.35 : hovered ? 1.1 : 1
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 1 - Math.pow(0.001, delta))
    const targetZ = selected ? position[2] + 1.1 : position[2]
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 1 - Math.pow(0.002, delta))
  })

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default' }}
      onClick={(event) => { event.stopPropagation(); onSelect(id) }}
    >
      <group>{children}</group>
      {(hovered || selected) && (
        <pointLight color={data.accent} intensity={selected ? 2 : 1} distance={2.8} />
      )}
      {hovered && !selected && (
        <Html center position={[0.9, 0.35, 0.7]} distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div className="scene-tooltip">
            <b>{data.name}</b>
            <span>{data.short}</span>
          </div>
        </Html>
      )}
      {dimmed && <mesh position={[0, 0, 0.05]} visible={false} />}
    </group>
  )
}

const material = (color, dimmed) => (
  <meshStandardMaterial color={color} roughness={0.48} metalness={0.05} transparent opacity={dimmed ? 0.18 : 1} />
)

function OrganModel({ selectedId, onSelect }) {
  const dim = (id) => Boolean(selectedId && selectedId !== id)
  return (
    <group position={[0, -0.15, 0]}>
      <BodyShell />

      <InteractivePart id="brain" data={organs.brain} position={[0, 2.25, 0.08]} selected={selectedId === 'brain'} dimmed={dim('brain')} onSelect={onSelect}>
        <mesh scale={[0.63, 0.44, 0.48]}>{<sphereGeometry args={[0.55, 28, 20]} />}{material(organs.brain.color, dim('brain'))}</mesh>
        <mesh position={[0.28, 0.06, 0.02]} scale={[0.55, 0.38, 0.44]}>{<sphereGeometry args={[0.5, 24, 18]} />}{material('#b27cec', dim('brain'))}</mesh>
        <mesh position={[-0.26, -0.02, 0.04]} scale={[0.5, 0.4, 0.42]}>{<sphereGeometry args={[0.5, 24, 18]} />}{material('#d8b1ff', dim('brain'))}</mesh>
      </InteractivePart>

      <InteractivePart id="lungs" data={organs.lungs} position={[0, 1.0, 0.12]} selected={selectedId === 'lungs'} dimmed={dim('lungs')} onSelect={onSelect}>
        <mesh position={[-0.34, 0, 0]} rotation={[0, 0, -0.12]} scale={[0.6, 1, 0.42]}>{<sphereGeometry args={[0.58, 28, 20]} />}{material(organs.lungs.color, dim('lungs'))}</mesh>
        <mesh position={[0.34, 0, 0]} rotation={[0, 0, 0.12]} scale={[0.6, 1, 0.42]}>{<sphereGeometry args={[0.58, 28, 20]} />}{material('#ffadc1', dim('lungs'))}</mesh>
        <mesh position={[0, 0.66, 0]} scale={[0.12, 0.8, 0.12]}>{<cylinderGeometry args={[0.18, 0.13, 0.9, 16]} />}{material('#d7b1bd', dim('lungs'))}</mesh>
      </InteractivePart>

      <InteractivePart id="heart" data={organs.heart} position={[0.14, 0.72, 0.55]} selected={selectedId === 'heart'} dimmed={dim('heart')} onSelect={onSelect}>
        <mesh rotation={[0, 0, -0.25]} scale={[0.48, 0.58, 0.4]}>{<sphereGeometry args={[0.55, 28, 20]} />}{material(organs.heart.color, dim('heart'))}</mesh>
        <mesh position={[-0.04, -0.35, 0]} rotation={[0, 0, Math.PI]}>{<coneGeometry args={[0.25, 0.55, 20]} />}{material('#ef3f52', dim('heart'))}</mesh>
        <mesh position={[0.12, 0.38, 0]} rotation={[0, 0, -0.12]}>{<cylinderGeometry args={[0.09, 0.11, 0.42, 14]} />}{material('#52a9e8', dim('heart'))}</mesh>
      </InteractivePart>

      <InteractivePart id="liver" data={organs.liver} position={[-0.24, -0.05, 0.18]} selected={selectedId === 'liver'} dimmed={dim('liver')} onSelect={onSelect}>
        <mesh rotation={[0.1, 0, -0.08]} scale={[1.05, 0.42, 0.5]}>{<sphereGeometry args={[0.62, 28, 20]} />}{material(organs.liver.color, dim('liver'))}</mesh>
      </InteractivePart>

      <InteractivePart id="stomach" data={organs.stomach} position={[0.36, -0.43, 0.28]} selected={selectedId === 'stomach'} dimmed={dim('stomach')} onSelect={onSelect}>
        <mesh rotation={[0.2, 0, -0.38]} scale={[0.55, 0.82, 0.45]}>{<sphereGeometry args={[0.48, 26, 18]} />}{material(organs.stomach.color, dim('stomach'))}</mesh>
      </InteractivePart>

      <InteractivePart id="kidneys" data={organs.kidneys} position={[0, -0.52, -0.14]} selected={selectedId === 'kidneys'} dimmed={dim('kidneys')} onSelect={onSelect}>
        <mesh position={[-0.46, 0, 0]} rotation={[0, 0, -0.2]} scale={[0.38, 0.6, 0.3]}>{<sphereGeometry args={[0.45, 24, 18]} />}{material(organs.kidneys.color, dim('kidneys'))}</mesh>
        <mesh position={[0.46, 0, 0]} rotation={[0, 0, 0.2]} scale={[0.38, 0.6, 0.3]}>{<sphereGeometry args={[0.45, 24, 18]} />}{material('#a85b61', dim('kidneys'))}</mesh>
      </InteractivePart>

      <group position={[0, -1.18, 0.12]}>
        {[0, 1, 2].map((row) => (
          <mesh key={row} position={[0, -row * 0.18, 0]} rotation={[Math.PI / 2, 0, row % 2 ? 0.1 : -0.1]}>
            <torusGeometry args={[0.48 - row * 0.05, 0.07, 10, 32]} />
            <meshStandardMaterial color="#ffbf8d" roughness={0.7} transparent opacity={selectedId ? 0.14 : 0.75} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function BodyShell() {
  const shell = { color: '#5ccac5', transparent: true, opacity: 0.09, roughness: 0.15, side: THREE.DoubleSide }
  return (
    <group>
      <mesh position={[0, 2.28, -0.15]} scale={[0.92, 1.08, 0.82]}><sphereGeometry args={[0.72, 32, 22]} /><meshPhysicalMaterial {...shell} /></mesh>
      <mesh position={[0, 0.42, -0.22]} scale={[1.35, 2.25, 0.78]}><capsuleGeometry args={[0.63, 1.5, 10, 24]} /><meshPhysicalMaterial {...shell} /></mesh>
      <mesh position={[-1.02, 0.14, -0.18]} rotation={[0, 0, -0.1]} scale={[0.45, 2.4, 0.45]}><capsuleGeometry args={[0.33, 1.55, 8, 18]} /><meshPhysicalMaterial {...shell} /></mesh>
      <mesh position={[1.02, 0.14, -0.18]} rotation={[0, 0, 0.1]} scale={[0.45, 2.4, 0.45]}><capsuleGeometry args={[0.33, 1.55, 8, 18]} /><meshPhysicalMaterial {...shell} /></mesh>
      <mesh position={[-0.42, -2.18, -0.22]} scale={[0.56, 2.4, 0.55]}><capsuleGeometry args={[0.42, 1.6, 8, 18]} /><meshPhysicalMaterial {...shell} /></mesh>
      <mesh position={[0.42, -2.18, -0.22]} scale={[0.56, 2.4, 0.55]}><capsuleGeometry args={[0.42, 1.6, 8, 18]} /><meshPhysicalMaterial {...shell} /></mesh>
    </group>
  )
}

function BoneMaterial({ dimmed }) {
  return <meshStandardMaterial color="#eaf6f1" roughness={0.48} transparent opacity={dimmed ? 0.18 : 0.92} />
}

function SkeletonModel({ selectedId, onSelect }) {
  const dim = (id) => Boolean(selectedId && selectedId !== id)
  const ribs = useMemo(() => Array.from({ length: 7 }, (_, i) => i), [])
  const vertebrae = useMemo(() => Array.from({ length: 16 }, (_, i) => i), [])
  return (
    <group position={[0, -0.1, 0]}>
      <InteractivePart id="skull" data={bones.skull} position={[0, 2.18, 0]} selected={selectedId === 'skull'} dimmed={dim('skull')} onSelect={onSelect}>
        <mesh scale={[0.72, 0.86, 0.68]}><sphereGeometry args={[0.68, 30, 22]} /><BoneMaterial dimmed={dim('skull')} /></mesh>
        <mesh position={[0, -0.52, 0.12]} scale={[0.48, 0.35, 0.48]}><boxGeometry args={[0.9, 0.55, 0.7]} /><BoneMaterial dimmed={dim('skull')} /></mesh>
        <mesh position={[-0.23, 0.08, 0.54]}><sphereGeometry args={[0.12, 18, 12]} /><meshStandardMaterial color="#0a1722" /></mesh>
        <mesh position={[0.23, 0.08, 0.54]}><sphereGeometry args={[0.12, 18, 12]} /><meshStandardMaterial color="#0a1722" /></mesh>
      </InteractivePart>

      <InteractivePart id="ribs" data={bones.ribs} position={[0, 0.68, 0]} selected={selectedId === 'ribs'} dimmed={dim('ribs')} onSelect={onSelect}>
        {ribs.map((i) => (
          <mesh key={i} position={[0, 0.56 - i * 0.18, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1 - i * 0.025, 0.62, 1]}>
            <torusGeometry args={[0.72, 0.045, 8, 42]} /><BoneMaterial dimmed={dim('ribs')} />
          </mesh>
        ))}
        <mesh position={[0, 0, 0.43]} scale={[0.1, 0.92, 0.09]}><boxGeometry /><BoneMaterial dimmed={dim('ribs')} /></mesh>
        <Bone x={-1.05} y={0.08} rotation={-0.08} dimmed={dim('ribs')} />
        <Bone x={1.05} y={0.08} rotation={0.08} dimmed={dim('ribs')} />
      </InteractivePart>

      <InteractivePart id="spine" data={bones.spine} position={[0, 0.18, -0.2]} selected={selectedId === 'spine'} dimmed={dim('spine')} onSelect={onSelect}>
        {vertebrae.map((i) => <mesh key={i} position={[Math.sin(i * 0.35) * 0.035, 1.23 - i * 0.16, 0]} scale={[0.18, 0.1, 0.15]}><boxGeometry /><BoneMaterial dimmed={dim('spine')} /></mesh>)}
      </InteractivePart>

      <InteractivePart id="pelvis" data={bones.pelvis} position={[0, -1.3, 0]} selected={selectedId === 'pelvis'} dimmed={dim('pelvis')} onSelect={onSelect}>
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1, 0.75, 0.7]}><torusGeometry args={[0.58, 0.18, 12, 38]} /><BoneMaterial dimmed={dim('pelvis')} /></mesh>
        <Bone x={-0.39} y={-1.28} length={2.2} dimmed={dim('pelvis')} />
        <Bone x={0.39} y={-1.28} length={2.2} dimmed={dim('pelvis')} />
      </InteractivePart>
    </group>
  )
}

function Bone({ x, y, length = 2.1, rotation = 0, dimmed }) {
  return <mesh position={[x, y - length * 0.48, 0]} rotation={[0, 0, rotation]}><capsuleGeometry args={[0.1, length, 8, 16]} /><BoneMaterial dimmed={dimmed} /></mesh>
}

function LoadingModel() {
  return <Html center><div className="model-loading"><span />3D model yuklanmoqda…</div></Html>
}

export default function AnatomyScene({ mode = 'organs', selectedId, onSelect = () => {}, compact = false }) {
  return (
    <Canvas
      dpr={[1, 1.7]}
      camera={{ position: [0, 0.2, compact ? 10.5 : 8.7], fov: compact ? 46 : 42 }}
      gl={{ antialias: true, alpha: true }}
      onPointerMissed={() => onSelect(null)}
    >
      <ambientLight intensity={1.25} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color="#dffff8" />
      <directionalLight position={[-5, 1, 3]} intensity={1.4} color="#7a8cff" />
      <pointLight position={[0, -3, 4]} intensity={0.7} color="#31e6ba" />
      <Suspense fallback={<LoadingModel />}>
        <Float speed={1.15} rotationIntensity={0.05} floatIntensity={0.14}>
          {mode === 'organs' ? <OrganModel selectedId={selectedId} onSelect={onSelect} /> : <SkeletonModel selectedId={selectedId} onSelect={onSelect} />}
        </Float>
        <Sparkles count={compact ? 25 : 45} scale={[5, 7, 3]} size={1.2} speed={0.15} opacity={0.18} color="#6af3d2" />
      </Suspense>
      <OrbitControls enablePan={false} minDistance={6.6} maxDistance={11} minPolarAngle={Math.PI * 0.32} maxPolarAngle={Math.PI * 0.68} autoRotate={!selectedId} autoRotateSpeed={0.55} />
    </Canvas>
  )
}
