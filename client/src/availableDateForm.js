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


function getDayFromShortcut(shortcut){
  let full_name;

  daysShortcuts.forEach( elem => {
    if(elem.shortcut === shortcut){
      full_name = elem.pol_name;
    }
  })

  return full_name;
}


function dateInTable(table, startTime, endTime, weekDay){
  let flag = false;
  table.forEach(elem => {
    if(elem.startTime === startTime && elem.endTime === endTime && elem.weekDay === weekDay){
      flag = true;
    }
  })
  console.log(flag)
  return flag;
}


let nextId = 0;



export const AvailableDateForm = () => {
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("12:00");
  const [weekDay, setWeekDay] = useState("mon");
  const [availableDates, setAvailableDates] = useState([])
  
  const handleSubmit= (e) => {
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
        alert('Dodano zajęcia od ' + startTime + ' do ' + endTime + ' w każdy ' + getDayFromShortcut(weekDay));
      }
    }
  }
    
  return (
    <div>
      <h1>Dodawanie terminów</h1>
      <form onSubmit={e => { handleSubmit(e) }}>       
        <label>
          Godzina rozpoczęcia:
            <input
            name="startTime"
            type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)} />
        </label>
   
        <br/>
        <br/>
          
        <label>
          Godzina zakończenia:
          <input
            name="endTime"
            type="time"
            value={endTime}
            onChange={e => setEndTime(e.target.value)} />
        </label>
         
        <br/>
        <br/>
          
        <label>
          Dzień tygodnia:
          <select 
            name="weekDay"
            value={weekDay} 
            onChange={e => setWeekDay(e.target.value)}>
            {daysShortcuts.map(day => (
              <option value={day.shortcut}>
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
            value="Dodaj"/>
        </label>
          
      </form>


      <h1>Dodane terminy</h1>
      <div>
        {availableDates.map(date => (
          <div>
            {date.startTime + ' - ' + 
            date.endTime + ',  ' +
            getDayFromShortcut(date.weekDay)} <br/>
          </div>
        ))}
      </div>
    </div>
    );
}
