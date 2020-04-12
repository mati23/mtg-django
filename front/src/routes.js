import { Routes, Route } from 'react-router-dom';

import { CardDetail } from './CardDetails/CardDetails'
export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/"></Route>
            <Route path="/card" component={CardDetail}></Route>
        </Routes>
    )
}