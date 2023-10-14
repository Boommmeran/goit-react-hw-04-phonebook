import { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { ContactsForm } from 'components/ContactsForm';
import { ContactsList } from 'components/ContactsList';
import { Filter } from 'components/Filter';
import { Container, MainTitle, Title } from './App.syled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount = () => {
    const contactsFromLS = localStorage.getItem('contacts');
      this.setState({ contacts: JSON.parse(contactsFromLS) })
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts))
    }
    
  }
  
  handleSubmitForm = ({ name, number }, { resetForm }) => {
    const sameName = this.state.contacts.find(contact => contact.name === name);

    if (sameName) {
      return Notiflix.Notify.failure(
        'This contact is already in your phone book'
      );
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));

    resetForm();
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  onFilterChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const {
      handleSubmitForm,
      onFilterChange,
      getVisibleContacts,
      deleteContact,
    } = this;
    return (
      <Container>
        <MainTitle>Phone book</MainTitle>
        <ContactsForm onSubmit={handleSubmitForm} />
        <Title>Contacts</Title>
        <Filter value={this.state.filter} onChange={onFilterChange} />
        {this.state.contacts.length !== 0 && (
          <ContactsList
            contacts={getVisibleContacts()}
            onDeleteContact={deleteContact}
          />
        )}
      </Container>
    );
  }
}
