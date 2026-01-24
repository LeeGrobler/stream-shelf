import React from 'react'

type Props = Readonly<{
  onClick: () => void
  children: React.ReactNode
  className?: string
}>

const DirectoryButton = ({ onClick, children, className }: Props) => {
  return (
    <button onClick={onClick} className={`${className} flex items-center w-full gap-4 py-2 px-3 cursor-pointer`}>
      {children}
    </button>
  )
}


export default DirectoryButton