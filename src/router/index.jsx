import { Route, Routes, Navigate } from 'react-router-dom'
import Issues from "../pages/Issues";
import Books from "../pages/Books";
import Interviews from "../pages/Interviews";
function RouteConfig(){
    return(
        <Routes>
           <Route path='/issues' element={<Issues></Issues>}/>
           <Route path='/books' element={<Books></Books>}/>
           <Route path='/interviews' element={<Interviews></Interviews>}/>
           <Route path='/' element={<Navigate replace to={'/issues'}/>}/>
        </Routes>
    )
}
export default RouteConfig