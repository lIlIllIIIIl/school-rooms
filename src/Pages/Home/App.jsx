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
      const [rooms, setRooms] = useState([]);
      const [selectedRoom, setSelectedRoom] = useState(null);
      // const [count, setCount] = useState(0);
      const [reservation, setReservation] = useState({
        name: '',
        startTime: '',
        endTime: '',
      });
    
      useEffect(() => {
        const fileInput = document.getElementById('file-input');
        fileInput.addEventListener('change', handleFileChange);
      }, []);
    
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
        console.log(rooms);
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


    
    return (
        <>
        <h1>Rooms</h1>
        <div className="room-reservation">
            <input type="file" id="file-input" accept=".xlsx" />
            <div className="room-list">
                <table>
                    <tbody>
                    <tr>
                        <th>Salle</th>
                        <th>Date 1</th>
                        <th>Date 2</th>
                        <th>Date 3</th>
                        <th>Date 4</th>
                        <th>Date 5</th>
                        <th>Date 6</th>
                        <th>Date 7</th>
                        <th>Date 8</th>
                        <th>Date 9</th>
                    </tr>
                    {rooms.map(room => (
                        <tr key={room.id}>
                            <th className='roomName' onClick={() => handleRoomSelection(room)}> <a href={`/Reservetion/:${room.salle}`}>{room.salle}</a></th>
                            <th onClick={() => handleRoomSelection(room)}><a href={`/Reservetion/:${room.salle}`}>{room.date1}</a></th>
                            <th onClick={() => handleRoomSelection(room)}><a href={`/Reservetion/:${room.salle}`}>{room.date2}</a></th>
                            <th onClick={() => handleRoomSelection(room)}><a href={`/Reservetion/:${room.salle}`}>{room.date3}</a></th>
                            <th onClick={() => handleRoomSelection(room)}><a href={`/Reservetion/:${room.salle}`}>{room.date4}</a></th>
                            <th onClick={() => handleRoomSelection(room)}><a href={`/Reservetion/:${room.salle}`}>{room.date5}</a></th>
                            <th onClick={() => handleRoomSelection(room)}><a href={`/Reservetion/:${room.salle}`}>{room.date6}</a></th>
                            <th onClick={() => handleRoomSelection(room)}><a href={`/Reservetion/:${room.salle}`}>{room.date7}</a></th>
                            <th onClick={() => handleRoomSelection(room)}><a href={`/Reservetion/:${room.salle}`}>{room.date8}</a></th>
                            <th onClick={() => handleRoomSelection(room)}><a href={`/Reservetion/:${room.salle}`}>{room.date9}</a></th>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {/* {selectedRoom && (
  <div className="reservation-form">
    <h2>Reserve {selectedRoom.name}</h2>
    <form onSubmit={handleReservationSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={reservation.name}
          onChange={handleReservationChange}
        />
      </label>
      <label>
        Start Time:
        <input
          type="text"
          name="startTime"
          value={reservation.startTime}
          onChange={handleReservationChange}
        />
      </label>
      <label>
        End Time:
        <input
          type="text"
          name="endTime"
          value={reservation.endTime}
          onChange={handleReservationChange}
        />
      </label>
      <button type="submit">Reserve</button>
    </form>
  </div>
)} */}
        </div>
        </>
    );
}

export default Home;
