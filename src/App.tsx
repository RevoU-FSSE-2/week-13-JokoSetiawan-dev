import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, RegisterPage, LoginPage } from "../src/pages";
import { MainLayout } from "./layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage data={[]} />
            </MainLayout>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
