export default function useProductFormValidator(values) {
  let errors = {};

  if (!values.title.trim()) {
    errors.title = "Title is required!";
  } else if (values.title.length < 5) {
    errors.title = "Title must be 5 characters or long!";
  } else if (values.title.length > 500) {
    errors.title = "Title max 500 characters or less!";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required!";
  } else if (values.description.length < 5) {
    errors.description = "Description must be 5 characters or long!";
  } else if (values.description.length > 500) {
    errors.description = "Description max be 500 characters or less!";
  }

  if (!values.reguler_price) {
    errors.reguler_price = "Reguler price is required!";
  } else if (values.reguler_price > 100000000) {
    errors.reguler_price = "Reguler price is invalid!";
  }
  if (!values.sale_price) {
    errors.sale_price = "Sale price is required!";
  } else if (values.sale_price > 100000000) {
    errors.sale_price = "Sale price is invalid!";
  }

  return errors;
}
