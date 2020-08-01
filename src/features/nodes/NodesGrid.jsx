import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridContainer from '../../components/ResizableGrid';
import Node from './Node';
import { setDrawTool } from '../tools/toolsSlice';
import { setNodesType } from './nodesSlice';
import Svg from 'react-native-svg';
import { PanResponder, Animated } from 'react-native';

const NodesGrid = () => {
  const columns = useSelector(({ nodes }) => nodes.columns);
  const rows = useSelector(({ nodes }) => nodes.rows);
  const selectedTool = useSelector(({ tools }) => tools.drawTool);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  const animationFrameTime = useSelector(
    ({ tools }) => tools.animationFrameTime
  );

  const dispatch = useDispatch();

  const rowsIndices = [...Array(rows).keys()];
  const columnsIndices = [...Array(columns).keys()];

  return (
      <Svg width={columns * 16} height={rows * 16}>
        {rowsIndices.map((y) =>
          columnsIndices.map((x) => (
            <Node
              key={`${x}_${y}`}
              x={x}
              y={y}
              animationFrameTime={animationFrameTime}
              onPressIn={() =>
                dispatch(
                  setNodesType({ nodes: [{ x, y }], type: selectedTool })
                )
              }
            />
          ))
        )}
      </Svg>
  );
};

export default NodesGrid;
