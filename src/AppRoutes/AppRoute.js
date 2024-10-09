import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Checklist from '../Pages/Checklist/Checklist';




const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/checklist" element={<Checklist />} />
        </Routes>
    );
};

export default AppRoute;
