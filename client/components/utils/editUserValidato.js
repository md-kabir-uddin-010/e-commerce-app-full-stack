const editUserValidator = (values) => {
  let errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required!";
  } else if (values.name.length < 2) {
    errors.name = "Name must be 2 characters or long!";
  }
  return errors;
};

export default editUserValidator;
