import { Contact } from 'components/Contact';
import { StyledList } from './ContactsList.styled';

export const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <StyledList>
      {contacts.map(({ id, name, number }) => (
        <Contact
          key={id}
          name={name}
          number={number}
          id={id}
          deleteContact={() => onDeleteContact(id)}
        />
      ))}
    </StyledList>
  );
};