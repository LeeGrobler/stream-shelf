// this component passes up functions that TestDown receives in buttons

import { useEffect } from "react"

export type DirectoryActions = {
  back: () => void
  select: () => void
}

type Props = {
  onReady?: (actions: DirectoryActions) => void
}

const TestUp = ({ onReady }: Props) => {
  const back = () => {
    // pass this function up
    console.log('you clicked the back button');
  }

  const select = () => {
    // pass this function up
    console.log('you clicked the select button');
  }

  const internalHandlerForSoemthing = () => {
    console.log('this stays internal to be used within TestUp');
  }

  useEffect(() => {
    onReady?.({ back, select })
  }, [onReady])

  return (
    <>
      <div>Directory picker content here</div>
      <button onClick={internalHandlerForSoemthing}>internal!</button>
    </>
  )
}

export default TestUp