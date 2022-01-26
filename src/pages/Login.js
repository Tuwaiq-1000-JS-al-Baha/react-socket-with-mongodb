import { useContext } from "react"
import { Form, Col, Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import SocketContext from "../utils/SocketContext"

function Login() {
  const { login } = useContext(SocketContext)

  return (
    <div className="ms-4">
      <h1>Login</h1>
      <Form className="mt-5" onSubmit={login}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md="2">
            Email
          </Form.Label>
          <Col md="6">
            <Form.Control type="email" name="email" required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md="2">
            Password
          </Form.Label>
          <Col md="6">
            <Form.Control type="password" name="password" required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={{ span: 10, offset: 2 }}>
            <Link to="/forgot-password" className="btn btn-outline-primary">
              Forgot password
            </Link>
          </Form.Label>
        </Form.Group>

        <Form.Group as={Row} className="my-4">
          <Col md={{ span: 10, offset: 2 }}>
            <Button type="submit">Login</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Login
