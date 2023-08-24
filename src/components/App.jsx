import { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactsList/ContactsList';

import {
  TitleStyled,
  ContactsTitle,
  ConteinerStyled,
  ButtonStyled,
} from './App.styled';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsFilter = localStorage.getItem('contacts');
    if (contactsFilter !== null) {
      setContacts(JSON.parse(contactsFilter));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const restoreDeleted = () => {
    setContacts(initialContacts);
  };

  const onFormSubmit = ({ name, number }) => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim()
    );

    if (existingContact) {
      alert(`${name} is already in contacts.`);
    } else {
      const contactId = nanoid(3);

      setContacts(prevContacts => [
        ...prevContacts,
        {
          id: contactId,
          name: name,
          number: number,
        },
      ]);
    }
  };

  const onSearch = event => {
    const searchName = event.target.value.toLowerCase();
    setFilter(searchName);
  };

  const contactDelete = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );
  const displayedContacts = filter ? filteredContacts : contacts;

  return (
    <ConteinerStyled>
      <TitleStyled>Phonebook</TitleStyled>
      <ContactForm onSubmit={onFormSubmit} />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter filter={filter} onHandleSearch={onSearch} />

      <ContactList
        contacts={displayedContacts}
        onHandleDelete={contactDelete}
      />
      <ButtonStyled onClick={restoreDeleted}>Restore deleted</ButtonStyled>
    </ConteinerStyled>
  );
};
