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
;
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [start_hrs, start_mins] = startTime.split(':')
    const [end_hrs, end_mins] = endTime.split(':')

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
  }

  const deleteTerm = (e : React.MouseEvent<HTMLButtonElement>, termToDelete: InputTerm) => {
    e.preventDefault();
    const newList = availableDates.filter((item) => (item !== termToDelete ));
    setAvailableDates(newList);
  }

  return (
    <div style={{textAlign: "center", 
                fontFamily:"system-ui"}}>

      <h1>Dodawanie terminów</h1>
      <form onSubmit={e => handleSubmit(e)}>       
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
            value="Dodaj"
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
              style={{padding: "6px 12px", margin: "10px"}}>
              Usuń
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
