import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls, Plane, Text } from "@react-three/drei";
import { useMemo } from "react";

// Helper component for Axis Labels
const AxisLabel = ({ position, color, label }) => (
  <Text position={position} fontSize={5} color={color}>
    {label}
  </Text>
);

// Helper function to calculate slicing planes
const calculatePlanePositions = (center, slices, axis) => {
  if (slices <= 1) return [];

  const range = center[axis === "y" ? 1 : 0] * 2; // yRange or xRange
  const sliceSize = range / slices;

  return Array.from({ length: slices - 1 }, (_, i) => {
    const offset = -range / 2 + (i + 1) * sliceSize;
    const position = axis === "y"
      ? [center[0], center[1] + offset, center[2]]
      : [center[0] + offset, center[1], center[2]];

    const rotation = axis === "y"
      ? [-Math.PI / 2, 0, 0] // Align with X-Z plane
      : [-Math.PI / 2, -Math.PI / 2, 0]; // Align with Y-Z plane

    const args = axis === "y"
      ? [center[0] * 2 + 10, center[2] * 2 + 10]
      : [center[1] * 2 + 10, center[2] * 2 + 10];

    return { position, rotation, args };
  });
};

export default function PointCloud({ data, slices, axis }) {
  const positions = useMemo(() => {
    if (!Array.isArray(data)) {
      console.error("PointCloud received non-array data:", data);
      return new Float32Array();
    }

    const scale = 1;
    const arr = new Float32Array(data.length * 3);
    data.forEach((point, i) => {
      arr[i * 3] = point.x * scale;
      arr[i * 3 + 1] = point.y * scale;
      arr[i * 3 + 2] = point.z * scale;
    });
    return arr;
  }, [data]);

  const center = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [0, 0, 0];

    const { xMin, xMax, yMin, yMax, zMin, zMax } = data.reduce(
      (acc, point) => ({
        xMin: Math.min(acc.xMin, point.x),
        xMax: Math.max(acc.xMax, point.x),
        yMin: Math.min(acc.yMin, point.y),
        yMax: Math.max(acc.yMax, point.y),
        zMin: Math.min(acc.zMin, point.z),
        zMax: Math.max(acc.zMax, point.z),
      }),
      {
        xMin: Infinity,
        xMax: -Infinity,
        yMin: Infinity,
        yMax: -Infinity,
        zMin: Infinity,
        zMax: -Infinity,
      }
    );

    return [
      (xMin + xMax) / 2,
      (yMin + yMax) / 2,
      (zMin + zMax) / 2,
    ];
  }, [data]);

  const planePosition = useMemo(() => calculatePlanePositions(center, slices, axis), [center, slices, axis]);

  return (
    <Canvas
      camera={{
        position: [center[0] - 100, center[1] + 100, center[2] + 200],
        fov: 40,
      }}
    >
      <ambientLight />
      <OrbitControls target={center} />

      {/* Axes Helper */}
      <axesHelper args={[100]} />

      {/* Axis Labels */}
      <AxisLabel position={[110, 0, 0]} color="red" label="X" />
      <AxisLabel position={[0, 110, 0]} color="green" label="Y" />
      <AxisLabel position={[0, 0, 110]} color="blue" label="Z" />

      {/* Point Cloud */}
      <Points positions={positions}>
        <PointMaterial size={1} color="cyan" />
      </Points>

      {/* Slicing Planes */}
      {planePosition.map(({ position, rotation, args }, index) => (
        <Plane key={index} args={args} position={position} rotation={rotation}>
          <meshStandardMaterial color="red" opacity={0.5} transparent />
        </Plane>
      ))}
    </Canvas>
  );
}