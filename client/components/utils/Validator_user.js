const validator = (values) => {
  let errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required!";
  } else if (values.name.length < 2) {
    errors.name = "Name must be 2 characters or long!";
  }

  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Enter a valid email!";
  }

  if (!values.password) {
    errors.password = "Password is required!";
  } else if (values.password.length < 6) {
    errors.password = "Password is greater than 6 character!";
  }

  if (!values.password2) {
    errors.password2 = "Confirm password is required!";
  } else if (values.password !== values.password2) {
    errors.password2 = "Confirm password doesn't match!";
  }

  return errors;
};

export default validator;
