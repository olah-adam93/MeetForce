const Validation = (data) => {
  let error = {};

  if (!data.nam) {
    error.nam = 'Adja meg a nevét';
  }
  if (!data.e_mail) {
    error.e_mail = 'Adja meg az e-mail címét';
  } else if (!/\S+@\S+\.\S+/.test(data.e_mail)) {
    error.e_mail = 'Nem megfelelő e-mail cím';
  }
  if (!data.passw) {
    error.passw = 'Adja meg a jelszavát';
  } else if (data.passw.length < 5) {
    error.passw = 'A jelszónak több mint 5 karakterből kell állnia';
  }
  if (!data.loc) {
    error.loc = 'Adja meg az országát';
  }
  if (!data.organization) {
    error.organization = 'Adja meg a szervezetét';
  }

  return error;
};

export default Validation;
