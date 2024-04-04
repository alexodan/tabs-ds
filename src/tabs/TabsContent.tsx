import { PropsWithChildren, forwardRef, useContext } from 'react'
import { TabContext } from '.'

type TabsContentElement = React.ElementRef<'div'>

export type ContentProps = {
  value: string
} & React.HTMLAttributes<HTMLDivElement>

export const Content = forwardRef<TabsContentElement, ContentProps>(
  (props: PropsWithChildren<ContentProps>, forwardedRef) => {
    const { selectedValue, tabs } = useContext(TabContext)

    const tabNumber = tabs.findIndex(tab => tab.value === props.value) + 1

    return (
      <div
        {...props}
        ref={forwardedRef}
        hidden={selectedValue !== props.value}
        id={`tab-content-${tabNumber}`}
      >
        {props.children}
      </div>
    )
  },
)
