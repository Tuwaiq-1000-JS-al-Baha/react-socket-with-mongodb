import { useContext } from "react"
import { Form, Col, Row, Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import SocketContext from "../utils/SocketContext"

function ResetPassword() {
  const { resetPassword } = useContext(SocketContext)
  const { token } = useParams()

  return (
    <div className="ms-4">
      <h1>Reset Password</h1>
      <Form className="mt-5" onSubmit={e => resetPassword(e, token)}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md="2">
            Password
          </Form.Label>
          <Col md="6">
            <Form.Control type="password" name="password" required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md="2">
            Password Confirmation
          </Form.Label>
          <Col md="6">
            <Form.Control type="password" name="passwordConfirmation" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="my-4">
          <Col md={{ span: 10, offset: 2 }}>
            <Button type="submit">Reset Password</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}

export default ResetPassword
