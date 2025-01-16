import styled, { createGlobalStyle, css } from 'styled-components'
import variables from './variables'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;
  }
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 224px auto;
`

export const MainContainer = styled.main`
  padding: 0 40px;
  height: 100vh;
  overflow-y: scroll;
  background-color: #${variables.green};
`
export const Title = styled.h2`
  display: block;
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: bold;
`
const baseInputStyles = css`
  border-radius: 8px;
  border: 1px solid ${variables.lightGray};
  color: ${variables.lightGray};
  background-color: #fff;
  padding: 8px;
  font-weight: bold;
  width: 100%;
  transition: border-color 0.3s ease;
  margin-bottom: 8px;
  &:focus {
    border-color: ${variables.darkBlue};
    outline: none;
  }
`

export const Field = styled.input`
  ${baseInputStyles}

  ${(props) =>
    props.disabled &&
    `
    border: none;
    background-color: transparent;
  `}
`

export const TextArea = styled.textarea`
  ${baseInputStyles}
  resize: none;

  ${(props) =>
    props.disabled &&
    `
    border: none;
    background-color: transparent;
  `}
`
export const Button = styled.button`
  font-weight: bold;
  font-size: 12px;
  color: #fff;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  background-color: ${variables.darkBlue};
  border-radius: 8px;
  margin-right: 8px;
`

export const SaveButton = styled(Button)`
  background-color: ${variables.green};
`

export default GlobalStyle
