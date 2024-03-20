import { PropsWithChildren } from 'react'

export type ButtonProps = {
  variant?: 'primary' | 'secondary'
  children: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
  variant = 'primary',
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      {...props}
      style={{
        backgroundColor: variant === 'primary' ? 'teal' : '#1CE',
        color: 'white',
        padding: '10px 20px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}
