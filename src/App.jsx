import { BrowserRouter, Route, Routes } from "react-router"
import Header from "./components/common/Header"
import Home from "./components/Layout/Home"
import About from "./components/Layout/About"
import ExcelUploader from "./demo"

function App() {

  return (
    <>
    <ExcelUploader />
    </>
  )
}

export default App
