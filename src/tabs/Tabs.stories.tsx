import styled from 'styled-components'
import * as Tabs from '.'

export default { title: 'Components/Tabs' }

export const Primary = {
  render: () => (
    <Tabs.Root className="TabsRoot">
      <Tabs.List className="TabsList" aria-label="tabs example">
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">
        Dis metus rhoncus sit{' '}
        <span className="fancy">convallis sollicitudin</span> vel cum, hac purus
        tincidunt eros sem himenaeos integer, faucibus varius nullam nostra
        bibendum consectetur mollis, gravida elementum pellentesque volutpat
        dictum ipsum.
      </Tabs.Content>
      <Tabs.Content value="tab2">You'll never find me!</Tabs.Content>
      <Tabs.Content value="tab3">
        Ut nisi elementum metus semper mauris dui fames accumsan aenean,
        maecenas ac sociis dolor quam tempus pretium.
      </Tabs.Content>
    </Tabs.Root>
  ),
}

export const Styled = {
  render: () => (
    <Tabs.Root className="TabsRoot">
      <Tabs.List className="TabsList" aria-label="tabs example">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </Tabs.List>
      <TabsContent value="tab1">
        Dis metus rhoncus sit{' '}
        <span className="fancy">convallis sollicitudin</span> vel cum, hac purus
        tincidunt eros sem himenaeos integer, faucibus varius nullam nostra
        bibendum consectetur mollis, gravida elementum pellentesque volutpat
        dictum ipsum.
      </TabsContent>
      <TabsContent value="tab2">You'll never find me!</TabsContent>
      <TabsContent value="tab3">
        Ut nisi elementum metus semper mauris dui fames accumsan aenean,
        maecenas ac sociis dolor quam tempus pretium.
      </TabsContent>
    </Tabs.Root>
  ),
}

const TabsTrigger = styled(Tabs.Trigger)`
  button {
    background: none;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
  }

  button[aria-selected='true'] {
    color: teal;
    border-bottom: 4px solid teal;
  }
`

const TabsContent = styled(Tabs.Content)`
  padding: 1rem;
  font-size: 1.1rem;
  line-height: 1.65;

  .fancy {
    font-style: italic;
    color: teal;
  }
`
// import * as Tabs from '.';
// import mdx from './Button.mdx';
// export default {
//   title: 'Demo/Button',
//   parameters: {
//     docs: {
//       page: mdx,
//     },
//   },
//   component: Tabs,
// };
// export const Primary = () => <Tabs.Root>Basic</Tabs.Root>;
