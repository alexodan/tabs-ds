import { PropsWithChildren, useContext } from 'react'
import { TabContext } from '.'

export type ContentProps = {
  value: string
} & React.HTMLAttributes<HTMLDivElement>

export function Content(props: PropsWithChildren<ContentProps>) {
  const { value } = useContext(TabContext)

  return (
    <div {...props} hidden={value !== props.value}>
      {props.children}
    </div>
  )
}
