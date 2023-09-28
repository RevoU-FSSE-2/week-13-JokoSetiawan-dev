import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, RegisterPage, LoginPage } from "../src/pages";
import { MainLayout } from "./layout";
import { NewCategory, EditCategory } from "./components";

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
        <Route path="/newcategory" element={<NewCategory />} />
        <Route path="/category/update/:id" element={<EditCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
