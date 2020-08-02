import React from 'react';
import { toolTypes, nodeTypeColor } from '../nodes/NodeTypes';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setDrawTool } from '../tools/toolsSlice';
import InlineFlex from '../../components/InlineFlex';
import { TouchableWithoutFeedback, FlatList } from 'react-native';
import styled from 'styled-components/native';

const DrawToolButton = styled.View`
  background-color: ${(props) => nodeTypeColor[props.type]};
  width: 50px;
  height: 50px;
  border: 1px solid black;
  opacity: ${(props) => (props.selected ? 1 : 0.6)};
`;

const DrawToolPicker = () => {
  const dispatch = useDispatch();
  const selectedDrawToolType = useSelector(({ tools }) => tools.drawTool);

  const boundSetToolType = (toolType) => dispatch(setDrawTool(toolType));

  return (
    <InlineFlex>
      <FlatList
        style={{ maxHeight: 50 }}
        data={Array.from(toolTypes).map((type) => ({ key: type, data: type }))}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => boundSetToolType(item.data)}>
            <DrawToolButton
              type={item.data}
              selected={item.data === selectedDrawToolType}
            />
          </TouchableWithoutFeedback>
        )}
        horizontal={true}
      />
    </InlineFlex>
  );
};

export default DrawToolPicker;
