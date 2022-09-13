import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDos: [],
      newToDo: ''
    }
    this.changeValue = this.changeValue.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.doneChecked = this.doneChecked.bind(this);
    this.removeToDo = this.removeToDo.bind(this);
  }

  removeToDo(e){
    let val = e.target.previousSibling.textContent;
    let toDos = this.state.toDos;
    toDos = toDos.filter(toDo => toDo.text !== val);
    this.setState({
      toDos: toDos
    })
  }

  addToDo(e) {
    e.preventDefault();
    let toDo = {}, toDos = this.state.toDos;
    toDo.text = this.state.newToDo;
    toDo.done = false;
    toDo.id = !toDos ? toDos[toDos.length - 1].id + 1 : 0;
    toDos.push(toDo);
    this.setState({
      toDos: toDos,
      newToDo: ""
    })
    e.target.closest('form').reset();
  }

  changeValue(e) {
    this.setState({
      newToDo: e.target.value
    })
  }

  doneChecked(e) {
    let checkbox = e.target;
    let nextElement = checkbox.nextSibling;
    let val = nextElement.textContent;
    let toDos = this.state.toDos;
    toDos.forEach(toDo => {
      if (toDo.text === val) {
        toDo.done = !toDo.done;
        nextElement.style.textDecoration = toDo.done ? 'line-through' : 'none';
      }
    })
  }

  handleClick(e) {
    let currentElement = e.target;
    let val = currentElement.textContent;
    let toDos = this.state.toDos;
    toDos.forEach(toDo => {
      if (toDo.text === val) {
        toDo.done = !toDo.done;
        currentElement.previousSibling.checked = toDo.done;
      }
    })
    this.setState({
      toDos: toDos
    })
  }

  render() {
    return (
      <div className='wrapper'>
        <h1 className='wrapper__title'>My To Do List</h1>
        <ul className='toDoList'>
          {this.state.toDos.map((toDo, index) =>
            <li className="todo" key={index}>
              <input type="checkbox" defaultChecked={toDo.done} onInput={this.doneChecked} />
              <p onClick={this.handleClick} style={{ textDecoration: toDo.done ? 'line-through' : 'none' }}>{toDo.text}</p>
              <button onClick={this.removeToDo}>x</button>
            </li>
          )}
        </ul>
        <form>
          <input type="text" onChange={this.changeValue} />
          <button onClick={this.addToDo} disabled={!this.state.newToDo}>Add #{this.state.toDos.length + 1}</button>
        </form>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Block />
  </React.StrictMode>
);

