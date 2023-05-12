import React from 'react';
import { useState } from 'react';
import { Day } from '../../types/types';


type DayMap = {
  [key: string]: Day;
}

const days: DayMap = {
  "Monday": Day.Monday,
  "Tuesday": Day.Tuesday,
  "Wednesday": Day.Wednesday,
  "Thursday": Day.Thursday,
  "Friday": Day.Friday,
  "Saturday": Day.Saturday,
  "Sunday": Day.Sunday
};


export interface InputTerm {
  startTime: string;
  endTime: string;
  weekDay: Day
}


function isDateInTable(table:InputTerm[], startTime:string, endTime:string, weekDay:string){
  let flag = false;
  table.forEach(elem => {
    if(elem.startTime === startTime && elem.endTime === endTime && elem.weekDay === weekDay){
      flag = true;
    }
  })
  return flag;
}


export const InputDateForm = () => {
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("12:00");
  const [weekDay, setWeekDay] = useState("Monday");
  const [availableDates, setAvailableDates] = useState<InputTerm[]>([])
  const [shadow, setShadow] = useState(false);
  const [editing, setEditing] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [start_hrs, start_mins] = startTime.split(':')
    const [end_hrs, end_mins] = endTime.split(':')
    setEditing(false)

    if(end_hrs < start_hrs || (end_hrs === start_hrs && end_mins < start_mins)){
      alert('Godzina rozpoczęcia zajęć jest wcześniejsza niż godzina zakończenia!');
      setEndTime(startTime)
    }
    else{

        if(isDateInTable(availableDates, startTime, endTime, days[weekDay])){
          alert('Podany termin został już wcześniej dodany!');
        }
        else{
        setAvailableDates([
          ...availableDates,
          { startTime: startTime, endTime: endTime, weekDay: days[weekDay]}
        ]);
      }
    }
  }

  const sendTerms = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(availableDates.length <= 1){
      alert('Nie można przesłać - zbyt mało dodanych terminów')
    }else{
      console.log(
        {
          availableDates
        }
    )}

    fetch('http://localhost:8081/terms/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        availableDates
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }

  const deleteTerm = (e : React.MouseEvent<HTMLButtonElement>, termToDelete: InputTerm) => {
    e.preventDefault();
    const newList = availableDates.filter((item) => (item !== termToDelete ));
    setAvailableDates(newList);
  }

  const editTerm = (e : React.MouseEvent<HTMLButtonElement>, termToEdit: InputTerm) => {
    e.preventDefault();
    setStartTime(termToEdit.startTime)
    setEndTime(termToEdit.endTime)
    setWeekDay(termToEdit.weekDay)
    setEditing(true)
    setShadow(true)

    const newList = availableDates.filter((item) => (item !== termToEdit ));
    setAvailableDates(newList);

    setTimeout(function(){
      setShadow(false)
    }, 300); 
  }


  return (
    <div style={{textAlign: "center", 
                fontFamily:"system-ui"}}>

      <h1>Dodawanie terminów</h1>
      <form onSubmit={e => handleSubmit(e)} style={{padding: '12px 48px',
                                                    width: 'max-content',
                                                    margin: 'auto',
                                                    borderRadius: '6px',
                                                    boxShadow: shadow ? '8px 8px 32px -8px #4dabf5' : 'none' }}>       
        <label>
          Godzina rozpoczęcia:
            <input
            name="startTime"
            type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            style={{margin: "10px"}} />
        </label>
   
        <br/>
          
        <label>
          Godzina zakończenia:
          <input
            name="endTime"
            type="time"
            value={endTime}
            onChange={e => setEndTime(e.target.value)} 
            style={{margin: "10px"}}/>
        </label>
         
        <br/>
          
        <label>
          Dzień tygodnia:
          <select 
            name="weekDay"
            value={weekDay} 
            onChange={e => setWeekDay(e.target.value)}
            style={{margin: "10px",
                    padding:"2px"}}>
            {Object.keys(days).map(day => (
              <option value={day}
                      key={day}>
                {days[day]}
              </option>
            ))}           
          </select>
        </label>
         
        <br/>
        <br/>
          
        <label>
          <input
            name="submit"
            type="submit"
            value={editing ? "Zapisz zmiany" : "Dodaj"}
            style={{padding: "6px 12px"}}/>
        </label>
          
      </form>


      <h1>Dodane terminy</h1>
      <div>
        {availableDates.map((date, i) => (
          <div key={i}>
            {date.startTime + ' - ' + 
            date.endTime + ',  ' +
            date.weekDay}

            <button onClick={e => deleteTerm(e, date)}
              style={{padding: "6px 12px", margin: "10px 10px 10px 20px"}}>
              Usuń
            </button>

            <button onClick={e => editTerm(e, date)}
              style={{padding: "6px 12px", margin: "10px"}}>
              Edytuj
            </button>

            <br/>

          </div>
        ))}
      </div>

      <br/>

      <div>
        <button onClick={e => sendTerms(e)}
        style={{padding: "6px 12px"}}>
          Prześlij terminy
        </button>
      </div>
    </div>
    );
}
