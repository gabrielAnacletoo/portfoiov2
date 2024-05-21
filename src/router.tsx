import {  Routes, Route } from "react-router-dom";
import Homepage from "./pages/home";
import RestClient from "./pages/restClient";
import WorkplacePage from "@pages/workPlacePage";
import CurriculoComponent from "@components/curriculo";

function AppRouter(){
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/rest" element={<RestClient />} />
            <Route path="/workplace/:idDoWorkplace" element={<WorkplacePage />} />   
            <Route path="/curriculo" element={<CurriculoComponent />} />  
        </Routes>
    )
}

export default AppRouter;