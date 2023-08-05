export default function useSetPasswordValidatior(values) {
  let errors = {};

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
}
