import logo from './logo.svg';
import './App.css';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import Main from './main/main';
import Expense from './expense/expense';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/expenses' element={<Expense/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
