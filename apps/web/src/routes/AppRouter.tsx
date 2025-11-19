import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Classes } from "../pages/Classes";
import { ClassDetail } from "../pages/ClassDetail";
import { CreateAssignment } from "../pages/CreateAssignment";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/classes/:id" element={<ClassDetail />} />
      <Route
        path="/classes/:id/create-assignment"
        element={<CreateAssignment />}
      />
    </Routes>
  );
};
