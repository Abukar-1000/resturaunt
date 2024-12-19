import logo from './logo.svg';
import './App.css';
import { CustomImg } from './CustomImg';

import {
  createBrowserRouter,
  useLocation,
  useParams,
} from "react-router-dom";
import "./index.css";
import { useEffect, useState } from 'react';
import { Carousel } from './Carousel';
import UpdateMenue from './Update/Menue/UpdateMenue';

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
  },
  {
    path: "/:imgName",
    element: <App />,
  },
  {
    path: "slides",
    element: <Carousel />
  },
  {
    path: "/update/menue",
    element: <UpdateMenue />,
    errorElement: <h1>Error was err</h1>
  },
  {
    path: "/update/slideshow",
    element: <h1>Hi from slideshow</h1>
  }
]);


function App({ children }) {
  let params = useParams();
  let [state, setState] = useState({
    file: params["*"] == ""? "menu": params["imgName"]
  })

  let minutes = 238;
  let time = minutes * (60 * 1000);
  let intervalId = null;
  useEffect(() => {
    intervalId = setInterval(() => {
      window.location.reload();
    }, time);

    return () => { clearInterval(intervalId); }
  }, [intervalId]);

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
