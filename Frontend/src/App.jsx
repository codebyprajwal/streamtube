import 'regenerator-runtime/runtime'
import SignIn from "./Components/Auth/SignIn"
import SignUp from "./Components/Auth/SignUp";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VideoPlayer from './pages/VideoPlayer';
import Search from './pages/Search';

function App() {
      return (
            <Routes>
                  <Route path="/login" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/Video/:id" element={<VideoPlayer />} />
                  <Route path="/search/:id" element={<Search />} />
                  <Route path="/" element={<Home />} />
            </Routes>
      );
}

export default App
