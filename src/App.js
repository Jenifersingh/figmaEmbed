import React from "react";

import logo from "./logo.svg";
import "./App.css";
import { Main } from "./figma/main";
import { KanbanDND } from "./dndkanban";

export default function App() {
  return (
    <div>
      {/* <Main /> */}
      <KanbanDND />
    </div>
  );
}
