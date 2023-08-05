export default function useLoginValidator(values) {
  let errors = {};

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

  return errors;
}
