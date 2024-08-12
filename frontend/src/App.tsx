import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from './screen/Landing';
import Game from './screen/Game';


function App() {

  return (
 <div className='h-screen bg-[#302E2B]'>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} /> 
        <Route path="/game" element={<Game/>} /> {/* 👈 Renders at /app/ */}
      </Routes>
    </BrowserRouter>
  
 </div>
  )
}

export default App
