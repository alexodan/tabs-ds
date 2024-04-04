import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'

export type RootProps = {
  defaultValue?: string
} & React.HTMLAttributes<HTMLDivElement>

export type TabContext = {
  selectedValue: string
  setValue: (value: string) => void
  onTriggerClick: (value: string) => void
  tabs: Tab[]
  setTabs: (tabs: Tab[]) => void
  registerTab: (tab: Tab) => void
  deRegisterTab: (tab: Tab) => void
  changeFocus: (value: string) => void
}

export const TabContext = createContext<TabContext>({
  selectedValue: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setValue: (_value: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTriggerClick: (_value: string) => {},
  tabs: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTabs: (_tabs: Tab[]) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerTab: (_value: Tab) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deRegisterTab: (_value: Tab) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changeFocus: (_value: string) => {},
})

export type Tab = {
  value: string
  triggerRef: HTMLButtonElement | undefined
}

// TODO
// - Figure out how to allow user to pass in their own styles (sx)
export function Root(props: PropsWithChildren<RootProps>) {
  const [tabValue, setTabValue] = useState(props.defaultValue)
  const [tabs, setTabs] = useState<Tab[]>([])

  const handleTriggerClick = (value: string) => {
    console.log('handleTriggerClick', value)
    setTabValue(value)
  }

  const registerTab = useCallback((tab: Tab) => {
    setTabs(prev => [...prev, tab])
  }, [])

  const deRegisterTab = useCallback((tab: Tab) => {
    setTabs(prev => prev.filter(obj => obj.value !== tab.value))
  }, [])

  const changeFocus = useCallback(
    (value: string) => {
      console.log('changeFocus', value)
      const tab = tabs.find(tab => tab.value === value)
      if (tab && tab.triggerRef) {
        tab.triggerRef.focus()
      }
    },
    [tabs],
  )

  // Set the first tab as the default tab
  useEffect(() => {
    if (tabs.length > 0 && !tabValue && !props.defaultValue) {
      const firstTab = tabs[0]
      setTabValue(firstTab.value)
    }
  }, [tabs, tabValue, props.defaultValue])

  const selectedValue = tabValue || props.defaultValue || ''

  console.log('Root', selectedValue)

  return (
    <TabContext.Provider
      value={{
        selectedValue,
        setValue: setTabValue,
        onTriggerClick: handleTriggerClick,
        tabs,
        setTabs,
        registerTab,
        deRegisterTab,
        changeFocus,
      }}
    >
      <div {...props}>{props.children}</div>
    </TabContext.Provider>
  )
}
