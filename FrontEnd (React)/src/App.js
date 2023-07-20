import './App.css';
import Register from './components/RegisterCard';
import Login from './components/LoginCard';
import Layout from './components/Layout';
import NewsFeed from './components/NewsFeed';
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Register />} />
        <Route path="Login" element={<Login />} />
        <Route path="NewsFeed" element={<NewsFeed />} />
        <Route path="Profile" element={<Profile />} />

        {/* <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
