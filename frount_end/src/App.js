import { BrowserRouter, Routes, Route } from "react-router-dom";
import Announcements from "./pages/Announcements";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import EditAnnouncement from "./pages/EditAnnouncement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Announcements />} />
        <Route path="/create" element={<CreateAnnouncement />} />
        <Route path="/edit/:id" element={<EditAnnouncement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;