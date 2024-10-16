import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loader from './components/Loader';
import News from './components/News';
import TopHeadlines from './components/TopHeadlines';
import CountryNews from './components/CountryNews';
import LoadingBar from 'react-top-loading-bar';

function App() {

  const [progress, setProgress] = useState(0)
  return (
    <div className='app'>
      <BrowserRouter>
        <LoadingBar
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Header />
        <Routes>
          <Route path='/' element={<News progress={progress} setProgress={setProgress} />} />
          <Route path='/top-headlines/:category' element={<TopHeadlines progress={progress} setProgress={setProgress} />} />
          <Route path='/country/:iso' element={<CountryNews progress={progress} setProgress={setProgress} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
