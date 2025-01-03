import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/index";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div>
      <div><Toaster/></div>
      <Routes>
        {routes.map((item, index) => {
          return <Route key={index} path={item.path} element={item.element} />;
        })}
      </Routes>
    </div>
  );
}

export default App;
