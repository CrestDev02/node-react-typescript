import { useState } from "react";
import { ObjectType } from "typescript";
import { FormData, LoginFormData } from "../types/form-data";
import ValidationSchema from "../types/validation";

const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const validate = (
  e: React.ChangeEvent<HTMLInputElement>,
  fieldName: string,
  setValidationError: React.Dispatch<React.SetStateAction<ValidationSchema>>,
  setFormData: React.Dispatch<React.SetStateAction<any>>,
  validationError: ValidationSchema,
  formData: FormData | LoginFormData,
) => {
  const value = e.target.value;
  if (fieldName === "email") {
    if (value === "") {
      setValidationError({
        ...validationError,
        [fieldName]: { isValid: true, message: "Email is required!!" },
      });
    } else if (!value.match(mailformat)) {
      setValidationError({
        ...validationError,
        [fieldName]: { isValid: true, message: "Enter valid email!!" },
      });
    } else {
      setValidationError({
        ...validationError,
        [fieldName]: { isValid: false, message: "" },
      });
    }
  } else if (fieldName === "confirm_password") {
    if (value !== formData.password) {
      setValidationError({
        ...validationError,
        [fieldName]: {
          isValid: true,
          message: "Password and Confirm Password must be same",
        },
      });
    } else {
      setValidationError({
        ...validationError,
        [fieldName]: {
          isValid: false,
          message: "",
        },
      });

    }
  } else {
    if (value === "") {
      setValidationError({
        ...validationError,
        [fieldName]: {
          isValid: true,
          message: camalize(fieldName) + " is required!!",
        },
      });
    } else {
      setValidationError({
        ...validationError,
        [fieldName]: {
          isValid: false,
          message: "",
        },
      });
      setFormData({ ...formData, [fieldName]: value });
    }
  }
};

const camalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
};
