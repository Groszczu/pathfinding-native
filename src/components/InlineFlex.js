import styled from 'styled-components/native';

const InlineFlex = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: ${props => props.row ? 'row' : 'column'};
`;

export default InlineFlex;
