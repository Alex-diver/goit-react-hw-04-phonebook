import { useState } from 'react';
import {
  FormStyle,
  LabelStyled,
  SpanStyled,
  InputStyled,
  BtnStyled,
} from './ContactForm.styled';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name: inputName, value } = event.target;
    if (inputName === 'name') {
      setName(value);
    } else if (inputName === 'number') {
      setNumber(value);
    }
  };
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ name, number });
    formReset();
  };
  const formReset = () => {
    setName('');
    setNumber('');
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      <LabelStyled htmlFor="name">
        <SpanStyled>Name</SpanStyled>
        <InputStyled
          type="text"
          value={name}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Annie Copeland"
          onChange={handleChange}
        />
      </LabelStyled>
      <LabelStyled htmlFor="number">
        <SpanStyled>Number</SpanStyled>
        <InputStyled
          type="tel"
          value={number}
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="227-91-26"
          onChange={handleChange}
        />
      </LabelStyled>
      <BtnStyled type="submit"> Add contact </BtnStyled>
    </FormStyle>
  );
};
