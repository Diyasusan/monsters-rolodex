import { Component } from 'react';
import SearchBox from './components/search-box/search-box.component'
import CardList from './components/card-list/card-list.component'
import './App.css';

class App extends Component {
  constructor(){
    super();
    //Constructor is always used to declare the state
    this.state = {
      monsters : [],
      searchField : ''
    }
  }

  componentDidMount(){
    //after the componentDidMount change the state, render is called again to rernder the new value
    //this is going to be a promise which is some asynchronous action in JS
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) =>
      response.json())
      .then((users)=>
      this.setState(
        //#1. Best Practice : If you are modifying any data in state, you want to keep your state to the original state.
        ()=> {
          return {monsters : users};
        },
        //now adding the callback method
        ()=> {
          console.log(this.state);
        }
      ))
      //I can again have a .then on a promise
           
    }
  onSearchChange = (event) => {
      const searchField = event.target.value.toLocaleLowerCase();
      this.setState(() => {
        return {searchField};
      });
  }

  render(){
    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(this.state.searchField)
      });

    return (
      <div className="App">
        <SearchBox onChangeHandler={this.onSearchChange} placeholder = 'search-monsters' className = 'search-box'/>
        <CardList monsters = {filteredMonsters}/>
        </div>
    );
  }
  
}

export default App;
