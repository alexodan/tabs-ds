import { PropsWithChildren, useContext, useEffect, useRef } from 'react'
import { TabContext } from '.'
import styled from 'styled-components'

export type TriggerProps = {
  value: string
} & React.HTMLAttributes<HTMLLIElement>

const StyledTrigger = styled.li`
  display: inline-block;

  button {
    background: none;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
  }

  button[aria-selected='true'] {
    border-bottom: 2px solid teal;
  }
`

export function Trigger(props: PropsWithChildren<TriggerProps>) {
  const {
    selectedValue,
    tabs,
    onTriggerClick,
    registerTab,
    deRegisterTab,
    changeFocus,
  } = useContext(TabContext)

  const buttonRef = useRef<HTMLButtonElement>(
    null
  ) as React.MutableRefObject<HTMLButtonElement>

  useEffect(() => {
    const node = buttonRef.current
    registerTab({ value: props.value, triggerRef: node })
    return () => {
      // should I even bother with this? Tabs are not removable
      deRegisterTab({ value: props.value, triggerRef: node })
    }
  }, [props.value, registerTab, deRegisterTab])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight') {
      const nextTab = tabs.findIndex(tab => tab.value === props.value) + 1
      if (nextTab < tabs.length) {
        changeFocus(tabs[nextTab].value)
      }
    }
    if (event.key === 'ArrowLeft') {
      const prevTab = tabs.findIndex(tab => tab.value === props.value) - 1
      if (prevTab >= 0) {
        changeFocus(tabs[prevTab].value)
      }
    }
  }

  const isFirstTab = tabs[0]?.value === props.value
  const isLastTab = tabs[tabs.length - 1]?.value === props.value

  console.log('Trigger', props.value, isFirstTab, isLastTab)

  return (
    <StyledTrigger {...props}>
      <button
        ref={buttonRef}
        onClick={() => {
          onTriggerClick(props.value)
        }}
        aria-selected={selectedValue === props.value}
        tabIndex={selectedValue ? (selectedValue === props.value ? 0 : -1) : 0}
        onKeyDown={handleKeyDown}
      >
        {props.children}
      </button>
    </StyledTrigger>
  )
}
