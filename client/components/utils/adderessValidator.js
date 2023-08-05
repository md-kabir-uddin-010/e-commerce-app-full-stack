const addressValidator = (values) => {
  let errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required!";
  } else if (values.name.length < 2) {
    errors.name = "Name must be 2 characters or long!";
  }

  if (!values.phone) {
    errors.phone = "Phone number is required!";
  } else if (values.phone.length !== 11) {
    errors.phone = "Invalid phone number!";
  }

  if (!values.address) {
    errors.address = "Address is required!";
  } else if (values.address.length > 100) {
    errors.address = "address is less than 100 character!";
  } else if (values.address.length < 10) {
    errors.address = "address is greter than 10 character!";
  }

  if (!values.post_code) {
    errors.post_code = "Post code is required!";
  }

  return errors;
};

export default addressValidator;
