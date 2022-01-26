import { useEffect, useState } from "react"
import io from "socket.io-client"
import { toast, ToastContainer } from "react-toastify"
import Navbar from "./components/Navbar"
import { Route, Routes, useNavigate } from "react-router-dom"
import SignUp from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import axios from "axios"
import SocketContext from "./utils/SocketContext"
import Messages from "./pages/Messages"

function App() {
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()

  const getProfile = async () => {
    const response = await axios.get("http://localhost:4000/api/auth/profile", {
      headers: {
        Authorization: localStorage.tokenSocket,
      },
    })
    setProfile(response.data)
  }

  useEffect(() => {
    if (localStorage.tokenSocket) getProfile()

    // socket.on("updateUsers", usernames => {
    //   setUsersList(usernames)
    // })
    // socket.on("receiveMessageChat", (senderUsername, message) => {
    //   console.log("received from chat:", senderUsername, "say:", message)
    //   const newMessage = {
    //     senderUsername,
    //     message,
    //   }

    //   setChatMessages(oldChatMessages => [...oldChatMessages, newMessage])
    // })

    // socket.on("receiveDirectMessage", (senderUsername, message) => {
    //   console.log("received direct message from:", senderUsername, "say:", message)
    //   const newMessage = {
    //     senderUsername,
    //     message,
    //   }

    //   setDirectMessages(oldDirectMessages => [...oldDirectMessages, newMessage])
    // })
  }, [])

  // const sendMessageChat = e => {
  //   e.preventDefault()
  //   const form = e.target
  //   const text = form.elements.messageText.value
  //   socket.emit("sendMessageChat", text)
  // }

  // const sendDirectMessage = e => {
  //   e.preventDefault()
  //   const form = e.target
  //   const receiverUsername = form.elements.receiverUsername.value
  //   const text = form.elements.messageText.value
  //   socket.emit("sendDirectMessage", receiverUsername, text)
  // }

  // const chooseUsername = e => {
  //   e.preventDefault()
  //   const form = e.target
  //   const username = form.elements.username.value
  //   socket.emit("chooseUsername", username)
  //   setUsername(username)
  // }

  const signup = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const userBody = {
        firstName: form.elements.firstName.value,
        lastName: form.elements.lastName.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
        avatar: form.elements.avatar.value,
      }

      await axios.post("http://localhost:4000/api/auth/signup", userBody)
      console.log("signup success")
      toast.success("user created")
      navigate("/login")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const login = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const userBody = {
        email: form.elements.email.value,
        password: form.elements.password.value,
      }

      const response = await axios.post("http://localhost:4000/api/auth/login", userBody)

      const token = response.data
      localStorage.tokenSocket = token

      getProfile()
      console.log("login success")

      navigate("/")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const logout = () => {
    localStorage.removeItem("tokenSocket")
    console.log("logout success")
  }

  const store = {
    login,
    logout,
    signup,
    profile,
  }

  return (
    <SocketContext.Provider value={store}>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:receiverId" element={<Messages />} />
      </Routes>
    </SocketContext.Provider>
  )

  // return (
  //   <div>
  //     {username ? (
  //       <>
  //         <h2>send message</h2>
  //         <h3>hello {username}</h3>
  //         <form onSubmit={sendMessageChat}>
  //           <h2>send to chat</h2>
  //           <label>type your message:</label>
  //           <input type="text" name="messageText" />
  //           <button type="submit">Send</button>
  //         </form>
  //         <h2>Users list</h2>
  //         {usersList.map(user => (
  //           <p key={user}>{user}</p>
  //         ))}
  //         <div>
  //           <h2>view chat messages</h2>
  //           {chatMessages.map(chatMessage => (
  //             <div key={`chat-message-${chatMessage.senderUsername}-${chatMessage.message}`}>
  //               <strong>{chatMessage.senderUsername}: </strong>
  //               <span>{chatMessage.message}</span>
  //             </div>
  //           ))}
  //         </div>
  //         <form onSubmit={sendDirectMessage}>
  //           <h2>send direct message</h2>
  //           <label>to who:</label>
  //           <select name="receiverUsername">
  //             {usersList.map(user => (
  //               <option key={user}>{user}</option>
  //             ))}
  //           </select>
  //           <br />
  //           <label>type your message:</label>
  //           <input type="text" name="messageText" />
  //           <button type="submit">Send</button>
  //         </form>
  //         <div>
  //           <h2>view direct messages</h2>
  //           {directMessages.map(directMessage => (
  //             <div key={`direct-message-${directMessage.senderUsername}-${directMessage.message}`}>
  //               <strong>{directMessage.senderUsername}: </strong>
  //               <span>{directMessage.message}</span>
  //             </div>
  //           ))}
  //         </div>
  //       </>
  //     ) : (
  //       <form onSubmit={chooseUsername}>
  //         <label>choose a username:</label>
  //         <input type="text" name="username" />
  //         <button type="submit">Choose</button>
  //       </form>
  //     )}
  //   </div>
  // )
}

export default App
