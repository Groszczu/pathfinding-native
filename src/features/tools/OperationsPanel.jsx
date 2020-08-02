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
  padding: 8px;
  border-radius: 5px;
  background-color: #888;
  height: 100%;
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledTouchable = styled.TouchableOpacity`
  margin: 5px;
  max-height: 60px;
  height: 30%;
  width: 50%;
  max-width: 100px;
`;

const OperationButton = ({ text, onPress }) => {
  return (
    <StyledTouchable onPress={onPress}>
      <ButtonView>
        <StyledText>{text}</StyledText>
      </ButtonView>
    </StyledTouchable>
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
  const [pathfinding, cancel] = usePathfinding(
    nodes,
    startNode,
    endNode,
    algorithm,
    animationFrameTime
  );

  const startOnClick = () => pathfinding();
  const clearOnClick = () => {
    cancel();
    dispatch(clearNodes());
  };
  const resetOnClick = () => {
    cancel();
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
