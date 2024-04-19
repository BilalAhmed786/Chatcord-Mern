import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Chat from './Chat';
import User from './User';
function App() {

return (
        <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<User />} />
            <Route path="/chat" element={<Chat />} />

        </Routes>
    </BrowserRouter>
    </>
    )
}

export default App;
