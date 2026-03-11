import { useState } from 'react'
import './App.css'
import PostList from './pages/PostList'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PostDetail from './pages/PostDetail'
import Header from './components/Header'
import Footer from './components/Footer'
import CategoryPost from './pages/CategoryPost'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <div className="container-fluid p-0">
    <Router>
        <Header/>
       <Routes>
         <Route path='/' element={<PostList sideBar={true}/>}/>  
        <Route path='/posts' element={<PostList sideBar={false}/>}/>
        <Route path='/about' element={<About/>}/>
         <Route path='/posts/:id' element={<PostDetail/>}/>
         <Route path='/posts/category/:id' element={<CategoryPost/>}/>
         <Route path='/contact' element={<Contact/>}/> 
       </Routes>
        <Footer/>
    </Router>
    </div>
  )
}

export default App
