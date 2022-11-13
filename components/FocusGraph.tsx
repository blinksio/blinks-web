import { useCallback, useRef, useState } from "react";
import { ForceGraph3D, ForceGraphMethods$1 } from "react-force-graph";
import * as THREE from "three";
import SpriteText from "three-spritetext";
import BlinkModal from "./Modal";
import { Blink, BlinkLinks, BlinkNode } from "../interfaces/blink";

type Props = {
  blink: Blink;
  backgroundColor: string;
  width?: any;
  height?: number;
};

const FocusGraph = (props: Props) => {
  const { blink, ...styleProps } = props;

  const fgRef = useRef<ForceGraphMethods$1>();
  const [isOpen, setOpenModal] = useState(false);
  const [modalNodeData, setModalNodeData] = useState<Partial<BlinkNode>>({});
  const [highlightLinks, setHighlightLinks] = useState<BlinkLinks[]>([]);
  const [hoverNode, setHoverNode] = useState(null);

  const openModal = (nodeData: any) => {
    setModalNodeData(nodeData);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleClick = useCallback(
    (node: any) => {
      // Aim at node from outside it
      const x = node.x || 0;
      const y = node.y || 0;
      const z = node.z || 0;
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(x, y, z);

      fgRef.current?.cameraPosition(
        { x: x * distRatio, y: y * distRatio, z: z * distRatio }, // new position
        { x, y, z }, // lookAt ({ x, y, z })
        3000 // ms transition duration
      );

      openModal({
        name: node.name,
        address: node.address,
        symbol: node.symbol,
        meta: node.meta,
        image_url: node.image_url,
      });
    },
    [fgRef]
  );

  return (
    <>
      <ForceGraph3D
        ref={fgRef}
        graphData={blink}
        showNavInfo={false}
        nodeThreeObject={(node: any) => {
          if (node.image_url) {
            const imgTexture = new THREE.TextureLoader().load(node.image_url);
            const material = new THREE.SpriteMaterial({
              map: imgTexture,
            });
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(12, 12, 0);

            return sprite;
          }

          const sprite = new SpriteText(node.name);
          sprite.material.depthWrite = false; // make sprite background transparent
          sprite.color = node.color;
          sprite.textHeight = 8;
          return sprite;
        }}
        nodeLabel="name"
        nodeAutoColorBy="id"
        onNodeClick={handleClick}
        onNodeHover={(node: any) => {
          // no state change
          if (!node || (node && hoverNode === node)) return;

          if (node.links) {
            setHighlightLinks(node.links);
          }

          setHoverNode(node);
        }}
        linkWidth={(link: any) => {
          if (link.source?.main || link.target?.main) {
            return 1;
          }

          const test = highlightLinks.find(
            (hLink) =>
              hLink.source === link.source?.id &&
              hLink.target === link.target?.id
          )
            ? 1
            : 0;
          return test;
        }}
        linkDirectionalParticles={(link: any) =>
          highlightLinks.find(
            (hLink) =>
              hLink.source === link.source?.id &&
              hLink.target === link.target?.id
          )
            ? 1
            : 0
        }
        linkDirectionalParticleWidth={1}
        linkColor={(link: any) =>
          link.source?.main || link.target?.main ? "#42f5f5" : "#a7aaaa"
        }
        {...styleProps}
      />
      <BlinkModal
        isOpen={isOpen}
        closeModal={closeModal}
        data={modalNodeData}
      />
    </>
  );
};

export default FocusGraph;
