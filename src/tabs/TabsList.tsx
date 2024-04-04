import { PropsWithChildren } from 'react'
import styled from 'styled-components'

export type ListProps = React.HTMLAttributes<HTMLUListElement>

export const StyledTabsList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #ccc;
`

export function List(props: PropsWithChildren<ListProps>) {
  return (
    <StyledTabsList {...props} role="tablist">
      {props.children}
    </StyledTabsList>
  )
}
