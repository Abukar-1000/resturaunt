import logo from './logo.svg';
import './App.css';
import { CustomImg } from './CustomImg';

import {
  createBrowserRouter,
  useLocation,
  useParams,
} from "react-router-dom";
import "./index.css";
import { useState } from 'react';

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
  },
  {
    path: "/:imgName",
    element: <App />,
  },
]);

function App({ children }) {
  let params = useParams();
  let file = params["imgName"];
  let [state, setState] = useState({
    file: params["*"] == ""? "menu": params["imgName"]
  })

  // let file = "params.img";
  console.log("param:", params);
  console.log(params);
  return (
    <div className="App">
      <CustomImg imgName={state.file + ".png"}/>
    </div>
  );
}

export default router;
