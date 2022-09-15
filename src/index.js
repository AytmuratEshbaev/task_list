import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      do: [],
      did: []
    }
    this.addTask = this.addTask.bind(this);
    this.changeState = this.changeState.bind(this);
  }



  addTask(e) {
    let value = e.target.value;
    let doTasks = this.state.do;
    if (e.key === 'Enter' && value !== '') {
      doTasks.push(value);
      this.setState({
        do: doTasks
      })
      e.target.value="";
    }
  }


  changeState(e) {
    let doTasks = this.state.do;
    let didTasks = this.state.did;
    let value = e.target.nextSibling.textContent;
    if (e.target.checked) {
      doTasks = doTasks.filter(task => task !== value);
      didTasks.unshift(value);
    }
    else {
      didTasks = didTasks.filter(task => task !== value);
      doTasks.unshift(value);
    }

    this.setState({
      do: doTasks,
      did: didTasks
    })
  }

  showTasks(tasks, value) {
    return tasks.map((task, index) =>
      <li key={index}>
        <input type="checkbox" checked={value} onChange={this.changeState} />
        <span>{task}</span>
      </li>
    )
  }
  render() {
    return (
      <div className='wrapper'>
        <input type='text' onKeyPress={this.addTask} />
        <div className='do'>
          <h4>Нужно сделать</h4>
          <ul>{this.showTasks(this.state.do, false)}</ul>
        </div>
        <div className='did'>
          <h4>Выполнено</h4>
          <ul>{this.showTasks(this.state.did, true)}</ul>
        </div>
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

