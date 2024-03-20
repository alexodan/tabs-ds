import { PropsWithChildren, useContext } from 'react'
import { TabContext } from '.'
import styled from 'styled-components'

export type TriggerProps = {
  value: string
} & React.HTMLAttributes<HTMLLIElement>

const StyledTrigger = styled.li`
  display: inline-block;

  button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
  }

  button[aria-selected='true'] {
    background-color: teal;
    color: white;
  }
`

export function Trigger(props: PropsWithChildren<TriggerProps>) {
  const { value, onTriggerClick } = useContext(TabContext)

  return (
    <StyledTrigger {...props}>
      <button
        onClick={() => {
          onTriggerClick(props.value)
        }}
        aria-selected={value === props.value}
      >
        {props.children}
      </button>
    </StyledTrigger>
  )
}
