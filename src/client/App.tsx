import { FC } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

import './static/styles/main.scss?global'


const App: FC = () => {
  return <>
    <Navbar bg="dark" variant="dark" sticky="top" >
      <Container>
        <Navbar.Brand href="/">App Template</Navbar.Brand>
      </Container>
    </Navbar>
  </>
}

export default App
