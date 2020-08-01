import styled from 'styled-components/native';

const GridContainer = styled.View`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  max-width: ${ props => 16 * props.columns}px;
  max-height: ${ props => 16 * props.rows}px;
  justify-content: center;
  align-items: flex-start;

  margin: 0 auto;
  user-select: none;

  z-index: 1;
`;

export default GridContainer;
