import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { io } from "socket.io-client"
import SocketContext from "../utils/SocketContext"

const socket = io("ws://localhost:5000")

function Messages() {
  const { profile } = useContext(SocketContext)
  const { receiverId } = useParams()
  const [usersList, setUsersList] = useState([])
  const [directMessages, setDirectMessages] = useState([])

  useEffect(async () => {
    socket.emit("start", localStorage.tokenSocket)
    socket.on("updateUsers", users => {
      setUsersList(users)
    })

    if (receiverId) {
      socket.on("receiveDirectMessage", (senderUser, message) => {
        const newMessage = {
          sender: senderUser,
          message: message,
        }
        setDirectMessages(oldDirectMessages => [...oldDirectMessages, newMessage])
      })
    }
  }, [])

  useEffect(async () => {
    if (receiverId) {
      const response = await axios.get(`http://localhost:4000/api/messages/${receiverId}`, {
        headers: {
          Authorization: localStorage.tokenSocket,
        },
      })
      setDirectMessages(response.data)
    }
  }, [receiverId])

  const sendDirectMessage = e => {
    e.preventDefault()
    const form = e.target
    const message = form.elements.message.value
    socket.emit("sendDirectMessage", receiverId, message)
    form.reset()
  }

  return (
    <Container>
      <h1>Messages Page</h1>
      <p>Hello {profile?.firstName}</p>
      <Row>
        <Col>
          <h2>Users list:</h2>
          <ListGroup>
            {usersList.map(user => (
              <ListGroup.Item key={user._id}>
                <Link to={`/messages/${user._id}`}>
                  {user.firstName} {user.lastName}
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          {receiverId ? (
            <>
              <h2>Direct Messages</h2>
              <ListGroup>
                {directMessages.map(directMessage => (
                  <ListGroup.Item key={directMessage._id}>
                    <strong>{directMessage.sender.firstName}:</strong> {directMessage.message}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Form onSubmit={sendDirectMessage}>
                <Form.Label>Send:</Form.Label>
                <Form.Control as="textarea" name="message" />
                <Button type="submit">send</Button>
              </Form>
            </>
          ) : null}
        </Col>
      </Row>
    </Container>
  )
}

export default Messages
