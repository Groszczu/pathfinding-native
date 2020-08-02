import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Node from './Node';
import { setNodesType } from './nodesSlice';
import Svg from 'react-native-svg';
import { Dimensions } from 'react-native';

const NodesGrid = () => {
  const columns = useSelector(({ nodes }) => nodes.columns);
  const rows = useSelector(({ nodes }) => nodes.rows);
  const selectedTool = useSelector(({ tools }) => tools.drawTool);

  const width = Dimensions.get('window').width;
  const heigh = Dimensions.get('window').height;
  const nodeSize = Math.min(width / columns, heigh * 0.75 / rows); 

  const dispatch = useDispatch();

  const rowsIndices = [...Array(rows).keys()];
  const columnsIndices = [...Array(columns).keys()];

  return (
      <Svg width={columns * nodeSize} height={rows * nodeSize}>
        {rowsIndices.map((y) =>
          columnsIndices.map((x) => (
            <Node
              key={`${x}_${y}`}
              x={x}
              y={y}
              size={nodeSize}
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
