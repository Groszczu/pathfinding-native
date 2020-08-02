import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import NodeTypes from '../features/nodes/NodeTypes';
import {
  setNodesType,
  startPathfinding,
  endPathfinding,
} from '../features/nodes/nodesSlice';

const usePathfinding = (
  nodes,
  startNode,
  endNode,
  algorithm,
  animationFrameTime
) => {
  const dispatch = useDispatch();

  const pathfinding = useCallback(() => {
    dispatch(startPathfinding());
    const { visited, result } = algorithm(nodes, startNode, endNode);
    visited &&
      dispatch(setNodesType({ nodes: visited, type: NodeTypes.visited }));

    dispatch(
      result
        ? setNodesType({
            nodes: result,
            type: NodeTypes.result,
          })
        : endPathfinding()
    );
  }, [algorithm, nodes, startNode, endNode, animationFrameTime, dispatch]);

  return [pathfinding];
};

export default usePathfinding;
