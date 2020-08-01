import { createSlice } from '@reduxjs/toolkit';
import { createEmptyNodes, isStartOrEndNode, clearNotToolNodes } from './nodeHelpers';
import NodeTypes from './NodeTypes';


// Default state
const COLS = 20;
const ROWS = 30;

export const pathfindingState = {
  ready: 'ready',
  running: 'running',
  done: 'done'
};

function initNodesState(cols, rows) {
  const nodes = createEmptyNodes(cols, rows);
  const middleY = Math.floor(nodes.length / 2);
  const middleX = Math.floor(nodes[0].length / 2);

  const startNode = { y: middleY, x: middleX };
  const endNode = { y: Math.floor(middleY / 2), x: middleX };
  nodes[startNode.y][startNode.x].type = NodeTypes.start;
  nodes[endNode.y][endNode.x].type = NodeTypes.end;

  return {
    columns: cols,
    rows,
    nodes,
    startNode,
    endNode,
    pathfinding: pathfindingState.ready,
  };
}

const defaultState = initNodesState(COLS, ROWS);

const nodesSlice = createSlice({
  name: 'nodes',
  initialState: defaultState,
  reducers: {
    changeColumns: (state, { payload }) => { state.columns = payload; },
    changeRows: (state, { payload }) => { state.rows = payload; },
    startPathfinding: (state) => {
      if (state.pathfinding === pathfindingState.ready) {
        state.pathfinding = pathfindingState.running;
      }
    },
    endPathfinding: (state) => {
      if (state.pathfinding === pathfindingState.running) {
        state.pathfinding = pathfindingState.done;
      }
    },
    setNodesType: (state, action) => {
      switch (state.pathfinding) {
        case pathfindingState.ready: setNodesTypeReady(state, action); break;
        case pathfindingState.running: setNodesTypeRunning(state, action); break;
        case pathfindingState.done: setNodesTypeDone(state, action); break;
        default: break;
      }
    },
    clearNodes: clearNodesCase,
    resetNodes: () => defaultState
  }
});

const { actions, reducer } = nodesSlice;
export const {
  changeColumns,
  changeRows,
  startPathfinding,
  endPathfinding,
  setNodesType,
  clearNodes,
  resetNodes,
} = actions;
export default reducer;

function clearNodesCase(state) {
  state.nodes = clearNotToolNodes(state.nodes);
  state.pathfinding = pathfindingState.ready;
}

function setNodesTypeReady(state, { payload }) {
  const { nodes, type } = payload;
  const { startNode, endNode } = state;

  switch (type) {
    case NodeTypes.start:
    case NodeTypes.end: {
      // there can only be one start and one end node
      if (nodes.length !== 1) {
        return;
      }

      const node = nodes[0];
      if (isStartOrEndNode(node, startNode, endNode)) {
        return;
      }

      const changedNode = type === NodeTypes.start ? startNode : endNode;

      const { x: oldX, y: oldY } = changedNode;
      state.nodes[oldY][oldX].type = NodeTypes.empty;

      const { x: newX, y: newY } = node;

      changedNode.x = newX;
      changedNode.y = newY;
      state.nodes[newY][newX].type = type;
      break;
    }
    case NodeTypes.empty:
    case NodeTypes.wall: {
      const { nodes: stateNodes } = state;
      nodes.forEach(node => {
        if (isStartOrEndNode(node, startNode, endNode)) {
          return;
        }
        stateNodes[node.y][node.x].type = type;
      });
      break;
    }
    default: break;
  }
}

function setNodesTypeRunning(state, { payload }) {
  const { nodes, type } = payload;
  const { startNode, endNode } = state;

  switch (type) {
    case NodeTypes.visited:
    case NodeTypes.result: {
      nodes.forEach(node => {
        if (isStartOrEndNode(node, startNode, endNode)) {
          return;
        }
        const stateNode = state.nodes[node.y][node.x];
        stateNode.type = type;
        stateNode.visitedIndex = node.visitedIndex;

        if (type === NodeTypes.result) {
          state.pathfinding = pathfindingState.done;
        }
      });
      break;
    }
    default: break;
  }
}

function setNodesTypeDone(state, action) {
  clearNodesCase(state);
  setNodesTypeReady(state, action);
}