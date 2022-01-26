import { useContext } from "react"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { toast } from "react-toastify"
import SocketContext from "../utils/SocketContext"

function OneStar(props) {
  const { fill, setFill, starNumber, filmId, setShow } = props
  const { addRating } = useContext(SocketContext)
  return starNumber <= fill ? (
    <AiFillStar
      size="25"
      onMouseOver={() => setFill(starNumber)}
      onClick={() => {
        if (localStorage.tokenFilms) addRating(filmId, starNumber)
        else toast.error("please login first")
        setShow(false)
      }}
    />
  ) : (
    <AiOutlineStar size="25" onMouseOver={() => setFill(starNumber)} />
  )
}

export default OneStar
