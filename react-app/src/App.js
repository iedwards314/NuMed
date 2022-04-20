import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Navigation from './components/Navigation';
import SplashPage from './components/SplashPage';
import ProfilePage from './components/ProfilePage';
import InsuranceForm from './components/Insurance/createForm.js';
import UpdateInsuranceForm from './components/Insurance/updateInsurance';
import DeleteInsurance from './components/Insurance/deleteInsurance';
import DoctorsList from './components/DoctorsListPage';
import SpecialtyList from './components/SpecialtyListPage';
import CreateAppointmentForm from './components/Appointments/createAppointment';
import GetAllAppointments from './components/Appointments/viewAppointments';
// import User from './components/User';
// import UsersList from './components/UsersList';
// import NavBar from './components/NavBar';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path='/doctors/:specialty' exact={true} >
          <SpecialtyList />
        </ProtectedRoute>
        <ProtectedRoute path='/doctors' exact={true} >
          <DoctorsList />
        </ProtectedRoute>
        <ProtectedRoute path='/insurance/create' exact={true} >
          <InsuranceForm />
        </ProtectedRoute>
        <ProtectedRoute path='/insurance/:policyId' exact={true} >
          <UpdateInsuranceForm />
        </ProtectedRoute>
        <ProtectedRoute path='/insurance/delete/:policyId' exact={true} >
          <DeleteInsurance />
        </ProtectedRoute>
        <ProtectedRoute path='/appointments/user/:userId' exact={true} >
          <GetAllAppointments />
        </ProtectedRoute>
        <ProtectedRoute path='/appointments/create/:doctorId' exact={true} >
          <CreateAppointmentForm />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
