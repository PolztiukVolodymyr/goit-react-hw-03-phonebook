import React, { Component } from "react";
import css from './App.module.css';
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter"
// import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

    componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== prevState) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
    }
  }

  onSubmit = data => {
    const contactNames = this.state.contacts.map(contact => contact.name);

    if (contactNames.includes(data.name)) {
      alert(`${data.name} is already in contacts.`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [data, ...contacts],
      }));
    }
  };

  deleteContacts = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  filterContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };


  render() {
       const { filter } = this.state;
       const filteredContacts = this.filterContact();
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmit} />
        <h2>Contacts</h2>
        {/* <div>All contacts: {contacts.length}</div> */}
        <Filter value={filter} onChange={this.changeFilter} />
         <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContacts}
        />
    </div>
      
    )
  }
};

