  import { Routes, Route} from 'react-router-dom'
  import { Home, Login,Register,ForgetPassword,DetailPage,ServicePage,FeedbackPage} from './pages'
  import { path} from './ultils/constant'

  function App() {
    return (
      <div className="h-screen w-screen bg-primary">
        <Routes>
          <Route path={path.Home} element={<Home />} />
          <Route path={path.Login} element={<Login />} />
          <Route path={path.Register} element={<Register />} />
          <Route path={path.ForgetPassword} element={<ForgetPassword />} />
          <Route path={path.DetailPage} element={<DetailPage />} />
          <Route path={path.ServicePage} element={<ServicePage />} />
          <Route path={path.FeedbackPage} element={<FeedbackPage />} />
        </Routes>
      </div>
    );
  }

  export default App;
