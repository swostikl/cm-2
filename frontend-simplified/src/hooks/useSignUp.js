import { useState } from "react";
import useField from "./useSignUpField";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const submitForm = async (
    nameField,
    emailField,
    passwordField,
    phoneNumber,
    genderField,
    streetField,
    cityField,
    zipCodeField
  ) => {
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
      setLoading(true);
      console.log(
        JSON.stringify({
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
        })
      );
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
        console.error(response);
        throw new Error("response not ok");
      }
      const result = await response.json();
      if (result.token) {
        sessionStorage.setItem("accessToken", result.token);
        return true;
      }
    } catch (error) {
      console.error("error:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
    return false;
  };

  return {
    submitForm,
    loading,
    error,
  };
};

export default useSignUp;
