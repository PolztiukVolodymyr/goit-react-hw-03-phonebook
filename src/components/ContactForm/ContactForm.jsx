import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';


class ContactForm extends Component{
    state = { name: '', number: '' };

  handleChange = evt => {
    const { name, value } = evt.target;
      this.setState({ [name]: value });
    };
    
  handleSubmit = evt => {
    evt.preventDefault();
    const { onSubmit } = this.props;
    const{ name, number } = this.state
    const newContact = {
      id: nanoid(),
      name,
      number
    };
    onSubmit(newContact);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
    };
    
    render() {
        const { name, number } = this.state;   
        return (
    <form onSubmit={this.handleSubmit} className={css.form}>
    <label className={css.label}>Name
      <input
        onChange={this.handleChange}
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces.
         For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        />
    </label>
    <label className={css.label}>Number
      <input
        onChange={this.handleChange}
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes,
         parentheses and can start with +"
        required
      />
    </label>
    <button type="submit">Add contact</button>
    </form>
        )
    }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
}

export default ContactForm;