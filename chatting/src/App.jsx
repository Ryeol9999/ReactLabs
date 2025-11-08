import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";
import RoomList from "./pages/RoomList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoomList />} />
        <Route path="/chat/:roomId" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
