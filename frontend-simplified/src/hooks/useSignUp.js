import { useState } from "react";
import useField from "./useSignUpField";

const useSignUp = () => {
  const nameField = useField("", "text");
  const emailField = useField("", "email");
  const passwordField = useField("", "password");
  const [phoneNumber, setPhoneNumber] = useState("");
  const genderField = useField("", "");
  const streetField = useField("", "text");
  const cityField = useField("", "text");
  const zipCodeField = useField("", "text");
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (
      !validateEmail(emailField.value) ||
      nameField.value === "" ||
      passwordField.value === "" ||
      phoneNumber === "" ||
      genderField.value === "" ||
      streetField.value === "" ||
      cityField.value === "" ||
      zipCodeField.value === ""
    ) {
      alert("Please fill out all fields with valid info");
      return;
    }
    console.log("submitted");
    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameField.value,
          email: emailField.value,
          password: passwordField.value,
          phone_number: phoneNumber,
          gender: genderField.value,
          address: {
            street: streetField.value,
            city: cityField.value,
            zipCode: zipCodeField.value,
          },
        }),
      });
      if (!response.ok) {
        console.error("response not ok");
        return;
      }
      const result = await response.json();
      if (result.token) {
        sessionStorage.setItem("accessToken", result.token);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  return {
    nameField,
    emailField,
    passwordField,
    phoneNumber,
    setPhoneNumber,
    genderField,
    streetField,
    cityField,
    zipCodeField,
    submitForm,
  };
};

export default useSignUp;
