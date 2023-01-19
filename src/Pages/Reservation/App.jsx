import { useEffect, useState } from "react";
import { useParams } from "react-router";
import XLSX from 'xlsx';

function Reservation() {

    let roomName = useParams();
    const [currentRoom, setCurrentRoom] = useState([]);
    const [reserved, setReserved] = useState({
      date1: false,
      date2: false,
      date3: false,
      date4: false,
      date5: false,
    });
    const [globalWorkbook, setGlobalWorkbook] = useState();
    const [globalSheet, setGlobalSheet] = useState({});
  
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
      getCurrentRoom(rooms)
      setGlobalSheet(globalSheet => ({
        sheet
      }));
      setGlobalWorkbook(globalWorkbook => ({
        workbook
      }));
    }
      
      function getCurrentRoom(rooms) {
        const room = rooms.find(rooms => rooms.salle === roomName["roomName"]);
        setCurrentRoom(room);
    }

    function handleRoomReservation(currentRoom, key, value) {
      let newState

      reserved[key] === false ? setReserved({...reserved, [key]: true}) : setReserved({...reserved, [key]: false});

      currentRoom[key] === "libre" ? currentRoom[key] = "occupé" : currentRoom[key] = "libre"
      currentRoom[key] === "occupé" ? newState = "occupé" : newState = "libre"

      let workbook = globalWorkbook["workbook"];
      let sheet = workbook.Sheets[workbook.SheetNames[0]];
      let rooms = XLSX.utils.sheet_to_json(sheet);

      
      rooms.splice(currentRoom["id"], 1, currentRoom);
      
      workbook.Sheets[workbook.SheetNames[0]] = XLSX.utils.json_to_sheet(rooms)

      setGlobalWorkbook(globalWorkbook => ({
        workbook
      }));

    }
    
    function updateFile() {
      let workbook = globalWorkbook["workbook"]
      XLSX.write(workbook, {type: "base64", bookType: "xlsx"})
      XLSX.writeFile(workbook, "excel-rooms.xlsx")
    }

    return (
        <>
        <h1>HELLO {}</h1>
        <input type="file" id="file-input" accept=".xlsx" />
        <div>
          <h1>{currentRoom.salle}</h1>
          <table>
            <tbody>
              <tr>
              { Object.entries(currentRoom).map(([key, value]) => (
                <th key={key}>{key}</th>
              ))
              } 
              </tr>
              <tr>

              { Object.entries(currentRoom).map(([key, value]) => (
                <th key={key} className="roomDate" onClick={() => handleRoomReservation(currentRoom, key, value)}>{value}</th>
                ))
              } 
              </tr>
            </tbody>
          </table>
          <button className="buttonValider" onClick={() => updateFile()}>Valider</button>
        </div>
          <a className="homeLink" href="/">RETOUR HOME</a>
        </>
    );
}

export default Reservation;
