import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NodeTypes, { nodeTypeColor } from './NodeTypes';
import { Rect } from 'react-native-svg';
import { Animated } from 'react-native';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const Node = ({ x, y, size, animationFrameTime, onPressIn }) => {
  const animationValue = new Animated.Value(0);
  const node = useSelector(({ nodes }) => nodes.nodes[y][x]);
  const { type, visitedIndex } = node;

  // if visitedIndex is truthy node's color change will be animated
  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: 1,
      delay: visitedIndex * animationFrameTime,
      duration: visitedIndex ? animationFrameTime : 0,
      useNativeDriver: false,
    }).start();
  }, [type, animationFrameTime, visitedIndex]);

  const fillColor = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [nodeTypeColor[NodeTypes.empty], nodeTypeColor[type]],
  });

  return (
    <AnimatedRect
      x={node.x * size}
      y={node.y * size}
      width={size}
      height={size}
      fill={fillColor}
      strokeWidth={1}
      stroke={'black'}
      onPressIn={() => onPressIn(node)}
    />
  );
};

export default Node;
