import { useContext } from "react"
import { Col, Form, Button, Row } from "react-bootstrap"
import SocketContext from "../utils/SocketContext"

function AddComment(props) {
  const { addComment } = useContext(SocketContext)
  const { filmId } = props
  return (
    <div className="ms-4">
      <h1>Add Comment</h1>
      <Form className="mt-5" onSubmit={e => addComment(e, filmId)}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md="2">
            Comment
          </Form.Label>
          <Col md="6">
            <Form.Control as="textarea" name="comment" required />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="my-4">
          <Col md={{ span: 10, offset: 2 }}>
            <Button type="submit">Add</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}

export default AddComment
