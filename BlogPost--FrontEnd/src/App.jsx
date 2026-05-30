import './App.css'
import PostList from './pages/PostList'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PostDetail from './pages/PostDetail'
import Header from './components/Header'
import Footer from './components/Footer'
import CategoryPost from './pages/CategoryPost'
import About from './pages/About'
import Contact from './pages/Contact'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/admin/Login'
import PostManager from './pages/admin/PostManager'
import PostForm from './pages/admin/PostForm'

function App() {
  return (
    <Router>
    <div className="app-shell">
        <Header/>
        <div className="app-content">
          <Routes>
            <Route path='/' element={<PostList sideBar={true}/>}/>  
            <Route path='/posts' element={<PostList sideBar={false}/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/posts/:id' element={<PostDetail/>}/>
            <Route path='/posts/category/:id' element={<CategoryPost/>}/>
            <Route path='/contact' element={<Contact/>}/> 
            <Route path='/admin/login' element={<Login/>}/>
            <Route path='/admin/posts' element={<ProtectedRoute><PostManager/></ProtectedRoute>}/>
            <Route path='/admin/posts/new' element={<ProtectedRoute><PostForm/></ProtectedRoute>}/>
            <Route path='/admin/posts/edit/:id' element={<ProtectedRoute><PostForm/></ProtectedRoute>}/>
          </Routes>
        </div>
        <Footer/>
    </div>
    </Router>
  )
}

export default App
