import { useEffect, useState, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'setInput':
      return { ...state, ...action.payload };
    case 'resetForm':
      return action.payload;
    case 'clearForm':
      return action.payload;
    default:
      throw new Error('use form error');
  }
}

export default function useForm(initial = {}) {
  const [inputs, dispatch] = useReducer(reducer, initial);

  // useEffect(() => {
  //   setinputs(initial);
  // }, [initial, initialValues]);
  // const [inputs, setinputs] = useState(initial);
  // const initialValues = Object.values(initial);

  useEffect(() => {
    dispatch({ type: 'setInput', payload: initial });
  }, [initial]);

  function handleChange(e) {
    let { name, value, type } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = e.target.files;
    }

    dispatch({ type: 'setInput', payload: { [name]: value } });

    // setinputs({
    //   ...inputs,
    //   [name]: value,
    // });
  }

  function resetForm() {
    // setinputs(initial);
    dispatch({ type: 'resetForm', payload: initial });
  }

  function clearForm() {
    const emptyForm = Object.fromEntries(
      Object.entries(inputs).map(([key, _value]) => [key, ''])
    );

    // setinputs(emptyForm);
    dispatch({ type: 'clearForm', payload: emptyForm })
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
