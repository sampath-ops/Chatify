import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/Login";
import SetAvatar from "./components/SetAvatar";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/" element={<Chat/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
