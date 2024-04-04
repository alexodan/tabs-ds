import {
  PropsWithChildren,
  PropsWithoutRef,
  forwardRef,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { TabContext } from '.'
import styled from 'styled-components'

type TabsTriggerElement = React.ElementRef<'button'>
type ButtonProps = PropsWithoutRef<React.ComponentProps<'button'>>

interface TabsTriggerProps extends ButtonProps {
  value: string
}

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

  button:active {
    outline: 2px solid blue;
  }

  button:focus {
    outline: 2px solid blue;
  }

  button[aria-selected='true'] {
    border-bottom: 2px solid teal;
  }
`

export const Trigger = forwardRef<
  TabsTriggerElement,
  PropsWithChildren<TabsTriggerProps>
>((props, forwardedRef) => {
  const {
    selectedValue,
    tabs,
    onTriggerClick,
    registerTab,
    deRegisterTab,
    changeFocus,
  } = useContext(TabContext)

  const { disabled = false, value, ...rest } = props

  const buttonRef = (forwardedRef ??
    useRef<HTMLButtonElement>()) as React.MutableRefObject<HTMLButtonElement>

  useEffect(() => {
    const node = buttonRef.current
    registerTab({ value: props.value, triggerRef: node })
    return () => {
      // should I even bother with this? Tabs are not removable
      deRegisterTab({ value: props.value, triggerRef: node })
    }
  }, [props.value, registerTab, deRegisterTab])

  // TODO: when tab is disabled, focus should skip over it, now is just stuck
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight') {
      const rightTabs = tabs.slice(
        tabs.findIndex(tab => tab.value === props.value) + 1,
      )
      const firstEnabledTab = rightTabs.find(tab => !tab.triggerRef?.disabled)
      if (firstEnabledTab) {
        changeFocus(firstEnabledTab.value)
      }
    } else if (event.key === 'ArrowLeft') {
      const leftTabs = tabs.slice(
        0,
        tabs.findIndex(tab => tab.value === props.value),
      )
      const firstEnabledTab = leftTabs
        .reverse()
        .find(tab => !tab.triggerRef?.disabled)
      if (firstEnabledTab) {
        changeFocus(firstEnabledTab.value)
      }
    }
  }

  const tabNumber = tabs.findIndex(tab => tab.value === props.value) + 1
  const isFirstTab = tabs[0]?.value === props.value
  const isLastTab = tabs[tabs.length - 1]?.value === props.value

  console.log('Trigger', props.value, isFirstTab, isLastTab)

  return (
    <StyledTrigger>
      <button
        {...rest}
        disabled={disabled}
        ref={buttonRef}
        onClick={() => {
          onTriggerClick(props.value)
        }}
        aria-selected={selectedValue === props.value}
        role="tab"
        aria-controls={`content-tab-${tabNumber}`}
        tabIndex={selectedValue ? (selectedValue === props.value ? 0 : -1) : 0}
        onKeyDown={handleKeyDown}
      >
        {props.children}
      </button>
    </StyledTrigger>
  )
})
