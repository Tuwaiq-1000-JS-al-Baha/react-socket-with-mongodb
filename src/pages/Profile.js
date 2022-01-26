import { useContext } from "react"
import { Col, Container, Row } from "react-bootstrap"

import MovieItem from "../components/MovieItem"
import SocketContext from "../utils/SocketContext"

function Profile() {
  const { profile } = useContext(SocketContext)
  if (!profile) return <h1>Loading...</h1>
  return (
    <Container>
      <Row
        style={{
          backgroundColor: `rgba(50,12,240, 0.3)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col md="4">
          <img variant="top" src={profile.avatar} width="100%" style={{ borderRadius: "10px", margin: "20px" }} />
        </Col>
        <Col>
          <h1>
            {profile.firstName} {profile.lastName}
          </h1>

          <p>{profile.email}</p>
        </Col>
      </Row>
      <Row className="mt-5">
        <h3>Favourite movies</h3>
        {profile.likes.map(film => (
          <MovieItem film={film} key={film._id} />
        ))}
      </Row>
    </Container>
  )
}

export default Profile
