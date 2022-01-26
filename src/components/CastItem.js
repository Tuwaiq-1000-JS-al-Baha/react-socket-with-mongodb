import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

function CastItem(props) {
  const { cast } = props
  return (
    <Col md="2">
      <Card border="light" style={{ maxWidth: "200px" }}>
        <Link to={`/${cast.type.toLowerCase()}/${cast._id}`}>
          <Card.Img
            variant="top"
            src={cast.photo}
            height="220px"
            style={{ borderRadius: "10px", objectFit: "cover" }}
          />
        </Link>
        <Card.Body>
          <Link
            to={`/${cast.type.toLowerCase()}/${cast._id}`}
            className="text-black"
            style={{ textDecoration: "none" }}
          >
            <Card.Title>
              {cast.firstName} {cast.lastName}
            </Card.Title>
          </Link>
          <Card.Text className="text-muted">{cast.type}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default CastItem
