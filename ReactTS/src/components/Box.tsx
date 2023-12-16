
interface PropsType {
    heading: string,
    count?: number,
    isShown?: boolean,
    children?: React.ReactNode
}
const Box = ({heading,count,isShown,children}: PropsType) => {
  return (
    <div>
      <h1>{heading} Count == {count}</h1>
      {isShown && children}
    </div>
  )
}

export default Box
