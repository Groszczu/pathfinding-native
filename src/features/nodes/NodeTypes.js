import { css } from 'styled-components';

const NodeTypes = {
  empty: 'empty_node',
  wall: 'wall_node',
  visited: 'visited_node',
  result: 'result_node',
  start: 'start_node',
  end: 'end_node',
};

export const changeableTypes = new Set([
  NodeTypes.empty,
  NodeTypes.wall,
  NodeTypes.visited,
  NodeTypes.result,
]);

export const toolTypes = new Set([
  NodeTypes.empty,
  NodeTypes.wall,
  NodeTypes.start,
  NodeTypes.end,
]);

export function isChangeableType(type) {
  return changeableTypes.has(type);
}

export function isToolType(type) {
  return toolTypes.has(type);
}

export const nodeTypeColor = {
  [NodeTypes.empty]: '#ffeadb',
  [NodeTypes.wall]: '#1f1a16',
  [NodeTypes.visited]: '#00a7e9',
  [NodeTypes.result]: '#f7bd00',
  [NodeTypes.start]: '#3cc200',
  [NodeTypes.end]: '#ff0000',
};

export const nodeTypeStyle = {
  [NodeTypes.empty]: '',
  [NodeTypes.wall]: css`
    background-color: ${nodeTypeColor[NodeTypes.wall]};
  `,
  [NodeTypes.visited]: css`
    background-color: ${nodeTypeColor[NodeTypes.visited]};
  `,
  [NodeTypes.result]: css`
    background-color: ${nodeTypeColor[NodeTypes.result]};
    transition: background-color 0.5s;
  `,
  [NodeTypes.start]: css`
    background-color: ${nodeTypeColor[NodeTypes.start]};
    box-shadow: 0px 0px 10px rgba(9, 135, 0, 1);
    z-index: 3;
  `,
  [NodeTypes.end]: css`
    background-color: ${nodeTypeColor[NodeTypes.end]};
    box-shadow: 0px 0px 10px rgba(252, 3, 3, 1);
    z-index: 3;
  `,
};

export default NodeTypes;
