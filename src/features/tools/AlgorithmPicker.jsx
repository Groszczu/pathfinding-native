import React from 'react';
import algorithmId from '../../util/algorithms/algorithmId';
import { useDispatch, useSelector } from 'react-redux';
import { setPathfindingAlgorithm } from './toolsSlice';
import styled from 'styled-components';
import InlineFlex from '../../components/InlineFlex';
import Label from '../../shared/Label';

const Select = styled.select`
  width: 90%;
  border-radius: 5px;
  border: 3px solid black;
  font-size: inherit;
  padding: 0.2em 0.4em;
`;

const Option = styled.option`
`;

const AlgorithmPicker = () => {
  const selectedAlgorithm = useSelector(
    ({ tools }) => tools.pathfindingAlgorithm
  );
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setPathfindingAlgorithm(e.target.value));
  };
  return (
    <InlineFlex>
      <Label htmlFor={'algorithm-select'}>Algorithm</Label>
      <Select
        id={'algorithm-select'}
        onChange={handleChange}
        value={selectedAlgorithm}
      >
        {Object.entries(algorithmId).map(([key, value]) => (
          <Option
            key={key}
            value={value}
            isSelected={selectedAlgorithm === value}
          >
            {value}
          </Option>
        ))}
      </Select>
    </InlineFlex>
  );
};

export default AlgorithmPicker;
