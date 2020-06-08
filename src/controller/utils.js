export const setErrorFor = (input, message) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  small.style.display = 'inline';
  small.innerText = message;
};

export const setSuccessFor = (input) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  small.style.display = 'none';
};

export const sendMessage = (text) => {
  const msgError = document.querySelector('span.msg-err');
  msgError.style.display = 'block';
  msgError.textContent = text;
};

export const hidePwd = () => {
  const password = document.querySelector('#password');
  const eyeSlash = document.querySelector('#hide-password');
  const eye = document.querySelector('#show-password');
  password.setAttribute('type', 'text');
  eyeSlash.classList.add('hide');
  eye.classList.remove('hide');
};
export const showPwd = () => {
  const password = document.querySelector('#password');
  const eyeSlash = document.querySelector('#hide-password');
  const eye = document.querySelector('#show-password');
  password.setAttribute('type', 'password');
  eyeSlash.classList.remove('hide');
  eye.classList.add('hide');
};
