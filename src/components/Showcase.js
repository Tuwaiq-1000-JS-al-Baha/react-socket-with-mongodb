import { useContext } from "react"
import { Col, Form, Row, Button } from "react-bootstrap"
import SocketContext from "../utils/SocketContext"

function Showcase() {
  return (
    <Row>
      <Col>
        <h1 className="text-white mb-3">Welcome</h1>
        <h2 className="text-white"> Millions of movies, TV shows and people to discover. Explore now.</h2>
      </Col>
    </Row>
  )
}

export default Showcase
