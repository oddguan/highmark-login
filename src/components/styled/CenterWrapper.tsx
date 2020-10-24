import styled from 'styled-components';
/** App Theme */
import { colors } from '../../themes/colors';

const CenterWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  max-width: 50%;
  width: 100%;
  border: 1px solid ${colors.grey};
  margin: 20px auto !important;
  padding: 42px 24px 50px !important;
  background: ${colors.white};
  justify-content: space-around;
  input {
    text-align: center;
  }
`;

export default CenterWrapper;
