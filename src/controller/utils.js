export const setErrorFor = (input, message) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  small.style.display = 'block';
  input.classList.add('error');
  small.innerText = message;
};

export const setSuccessFor = (input) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  small.style.display = 'none';
  input.classList.remove('error');
};
