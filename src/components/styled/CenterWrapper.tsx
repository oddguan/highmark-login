import styled from 'styled-components';
/** App Theme */
import { colors } from '../../themes/colors';

const CenterWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  max-width: 90%;
  width: 100%;
  border: 1px solid ${colors.grey};
  margin: 20px auto !important;
  padding: 10px 10px;
  background: ${colors.white};
  justify-content: space-around;
  input {
    text-align: center;
  }
`;

export default CenterWrapper;
