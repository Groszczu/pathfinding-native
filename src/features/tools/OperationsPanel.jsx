import React from 'react';
import { clearNodes, resetNodes } from '../nodes/nodesSlice';
import usePathfinding from '../../hooks/usePathfinding';
import { useDispatch } from 'react-redux';
import { pathfindingState } from '../nodes/nodesSlice';
import { useSelector } from 'react-redux';
import { mapAlgorithmIdToFunc } from '../../util/algorithms/algorithmId';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import StyledText from '../../components/StyledText';
import styled from 'styled-components/native';

const ButtonView = styled.View`
  max-height: 50px;
  margin: 5px;
  padding: 8px;
  border-radius: 5px;
  background-color: #888;
`;

const OperationButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ButtonView>
        <StyledText>{text}</StyledText>
      </ButtonView>
    </TouchableOpacity>
  );
};

const OperationsPanel = () => {
  const nodes = useSelector(({ nodes }) => nodes.nodes);
  const startNode = useSelector(({ nodes }) => nodes.startNode);
  const endNode = useSelector(({ nodes }) => nodes.endNode);
  const state = useSelector(({ nodes }) => nodes.pathfinding);
  const algorithmId = useSelector(({ tools }) => tools.pathfindingAlgorithm);
  const animationFrameTime = useSelector(
    ({ tools }) => tools.animationFrameTime
  );

  const dispatch = useDispatch();

  const algorithm = mapAlgorithmIdToFunc(algorithmId);
  const [pathfinding] = usePathfinding(
    nodes,
    startNode,
    endNode,
    algorithm,
    animationFrameTime
  );

  const startOnClick = () => pathfinding();
  const clearOnClick = () => {
    dispatch(clearNodes());
  };
  const resetOnClick = () => {
    dispatch(resetNodes());
  };

  return (
    <View style={styles.buttonsPanel}>
      {state === pathfindingState.ready ? (
        <OperationButton text={'Start'} onPress={startOnClick} />
      ) : (
        <OperationButton text={'Clear'} onPress={clearOnClick} />
      )}
      <OperationButton text={'Reset'} onPress={resetOnClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsPanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});

export default OperationsPanel;
