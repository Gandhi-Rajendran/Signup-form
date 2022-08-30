import { useForm } from "react-hook-form";
import { MenuItem, Checkbox, TextField } from "@mui/material";
import { StylButton, StyledStack, StyledForm } from "./Styled";
import { useState } from "react";
import * as React from "react";

const Signup = () => {
  const [isCheck, setIsCheck] = useState(false);
  const [gender, setGender] = useState("");
  const date = new Date().toISOString("2022-01-1").slice(0, 10);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setIsCheck(false);
    setGender("");
    reset();
    alert(JSON.stringify(data));
  };
  const pass = watch("password", "");

  const nameValidation = (value) => {
    if (value.length < 6 || value.length > 18) {
      return "Min 6 and Max 18 characters required";
    }
  };

  const dobValidation = (value) => {
    if (value < "1990-01-01" || value > date) {
      return "Eligible Date of birth from 1990 to current day";
    }
  };

  return (
    <StyledForm autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <StyledStack>
        <TextField
          label="Name"
          variant="outlined"
          error={!!errors.name}
          helperText={errors.name && errors.name.message}
          {...register("name", {
            required: "Name is Required!",
            validate: (value) => nameValidation(value),
          })}
        />
        <TextField
          error={!!errors.email}
          label="Email"
          variant="outlined"
          helperText={errors.email && errors.email.message}
          {...register("email", {
            required: "Email is Required!",
            pattern: {
              value: /^[\w-(.?)]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "Enter valid email address",
            },
          })}
        />
        <TextField
          type="password"
          error={!!errors.password}
          label="password"
          variant="outlined"
          helperText={errors.password && errors.password.message}
          {...register("password", {
            required: "Password is Required!",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/g,
              message:
                "Min 6 and Max 12 characters atleast one letter,one number and no special character",
            },
          })}
        />
        <TextField
          type="password"
          error={!!errors.confirmPassword}
          label="Confirm Password"
          variant="outlined"
          helperText={errors.confirmPassword && errors.confirmPassword.message}
          {...register("confirmPassword", {
            required: "Confirm Password Required!",
            validate: (value) => value === pass || "Password doesn't match",
          })}
        />
        <TextField
          type="number"
          error={!!errors.age}
          label="Age"
          variant="outlined"
          helperText={errors.age && errors.age.message}
          {...register("age", {
            required: "Age is Required!",
            validate: (value) =>
              (value > 18 && value < 60) || "Age must be 18 above and 60 below",
          })}
        />
        <TextField
          label="Gender"
          select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          error={errors.gender}
          helperText={errors.gender && errors.gender.message}
          inputProps={register("gender", { required: "Gender Required" })}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          error={!!errors.phoneNo}
          label="Phone No"
          variant="outlined"
          helperText={errors.phoneNo && errors.phoneNo.message}
          {...register("phoneNo", {
            required: "Phone No is Required!",
            pattern: {
              value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/gm,
              message: "Enter valid phone number",
            },
          })}
        />
        <TextField
          error={!!errors.dob}
          type="date"
          label="Date of Birth"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          helperText={errors.dob && errors.dob.message}
          {...register("dob", {
            required: "Date of birth is Required",
            validate: (val) => dobValidation(val),
          })}
        />
      </StyledStack>
      <Checkbox
        checked={isCheck}
        onClick={() => setIsCheck(!isCheck)}
        {...register("checkbox", {
          required: "Accept the terms and conditions!",
        })}
      />
      I Accept the Terms and Conditions.
      {errors.checkbox && <p>{errors.checkbox.message}</p>}
      <StylButton type="submit" variant="contained" fullWidth>
        Submit
      </StylButton>
    </StyledForm>
  );
};

export default Signup;
