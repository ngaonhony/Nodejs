  import { Routes, Route} from 'react-router-dom'
<<<<<<< HEAD
  import { Home, Login,Register,ForgetPassword,DetailPage,ServicePage,FeedbackPage,NewPost,ManagePostPage,UpdateProfilePage,PaymentHistoryPage,RechargeHistoryPage,RechargePage} from './pages'
=======
  import { Home, Login,Register,ForgetPassword,DetailPage,ServicePage,FeedbackPage,NewPost} from './pages'
  import { path} from './ultils/constant'
>>>>>>> 37e95e4197e0625927b991571ca292b2cdd97a3a

  function App() {
    return (
      <div className="h-screen w-screen bg-primary">
        <Routes>
<<<<<<< HEAD
          <Route path='/*' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path= '/detail-page' element={<DetailPage />} />
          <Route path='/service-page' element={<ServicePage />} />
          <Route path='/feedback-page' element={<FeedbackPage />} />
          <Route path='/management/new-post' element={<NewPost />} />
          <Route path='/management/manage-post-page' element={<ManagePostPage />} />
          <Route path='/management/update-profile-page' element={<UpdateProfilePage />} />
          <Route path='/management/payment-history-page' element={<PaymentHistoryPage />} />
          <Route path='/management/recharge-history-page' element={<RechargeHistoryPage />} />
          <Route path='/management/recharge-page' element={<RechargePage />} />
          </Routes>
=======
          <Route path={path.Home} element={<Home />} />
          <Route path={path.Login} element={<Login />} />
          <Route path={path.Register} element={<Register />} />
          <Route path={path.ForgetPassword} element={<ForgetPassword />} />
          <Route path={path.DetailPage} element={<DetailPage />} />
          <Route path={path.ServicePage} element={<ServicePage />} />
          <Route path={path.FeedbackPage} element={<FeedbackPage />} />
          <Route path={path.NewPost} element={<NewPost />} />
        </Routes>
>>>>>>> 37e95e4197e0625927b991571ca292b2cdd97a3a
      </div>
    );
  }

  export default App;
