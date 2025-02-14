import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import Loading from "./components/Loading/Loading"

function App() {

  const Login = lazy(() => import("./components/Login/Login"))
  const Register = lazy(() => import("./components/Register/Register"))
  const TicTacToe = lazy(() => import("./components/TicTacToe/TicTacToe"))

  return (
    <BrowserRouter>
      <Suspense fallback={(<Loading></Loading>)}>
        <Routes>
          <Route path="/" element={<TicTacToe></TicTacToe>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
