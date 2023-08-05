export default function useEmailValidator(email) {
  let error = "";

  if (!email) {
    error = "Email is required!";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    error = "Enter a valid email!";
  }

  return error;
}
