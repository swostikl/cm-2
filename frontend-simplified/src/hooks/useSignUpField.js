import { useState } from "react";

const useField = (value, type) => {
  // name, email, password, phone number, gender, date of birth, membership status
  const [fieldVal, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value: fieldVal,
    type,
    onChange,
  };
};

export default useField;
