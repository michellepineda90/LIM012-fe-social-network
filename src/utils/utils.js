export const setErrorFor = (input, message) => {
  input.classList.add('alert');
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

export const signInFormValidation = (code) => {
  const inputPassword = document.querySelector('#password');
  const inputEmail = document.querySelector('#email');
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  // EMAIL
  if (email === '') {
    setErrorFor(inputEmail, 'Por favor, ingrese un correo');
  } else if (code === 'auth/user-not-found') {
    sendMessage('No existe una cuenta vinculada a este correo');
  } else {
    setSuccessFor(inputEmail);
  }
  // PASSWORD
  if (password === '') {
    setErrorFor(inputPassword, 'Por favor, ingrese contraseña');
  } else if (code === 'auth/wrong-password') {
    setErrorFor(inputPassword, 'La contraseña   es incorrecta');
  } else {
    setSuccessFor(inputPassword);
  }
};


export const signUpFormValidation = (code) => {
  const inputName = document.querySelector('#name');
  const inputEmail = document.querySelector('#email');
  const inputPassword = document.querySelector('#password');
  const name = inputName.value.trim();
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();

  // NAME
  if (name === '') {
    setErrorFor(inputName, 'Por favor, ingrese nombre');
  } else if (name.length < 6) {
    setErrorFor(inputName, 'Nombre debe contener mínimo 6 caracteres!');
  } else {
    setSuccessFor(inputName);
  }
  // EMAIL
  if (email === '') {
    setErrorFor(inputEmail, 'Por favor, ingrese correo');
  } else if (code === 'auth/invalid-email') {
    setErrorFor(inputEmail, 'El correo ingresado es inválido');
  } else if (code === 'auth/email-already-in-use') {
    sendMessage('El correo ya esta vinculado a otra cuenta');
  } else {
    setSuccessFor(inputEmail);
  }
  // PASSWORD
  if (password === '') {
    setErrorFor(inputPassword, 'Por favor, ingrese contraseña');
  } else if (code === 'auth/weak-password') {
    setErrorFor(inputPassword, 'La contraseña debe contener mínimo 6 caracteres');
  } else {
    setSuccessFor(inputPassword);
  }
};

export const emojis = (direcction) => {
  const divEmo = `
    <div class ="emoji-dropdown">
      <div class="emoji-icon">
        <i class='bx bx-happy'></i>
      </div>
      <div class="emoji-container ${direcction}">
        <div class="emoji">😀</div>
        <div class="emoji">😃</div>
        <div class="emoji">😄</div>
        <div class="emoji">😁</div>
        <div class="emoji">😆</div>
        <div class="emoji">😅</div>
        <div class="emoji">😂</div>
        <div class="emoji">🤣</div>
        <div class="emoji">😊</div>
        <div class="emoji">😇</div>
        <div class="emoji">🙂</div>
        <div class="emoji">🙃</div>
        <div class="emoji">😉</div>
        <div class="emoji">😌</div>
        <div class="emoji">😍</div>
        <div class="emoji">🥰</div>
        <div class="emoji">😘</div>
        <div class="emoji">😗</div>
        <div class="emoji">😙</div>
        <div class="emoji">😚</div>
        <div class="emoji">😋</div>
        <div class="emoji">😛</div>
        <div class="emoji">😝</div>
        <div class="emoji">😜</div>
        <div class="emoji">🤪</div>
        <div class="emoji">🤨</div>
        <div class="emoji">🧐</div>
        <div class="emoji">🤓</div>
        <div class="emoji">😎</div>
        <div class="emoji">🤩</div>
        <div class="emoji">🥳</div>
        <div class="emoji">😏</div>
        <div class="emoji">😒</div>
        <div class="emoji">😞</div>
        <div class="emoji">😔</div>
        <div class="emoji">😟</div>
        <div class="emoji">😕</div>
        <div class="emoji">🙁</div>
        <div class="emoji">😣</div>
        <div class="emoji">😖</div>
        <div class="emoji">😫</div>
        <div class="emoji">😩</div>
        <div class="emoji">🥺</div>
        <div class="emoji">😢</div>
        <div class="emoji">😭</div>
        <div class="emoji">😤</div>
        <div class="emoji">😠</div>
        <div class="emoji">😡</div>
        <div class="emoji">🤬</div>
        <div class="emoji">🤯</div>
        <div class="emoji">😳</div>
        <div class="emoji">🥵</div>
        <div class="emoji">🥶</div>
        <div class="emoji">😱</div>
        <div class="emoji">😨</div>
        <div class="emoji">😰</div>
        <div class="emoji">😥</div>
        <div class="emoji">😓</div>
        <div class="emoji">🤗</div>
        <div class="emoji">🤔</div>
        <div class="emoji">🤭</div>
        <div class="emoji">🤫</div>
        <div class="emoji">🤥</div>
        <div class="emoji">😶</div>
        <div class="emoji">😐</div>
        <div class="emoji">😑</div>
        <div class="emoji">😬</div>
        <div class="emoji">🙄</div>
        <div class="emoji">😯</div>
        <div class="emoji">😦</div>
        <div class="emoji">😧</div>
        <div class="emoji">😮</div>
        <div class="emoji">😲</div>
        <div class="emoji">😴</div>
        <div class="emoji">🤤</div>
        <div class="emoji">😪</div>
        <div class="emoji">😵</div>
        <div class="emoji">🤐</div>
        <div class="emoji">🥴</div>
        <div class="emoji">🤢</div>
        <div class="emoji">🤮</div>
        <div class="emoji">🤧</div>
        <div class="emoji">😷</div>
        <div class="emoji">🤒</div>
        <div class="emoji">🤕</div>
        <div class="emoji">🤑</div>
        <div class="emoji">🤠</div>
        <div class="emoji">😈</div>
        <div class="emoji">👿</div>
        <div class="emoji">🤡</div>
        <div class="emoji">💩</div>
        <div class="emoji">👻</div>
        <div class="emoji">💀</div>
        <div class="emoji">🎃</div>
        <div class="emoji">😺</div>
        <div class="emoji">😸</div>
        <div class="emoji">😹</div>
        <div class="emoji">😻</div>
        <div class="emoji">😼</div>
        <div class="emoji">😽</div>
        <div class="emoji">🙀</div>
        <div class="emoji">😿</div>
      </div>
    </div>`;
  return divEmo;
};

export const emojiEvent = (container, nameClassInput, btn, nameClassBtn) => {
  const emojiIconBtn = container.querySelector('.emoji-icon');
  const emojisContainer = container.querySelector('.emoji-container');
  emojiIconBtn.addEventListener('click', () => {
    emojisContainer.classList.toggle('flex');
  });

  const emojisSet = container.querySelectorAll('.emoji');
  const input = container.querySelector(nameClassInput);
  emojisSet.forEach((emoji) => {
    emoji.addEventListener('click', (e) => {
      if (btn) btn.classList.add(nameClassBtn);
      console.log(e.target.innerText);
      input.textContent += e.target.textContent;
    });
  });
};
