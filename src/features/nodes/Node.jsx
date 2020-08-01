import React from 'react';
import { useSelector } from 'react-redux';
import { nodeTypeColor } from './NodeTypes';
import { Rect } from 'react-native-svg';


const Node = ({ animationFrameTime, x, y, onPressIn }) => {
  const node = useSelector(({ nodes }) => nodes.nodes[y][x]);

  return (
    <Rect
      x={node.x * 16}
      y={node.y * 16}
      width={16}
      height={16}
      fill={nodeTypeColor[node.type]}
      strokeWidth={1}
      stroke={'black'}
      onPressIn={onPressIn}
    />
  );
};

export default React.memo(Node);
