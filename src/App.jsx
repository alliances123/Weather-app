import { Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from './components/Navbar';
import Drawer from './components/Drawer';
import MapPicker from './components/MapPicker';

function App({ }) {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <BrowserRouter>
        <Drawer />
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/map-picker' element={<MapPicker />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App