import React from 'react';
import { useState } from 'react';


const daysShortcuts = [
  {shortcut: "mon", pol_name: "Poniedziałek"},
  {shortcut: "tue", pol_name: "Wtorek"},
  {shortcut: "wed", pol_name: "Środa"},
  {shortcut: "thu", pol_name: "Czwartek"},
  {shortcut: "fri", pol_name: "Piątek"},
  {shortcut: "sat", pol_name: "Sobota"},
  {shortcut: "sun", pol_name: "Niedziela"},   
]


export interface InputTerm {
  id: number;
  startTime: string;
  endTime: string;
  weekDay: string
}


function getDayFromShortcut(shortcut: string){
  let full_name;

  daysShortcuts.forEach( elem => {
    if(elem.shortcut === shortcut){
      full_name = elem.pol_name;
    }
  })

  return full_name;
}


function dateInTable(table:InputTerm[], startTime:string, endTime:string, weekDay:string){
  let flag = false;
  table.forEach(elem => {
    if(elem.startTime === startTime && elem.endTime === endTime && elem.weekDay === weekDay){
      flag = true;
    }
  })
  return flag;
}

let nextId = 0;

export const InputDateForm = () => {
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("12:00");
  const [weekDay, setWeekDay] = useState("mon");
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

        if(dateInTable(availableDates, startTime, endTime, weekDay)){
          alert('Podany termin został już wcześniej dodany!');
        }
        else{
        setAvailableDates([
          ...availableDates,
          { id: nextId++, startTime: startTime, endTime: endTime, weekDay: weekDay }
        ]);
        //alert('Dodano zajęcia od ' + startTime + ' do ' + endTime + ' w każdy ' + getDayFromShortcut(weekDay));
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
    
  return (
    <div style={{textAlign: "center", 
                fontFamily:"system-ui"}}>

      <h1>Dodawanie terminów</h1>
      <form onSubmit={e => { handleSubmit(e) }}>       
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
            {daysShortcuts.map(day => (
              <option value={day.shortcut}
                      key={day.shortcut}>
                {day.pol_name}
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
        {availableDates.map(date => (
          <div key={date.id}>
            {date.startTime + ' - ' + 
            date.endTime + ',  ' +
            getDayFromShortcut(date.weekDay)} <br/>
          </div>
        ))}
      </div>

      <br/>

      <div>
        <button onClick={e => {sendTerms(e)}}
        style={{padding: "6px 12px"}}>
          Prześlij terminy
        </button>
      </div>
    </div>
    );
}
