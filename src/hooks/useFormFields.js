import { useState } from "react";

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);   // Create a state hook 
    // Return the same value that a state hook alone would return. ie. Return the
    // setValue function as the second argument and declare a custom function that
    // takes the "event" as an argument.
  return [
    fields,     // Return value of hook
    function(event){       // Return state update function name
      let newArr = [...fields]
      newArr[event.target.getAttribute('data-index')][event.target.id] = event.target.value
      setValues(newArr)
    }
  ];
}