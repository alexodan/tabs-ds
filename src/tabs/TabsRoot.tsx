import { createContext, PropsWithChildren, useState } from 'react'

export type RootProps = {
  defaultValue?: string
} & React.HTMLAttributes<HTMLDivElement>

export type TabContext = {
  value: string
  setValue: (value: string) => void
  onTriggerClick: (value: string) => void
}

export const TabContext = createContext<TabContext>({
  value: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setValue: (_value: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTriggerClick: (_value: string) => {},
})

export function Root(props: PropsWithChildren<RootProps>) {
  const [tabValue, setTabValue] = useState(props.defaultValue)

  const handleTriggerClick = (value: string) => {
    console.log('handleTriggerClick', value)
    setTabValue(value)
  }

  // TODO: use useEffect to grab first value from children
  const value = tabValue || props.defaultValue || ''

  return (
    <div {...props}>
      <TabContext.Provider
        value={{
          value,
          setValue: setTabValue,
          onTriggerClick: handleTriggerClick,
        }}
      >
        {props.children}
      </TabContext.Provider>
    </div>
  )
}
