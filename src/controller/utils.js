export const setErrorFor = (input, message) => {
  const formControl = input.parentElement;
  const icon = formControl.querySelector('i.fa-exclamation-triangle');
  const small = formControl.querySelector('small');
  small.style.display = 'inline';
  icon.style.display = 'inline-block';
  input.classList.add('error');
  small.innerText = message;
};

export const setSuccessFor = (input) => {
  const formControl = input.parentElement;
  const icon = formControl.querySelector('i.fa-exclamation-triangle');
  const small = formControl.querySelector('small');
  small.style.display = 'none';
  icon.style.display = 'none';
  input.classList.remove('error');
};

export const showOrHidePassword = (s, h) => {
  const temp = document.querySelector('input#password');
  if (temp.type === 'password') {
    s.style.display = 'block';
    h.style.display = 'none';
    temp.type = 'text';
  } else {
    s.style.display = 'none';
    h.style.display = 'block';
    temp.type = 'password';
  }
};
