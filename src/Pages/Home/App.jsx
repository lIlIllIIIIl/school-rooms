import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Link
} from "react-router-dom";
import XLSX from 'xlsx';

function Home() {    
  let x = 0
      const [rooms, setRooms] = useState([]);
      const [selectedRoom, setSelectedRoom] = useState(null);
      const [reservation, setReservation] = useState({
        name: '',
        startTime: '',
        endTime: '',
      });
      useEffect(() => {
        const fileInput = document.getElementById('file-input');
        fileInput.addEventListener('change', handleFileChange);
      }, []);
    
      // let isReserved = this.content = "occupé";

      function handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = handleFileLoad;
        reader.readAsBinaryString(file);
      }
    
      function handleFileLoad(event) {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rooms = XLSX.utils.sheet_to_json(sheet);
        setRooms(rooms);

        // B5 = {c:1, r:4}

      }
    
      function handleRoomSelection(room) {
        setSelectedRoom(room);
      }
    
      function handleReservationChange(event) {
        setReservation({
          ...reservation,
          [event.target.name]: event.target.value,
        });
      }
    
      function handleReservationSubmit(event) {
        event.preventDefault();
      }

      function jsp(){
        console.log(this);
      }

      function jsp(v){
        console.log(v);
      }
    
    return (
        <>
        <div className='container'>
          <h1 className='pageTitle'>Rooms</h1>
          <div className="room-reservation">
              <input type="file" id="file-input" accept=".xlsx" />
              <div className="room-list">
                  <table>
                      <tbody>
                      <tr>
                          <th className='tableHeader'>Id</th>
                          <th className='tableHeader'>Salle</th>
                          <th className='tableHeader'>Date 1</th>
                          <th className='tableHeader'>Date 2</th>
                          <th className='tableHeader'>Date 3</th>
                          <th className='tableHeader'>Date 4</th>
                          <th className='tableHeader'>Date 5</th>
                          <th className='tableHeader'>Date 6</th>
                          <th className='tableHeader'>Date 7</th>
                          <th className='tableHeader'>Date 8</th>
                          <th className='tableHeader'>Date 9</th>
                      </tr>
                        { Object.entries(rooms).map(([key, value]) => (
                          <tr>
                            {
                            Object.entries(value).map(([roomKey, roomValue]) => (
                              <th className={roomValue == "libre" ? "free" : "" + roomValue == "occupé" ? "reserved" : ""} onClick={() => handleRoomSelection(roomValue)}>
                                <a href={`Reservation/${value.salle}`}>{roomValue}</a>
                                </th>
                            ))
                            }
                            
                      </tr>
                        )) }

                      </tbody>
                  </table>
              </div>
          </div>
        </div>
        </>
    );
}

export default Home;
