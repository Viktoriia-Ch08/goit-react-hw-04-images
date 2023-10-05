import { useState } from 'react';
import { FormElement, Header, Input } from './Searchbar.styled';
import { Button } from 'components/Button/Button';

export default function Searchbar({ onSubmitHandler }) {
  const [value, setValue] = useState('');

  const handleSearchbarValue = event => {
    setValue(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmitHandler(value);
    setValue('');
  };

  return (
    <Header>
      <FormElement onSubmit={handleSubmit}>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleSearchbarValue}
        />
        <Button type="submit" disabled={!value}>
          Search
        </Button>
      </FormElement>
    </Header>
  );
}
