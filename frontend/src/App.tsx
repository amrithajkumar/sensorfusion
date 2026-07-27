import { Route, Routes } from 'react-router-dom'
import About from './pages/About/About'
import Analytics from './pages/Analytics/Analytics'
import Dashboard from './pages/Dashboard/Dashboard'
import History from './pages/History/History'
import MainLayout from './layouts/MainLayout'
import Prediction from './pages/Prediction/Prediction'
import Quantum from './pages/Quantum/Quantum'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/history" element={<History />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/quantum" element={<Quantum />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
