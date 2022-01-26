import { useContext } from "react"
import { Card, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import SocketContext from "../utils/SocketContext"

function MovieList(props) {
  const { listTitle, genreType } = props
  const { films } = useContext(SocketContext)
  let filmsGenre
  if (genreType) {
    filmsGenre = films.filter(film => film.genres.find(genre => genre.name === genreType))
  } else {
    filmsGenre = films
  }

  filmsGenre = filmsGenre.sort((a, b) => b.ratingAverage - a.ratingAverage)
  filmsGenre = filmsGenre.slice(0, 7)
  return (
    <>
      <Row>
        <h4 className="mt-5 mb-4">{listTitle}</h4>
      </Row>
      <Row>
        {filmsGenre.map(film => (
          <Col key={film._id}>
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
        ))}
      </Row>
    </>
  )
}

export default MovieList
