import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import { useMemo } from "react";

export default function PointCloud({ data }) {
    const positions = useMemo(() => {
      const scale = 3; // Adjust the scale factor as needed
      const arr = new Float32Array(data.length * 3);
      data.forEach((point, i) => {
        arr[i * 3] = point.x * scale;
        arr[i * 3 + 1] = point.y * scale;
        arr[i * 3 + 2] = point.z * scale;
      });
      return arr;
    }, [data]);
  
    // Calculate the center of the point cloud
    const center = useMemo(() => {
      if (data.length === 0) return [0, 0, 0];
      const sum = data.reduce(
        (acc, point) => {
          acc.x += point.x;
          acc.y += point.y;
          acc.z += point.z;
          return acc;
        },
        { x: 0, y: 0, z: 0 }
      );
      return [sum.x / data.length, sum.y / data.length, sum.z / data.length];
    }, [data]);
  
    return (
      <Canvas
        camera={{
          position: [center[0] - 300, center[1] + 300, center[2] + 500], // View from an angle
          fov: 40,
        }}
      >
        <ambientLight />
        <OrbitControls target={center} /> {/* Center the controls on the point cloud */}
        <Points positions={positions}>
          <PointMaterial size={1} color="cyan" />
        </Points>
      </Canvas>
    );
}
