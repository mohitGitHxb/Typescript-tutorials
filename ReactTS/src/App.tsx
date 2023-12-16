import './App.css'
import Box from './components/Box'

function App() {

  return (
    <>
      <h1>Hello World</h1>
      <Box heading="Box 1" count={10} isShown children={<p>Some text</p>} />
      <Box heading="Box 1" count={10} children={<p>Some text222</p>} />
    </>
  )
}

export default App
