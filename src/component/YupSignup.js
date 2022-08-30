import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MenuItem, Checkbox, TextField } from "@mui/material";
import { StylButton, StyledStack, StyledForm } from "./Styled";
import { useState } from "react";

const date = new Date().toISOString("2022-01-1").slice(0, 10);

const dobValidation = (value) => {
  if (value >= "1990-01-01" && value <= date) {
    return "Eligible Date of birth from 1990 to Current Date.";
  }
};

const schema = yup.object({
  name: yup
    .string()
    .required("Name is Required!")
    .test(
      "name",
      "Min 6 and Max 18 characters required",
      (val) => val.length >= 6 && val.length <= 18
    ),
  email: yup
    .string()
    .matches(/^[\w-(.?)]+@([\w-]+\.)+[\w-]{2,4}$/g, "Enter valid email address")
    .required("Email is Required!"),
  password: yup
    .string()
    .required("Password is Required!")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/g,
      "Min 6 and Max 12 characters atleast one letter,one number and no special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is Required")
    .oneOf([yup.ref("password"), null], "Password doesn't match"),
  age: yup
    .string()
    .required("Age is Required")
    .matches(/^[0-9]+$/, "Age must be a number")
    .test(
      "Age check",
      "Age must be 18 above and 60 below",
      (val) => val > 18 && val < 60
    ),
  gender: yup.string().required("Gender is Required"),
  phoneNo: yup
    .string()
    .required("Phone No is Required!")
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/gm,
      "Phone No is not valid"
    ),
  dob: yup
    .string()
    .required("Date of Birth is Required!")
    .test("DOB", "Eligible Date of birth from 1990 to current year", (value) =>
      dobValidation(value)
    ),
  checkbox: yup.boolean().oneOf([true], "Must Accept the Terms and Conditions"),
});

const SignUp = () => {
  const [isCheck, setIsCheck] = useState(false);
  const [gender, setGender] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setIsCheck(false);
    setGender("");
    reset();
    alert(JSON.stringify(data));
  };

  return (
    <StyledForm autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <StyledStack>
        <TextField
          label="Name"
          variant="outlined"
          error={!!errors.name}
          helperText={errors.name && errors.name.message}
          {...register("name")}
        />
        <TextField
          error={!!errors.email}
          label="Email"
          variant="outlined"
          helperText={errors.email && errors.email.message}
          {...register("email")}
        />
        <TextField
          type="password"
          error={!!errors.password}
          label="password"
          variant="outlined"
          helperText={errors.password && errors.password.message}
          {...register("password")}
        />
        <TextField
          type="password"
          error={!!errors.confirmPassword}
          label="Confirm Password"
          variant="outlined"
          helperText={errors.confirmPassword && errors.confirmPassword.message}
          {...register("confirmPassword")}
        />
        <TextField
          error={!!errors.age}
          label="Age"
          variant="outlined"
          helperText={errors.age && errors.age.message}
          {...register("age")}
        />
        <TextField
          label="Gender"
          select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          error={errors.gender}
          helperText={errors.gender && errors.gender.message}
          inputProps={register("gender")}
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
          {...register("phoneNo")}
        />
        <TextField
          error={!!errors.dob}
          type="date"
          label="Date of Birth"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          helperText={errors.dob && errors.dob.message}
          {...register("dob")}
        />
      </StyledStack>
      <Checkbox
        checked={isCheck}
        onClick={() => setIsCheck(!isCheck)}
        {...register("checkbox")}
      />
      I Accept the Terms and Conditions.
      {errors.checkbox && <p>{errors.checkbox.message}</p>}
      <StylButton type="submit" variant="contained" fullWidth>
        Submit
      </StylButton>
    </StyledForm>
  );
};

export default SignUp;
