  import { Routes, Route} from 'react-router-dom'
  import { Home, Login,CategoryPage,Register,VerificationPage,ForgetPassword,SearchPage,DetailPage,ServicePage,FeedbackPage,NewPost,ManagePostPage,UpdateProfilePage,PaymentHistoryPage,RechargeHistoryPage,RechargePage} from './pages'

  function App() {
    return (
      <div className="h-screen w-screen bg-primary">
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/verify' element={<VerificationPage />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path="/detail-page/:postId" element={<DetailPage />} />
          <Route path='/service-page' element={<ServicePage />} />
          <Route path='/feedback-page' element={<FeedbackPage />} />
          <Route path='/management/new-post' element={<NewPost />} />
          <Route path='/management/manage-post-page' element={<ManagePostPage />} />
          <Route path='/management/update-profile-page' element={<UpdateProfilePage />} />
          <Route path='/management/payment-history-page' element={<PaymentHistoryPage />} />
          <Route path='/management/recharge-history-page' element={<RechargeHistoryPage />} />
          <Route path='/management/recharge-page' element={<RechargePage />} />
          <Route path='/search-page' element={<SearchPage />} />
          </Routes>
      </div>
    );
  }

  export default App;
