import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

function MovieItem(props) {
  const { film } = props
  return (
    <Col>
      <Card border="light" style={{ maxWidth: "200px" }}>
        <Link to={`/film/${film._id}`}>
          <Card.Img variant="top" src={film.poster} height="220px" style={{ borderRadius: "10px" }} />
        </Link>
        <Card.Body>
          <Link to={`/film/${film._id}`} className="text-black" style={{ textDecoration: "none" }}>
            <Card.Title>{film.title}</Card.Title>
          </Link>
          <Card.Text className="text-muted">{film.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default MovieItem
