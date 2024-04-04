import { PropsWithChildren, useContext } from 'react'
import { TabContext } from '.'

export type ContentProps = {
  value: string
} & React.HTMLAttributes<HTMLDivElement>

export function Content(props: PropsWithChildren<ContentProps>) {
  const { selectedValue } = useContext(TabContext)

  return (
    <div {...props} hidden={selectedValue !== props.value}>
      {props.children}
    </div>
  )
}
