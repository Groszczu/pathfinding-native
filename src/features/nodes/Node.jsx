import React from 'react';
import { useSelector } from 'react-redux';
import { nodeTypeColor } from './NodeTypes';
import { Rect } from 'react-native-svg';

const Node = ({ x, y, size, onPressIn }) => {
  const node = useSelector(({ nodes }) => nodes.nodes[y][x]);

  return (
    <Rect
      x={node.x * size}
      y={node.y * size}
      width={size}
      height={size}
      fill={nodeTypeColor[node.type]}
      strokeWidth={1}
      stroke={'black'}
      onPressIn={onPressIn}
    />
  );
};

export default React.memo(Node);
