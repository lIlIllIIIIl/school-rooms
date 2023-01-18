import { useEffect, useState } from "react";
import { useParams } from "react-router";
import XLSX from 'xlsx';

function Reservation() {

    let roomName = useParams();
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
        console.log(rooms[0].salle);
    //   const rooms = XLSX.utils.sheet_to_json(sheet);
      setRooms(rooms);
    }
  
    function handleRoomSelection(room) {
      setSelectedRoom(room);
    }

    return (
        <>
        <h1>HELLO</h1>
        <input type="file" id="file-input" accept=".xlsx" />
        </>
    );
}

export default Reservation;
