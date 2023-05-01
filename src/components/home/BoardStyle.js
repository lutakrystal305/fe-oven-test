import styled from 'styled-components';

export const Button = styled.button`
  color: ${(props) => props.theme.color.primaryColor};
  background-color: ${(props) => props.theme.color.backgroundColor};
`;
