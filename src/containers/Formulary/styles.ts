import styled from 'styled-components'

export const Form = styled.form`
  max-width: 547px;
  width: 100%;
  font-weight: bold;
  font-size: 14px;
  color: #666666;

  textarea {
    resize: none;
    margin: 16px 0;
    height: 80px;
  }
`
export const Label = styled.label`
  display: block;
  padding: 8px 0;
`

export const Options = styled.div`
  margin-bottom: 16px;

  label {
    margin-right: 6px;
  }
`
export const Option = styled.div`
  display: inline;
  text-transform: capitalize;
`
