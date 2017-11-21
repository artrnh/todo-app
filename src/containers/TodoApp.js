import React, { Component } from 'react';
import ItemsTable from '../containers/ItemsTable';
import AddItem from '../components/AddItem';
import './TodoApp.css';

export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = { items: [], addText: '', filterText: '', activeFilter: null };
    this.handleAddInput = this.handleAddInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleItemDone = this.handleItemDone.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }

  handleAddInput(e) {
    this.setState({ addText: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.addText.length) return;

    const newItem = {
      id: Date.now(),
      text: this.state.addText,
      done: false
    };

    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      addText: ''
    }));
  }

  handleItemDone(e) {
    const newItems = this.state.items;
    newItems.forEach(item => {
      if (item.id === e.id) item.done = true;
    });

    this.setState({ items: newItems });
  }

  handleClearCompleted() {
    const newItems = this.state.items.filter(item => item.done === false);
    this.setState({ items: newItems });
  }

  handleItemDelete(e) {
    const newItems = this.state.items;
    newItems.forEach((item, index, arr) => {
      if (item.id === e.id) arr.splice(index, 1);
    });

    this.setState({ items: newItems });
  }

  render() {
    return (
      <div>
        <h1>React To-Do App</h1>
        <AddItem
          addText={this.state.addText} 
          onAddTextChange={this.handleAddInput} 
          onAddSubmit={this.handleSubmit} 
        />
        <ItemsTable 
          items={this.state.items}
          handleItemDone={this.handleItemDone}
          handleClearCompleted={this.handleClearCompleted}
          handleItemDelete={this.handleItemDelete}
        />
      </div>
    );
  }
}