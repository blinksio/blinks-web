import { useCallback, useRef } from "react";
import { ForceGraph3D, ForceGraphMethods$1, NodeObject$1 } from "react-force-graph";
import * as THREE from "three";
import { Blink } from "../interfaces/blink";

type Props = {
  blink: Blink
}

const FocusGraph = ({ blink }: Props) => {
  const fgRef = useRef<ForceGraphMethods$1>();

  const handleClick = useCallback((node: NodeObject$1) => {
    // Aim at node from outside it
    const x = node.x || 0;
    const y = node.y || 0;
    const z = node.z || 0;
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(x, y, z);

    fgRef.current?.cameraPosition(
      { x: x * distRatio, y: y * distRatio, z: z * distRatio }, // new position
      { x, y, z }, // lookAt ({ x, y, z })
      3000  // ms transition duration
    );
  }, [fgRef]);

  return <ForceGraph3D
    ref={fgRef}
    graphData={blink}
    nodeThreeObject={({ image_url }: any) => {
      const imgTexture = new THREE.TextureLoader().load(image_url);
      const material = new THREE.SpriteMaterial({ map: imgTexture });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(12, 12, 0);

      return sprite;
    }}
    nodeLabel="id"
    nodeAutoColorBy="group"
    onNodeClick={handleClick}
  />;
}

export default FocusGraph;
