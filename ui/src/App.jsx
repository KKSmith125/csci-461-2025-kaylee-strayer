import {Routes, Route} from 'react-router-dom';

import Home from './components/Home';
import Sessions from './components/sessions/Sessions';
import NewSession from './components/sessions/NewSession';
import EditSession from './components/sessions/EditSession';
import NewClient from './components/clients/NewClient';
import EditClient from './components/clients/EditClient';
import NotFound from './components/NotFound';
import ApplicationLayout from './components/layouts/ApplicationLayout';
import AuthenticatedLayout from './components/layouts/AuthenticatedLayout';
import Unauthenticated from './components/Unauthenticated';
import Cardio from './components/Cardio';
import AboutUs from './components/AboutUs';
import Nutrition from './components/Nutrition';
import WeightLifting from './components/Weightlifting';

import './App.css';

function App() {
  return (
    <Routes>
      <Route element={<ApplicationLayout />}>
        <Route path='/' element={<Home />}/>
        <Route path='/unauthenticated' element={<Unauthenticated />}/>
        <Route path='/WeightLifting' element={<WeightLifting />} />
        <Route path='/Cardio' element={<Cardio />}/>
        <Route path='/AboutUs' element={<AboutUs />}/>
        <Route path='/Nutrition' element={<Nutrition />}/>
        <Route path='/sessions/new' element={<NewSession />}/>
        <Route path='/sessions/:id/edit' element={<EditSession />}/>
        <Route path='/clients/new' element={<NewClient />}/>
        <Route path='/clients/:id/edit' element={<EditClient />}/>
      

        <Route element={<AuthenticatedLayout />}>
          <Route path='/sessions' element={<Sessions />}/>
        </Route>

      </Route>

      <Route path='*' element={<NotFound />}/>
    </Routes>
  );
}

export default App;