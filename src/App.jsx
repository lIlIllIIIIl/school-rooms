import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Link
} from "react-router-dom";
import XLSX from 'xlsx';

import Reservation from './Pages/Reservation/App';
import Home from './Pages/Home/App';

function render() {
  return (
    <><React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Reservation/:roomName" element={<Reservation />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
</>
  );
}

export default render;