const Validation = (data) => {
  let error = {};

  if (!data.e_mail) {
    error.e_mail = 'Adja meg az e-mail címét';
  } else if (!/\S+@\S+\.\S+/.test(data.e_mail)) {
    error.e_mail = 'Nem megfelelő e-mail cím';
  }
  if (!data.passw) {
    error.passw = 'Adjon meg a jelszavát';
  } else if (data.passw.length < 5) {
    error.passw = 'A jelszónak több mint 5 karakterből kell állnia';
  }

  return error;
};

export default Validation;
