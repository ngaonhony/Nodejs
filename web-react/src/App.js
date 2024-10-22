import { Routes, Route} from 'react-router-dom'
import { Home, Login ,Detailpage} from './pages'
import { path} from './ultils/constant'

function App() {
  return (
    <div className="h-screen w-screen bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.Detailpage} element={<Detailpage />} />
        

      </Routes>
    </div>
  );
}

export default App;
