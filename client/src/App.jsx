import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Chat from './pages/chat';
import Signup from './pages/signup';
import ProfileModal from './miscellaneous/profileModal';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path = "/chat" element = {<Chat/>}/>
        <Route path = "/signup" element= {<Signup/>}/>
        <Route path = "/profileModal" element = {<ProfileModal/>}/>
      </Routes>
    </BrowserRouter>
      <Toaster
          position="top-left"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "14px",
              padding: "16px 24px",
              backgroundColor: "#ffffff",
              color: "#333333",
            },
          }}
      />
    </>
  );
}

export default App;