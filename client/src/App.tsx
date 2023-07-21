import { Route, Routes } from "react-router-dom";

import { HeaderMenu } from "./components/HeaderMenu";
import { HomeGrid } from "./pages/Home";
import { QueueLayout } from "./pages/Queue";

const App = () => {
  return (
    <>
      <HeaderMenu />
      <Routes>
        <Route path="/" element={<HomeGrid />} />
        <Route path="/:host/:name" element={<QueueLayout />} />
      </Routes>
    </>
  );
};

export default App;
