
// this component receives buttons containing functions

import { ReactElement } from 'react'

type Props = Readonly<{
  children?: ReactElement
}>

const TestDown = ({ children }: Props) => {
  return (
    <>
      <p>Modal content here</p>

      {children ? children : (
        <div>
          fallback footer section with
          <button>fallback close button</button>
        </div>
      )}
    </>
  )
}

export default TestDown

// import { ReactElement, cloneElement } from 'react'

// type Clickable = {
//   onClick?: React.MouseEventHandler<HTMLElement>
// }

// type Props = Readonly<{
//   firstTrigger?: ReactElement<Clickable>
//   secondTrigger?: ReactElement<Clickable>
// }>

// const TestDown = ({ firstTrigger, secondTrigger }: Props) => {
//   const handleClickOne = () => {
//     console.log('button clicked!')
//   }

//   const handleClickTwo = () => {
//     console.log('nah, i\'m clicked!')
//   }

//   return (
//     <>
//       <p>click the button</p>

//       {firstTrigger && cloneElement(firstTrigger, { onClick: handleClickOne })}
//       {secondTrigger && cloneElement(secondTrigger, { onClick: handleClickTwo })}
//     </>
//   )
// }

// export default TestDown
