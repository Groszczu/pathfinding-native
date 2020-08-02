import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Node from './Node';
import { setNodesType } from './nodesSlice';
import Svg from 'react-native-svg';
import { View, Dimensions, PanResponder } from 'react-native';
import NodeTypes from './NodeTypes';
import { setDrawTool } from '../tools/toolsSlice';

const NodesGrid = () => {
  const columns = useSelector(({ nodes }) => nodes.columns);
  const rows = useSelector(({ nodes }) => nodes.rows);
  const selectedTool = useSelector(({ tools }) => tools.drawTool);
  const dispatch = useDispatch();
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const draggingRef = useRef(false);

  const width = Dimensions.get('window').width;
  const heigh = Dimensions.get('window').height;
  const nodeSize = Math.floor(Math.min(width / columns, (heigh * 0.75) / rows));

  const getNodeCoords = (gestureState) => {
    const { x0, y0, dx, dy } = gestureState;
    const nodeX = Math.floor((x0 - offsetX + dx) / nodeSize);
    const nodeY = Math.floor((y0 - offsetY + dy) / nodeSize);
    return { x: nodeX, y: nodeY };
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_evt, gestureState) => {
      const coords = getNodeCoords(gestureState);
      dispatch(setNodesType({ nodes: [coords], type: selectedTool }));
    },
    onPanResponderRelease: () => {
      if (draggingRef.current) {
        dispatch(setDrawTool(NodeTypes.wall));
        draggingRef.current = false;
      }
    },
  });

  const onNodePressIn = (node) => {
    if (node.type === NodeTypes.start || node.type === NodeTypes.end) {
      dispatch(setDrawTool(node.type));
      draggingRef.current = true;
    } else {
      dispatch(setNodesType({ nodes: [node], type: selectedTool }));
    }
  };

  const rowsIndices = [...Array(rows).keys()];
  const columnsIndices = [...Array(columns).keys()];

  return (
    <View
      style={{ marginTop: '5%' }}
      onLayout={({
        nativeEvent: {
          layout: { x, y },
        },
      }) => {
        setOffsetX(x);
        setOffsetY(y);
      }}
    >
      <Svg
        width={columns * nodeSize}
        height={rows * nodeSize}
        {...panResponder.panHandlers}
      >
        {rowsIndices.map((y) =>
          columnsIndices.map((x) => (
            <Node
              key={`${x}_${y}`}
              x={x}
              y={y}
              size={nodeSize}
              onPressIn={onNodePressIn}
            />
          ))
        )}
      </Svg>
    </View>
  );
};

export default NodesGrid;
