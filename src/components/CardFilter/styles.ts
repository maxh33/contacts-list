import styled from 'styled-components'

type Props = {
  $active: boolean
}

export const Card = styled.div<Props>`
  padding: 8px;
  border: 1px solid ${(props) => (props.$active ? '#1E90FF' : '#a1a1a1')};
  background-color: ${(props) => (props.$active ? '#fff' : '#fcfcfc')};
  color: ${(props) => (props.$active ? '#1E90FF' : '#5e5e5e')};
  border-radius: 8px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.$active ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`

export const Counter = styled.span`
  font-weight: bold;
  font-size: 24px;
  display: block;
  margin-bottom: 4px;
`

export const Label = styled.span`
  font-size: 14px;
  text-transform: capitalize;
`
