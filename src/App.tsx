import { version } from "react";
import "./App.css";
import { Form } from "./form";

function App() {
  return (
    <>
      <h1>Using React v{version}</h1>
      <Form />
    </>
  );
}

export default App;
