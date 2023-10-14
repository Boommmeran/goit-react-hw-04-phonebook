import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { ContactsForm } from 'components/ContactsForm';
import { ContactsList } from 'components/ContactsList';
import { Filter } from 'components/Filter';
import { Container, MainTitle, Title } from './App.syled';

export function AppHooks() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const contactsFromLS = localStorage.getItem('contacts');
    
    if (contactsFromLS) {
      setContacts([...JSON.parse(contactsFromLS)]);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts, isFirstRender]);

  const handleSubmitForm = ({ name, number }, { resetForm }) => {
    const sameName = contacts.find(contact => contact.name === name);

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
    
    setContacts([newContact, ...contacts]);

    resetForm();
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const onFilterChange = evt => {
    setFilter(evt.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Container>
      <MainTitle>Phone book</MainTitle>
      <ContactsForm onSubmit={handleSubmitForm} />
      <Title>Contacts</Title>
      <Filter value={filter} onChange={onFilterChange} />
      {contacts.length !== 0 && (
        <ContactsList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      )}
    </Container>
  );
}
