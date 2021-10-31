import { useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setinputs] = useState(initial);

  function handleChange(e) {
    let { name, value, type } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = e.target.files;
    }

    setinputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setinputs(initial);
  }

  function clearForm() {
    const emptyForm = Object.fromEntries(
      Object.entries(inputs).map(([key, _value]) => [key, ''])
    );

    setinputs(emptyForm);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
