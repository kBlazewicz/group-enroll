import React from 'react';

class AvailableDateForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        startTime: "12:00",
        endTime: "12:00",
        weekDay: "mon",
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
    
    
    handleSubmit(event) {
      alert('Dodano zajęcia od ' + this.state.startTime + ' do ' + this.state.endTime + ' w każdy ' + this.state.weekDay);
      event.preventDefault();
    }
    
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>        
          <label>
            Godzina rozpoczęcia:
            <input
              name="startTime"
              type="time"
              value={this.state.startTime}
              onChange={this.handleInputChange} />
          </label>
   
          <br/>
          <br/>
          
          <label>
            Godzina zakończenia:
            <input
              name="endTime"
              type="time"
              value={this.state.endTime}
              onChange={this.handleInputChange} />
          </label>
         
          <br/>
          <br/>
          
          <label>
            Dzień tygodnia:
            <select 
              name="weekDay"
              value={this.state.value} 
              onChange={this.handleInputChange}>
              <option value="mon">Poniedziałek</option>
              <option value="tue">Wtorek</option>
              <option value="wed">Środa</option>
              <option value="thu">Czwartek</option>
              <option value="fri">Piątek</option>
              <option value="sat">Sobota</option>
              <option value="sun">Niedziela</option>            
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
      );
    }
  }
  
  
export default AvailableDateForm;