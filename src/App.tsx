import Button from './button'
import { Tabs } from './library'

function App() {
  return (
    <>
      <h1>Playground</h1>
      <h2>Buttons</h2>
      <Button>Click me</Button>
      <Button variant="secondary">Secondary</Button>
      <hr />
      <h2>Tabs</h2>
      <Tabs.Root className="TabsRoot">
        <Tabs.List className="TabsList" aria-label="Manage your account">
          <Tabs.Trigger className="TabsTrigger" value="tab1">
            Account
          </Tabs.Trigger>
          <Tabs.Trigger className="TabsTrigger" value="tab2">
            Password
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tab1">
          Tab content 1
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2">
          Tab content 2
        </Tabs.Content>
      </Tabs.Root>
    </>
  )
}

export default App
