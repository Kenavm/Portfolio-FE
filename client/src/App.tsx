import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
