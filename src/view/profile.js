export const editProfile = () => {
  const user = firebase.auth().currentUser;
  // console.log(user);
  const divProfile = `
        <img src="./img/close.png" alt="close" class ="close">
        <img loading="lazy" src="${user.photoURL}" alt="User" class="photo-user-p">
        <span class="name-user">${user.displayName}</span><br>
        <input type="file" accept="image/*" id="upload-img"><br>
        <input type="text" placeholder="Nombre de Usuario"><br>
        <button class="btn-guardar">Guardar</button>
    `;
  const divElemt = document.createElement('div');
  divElemt.innerHTML = divProfile;
  divElemt.classList.add('modal', 'modal-content');
  const closePop = divElemt.querySelector('.close');
  closePop.addEventListener('click', () => {
    divElemt.classList.remove('active');
    const bgModal = document.querySelector('.bg-modal');
    bgModal.classList.remove('active');
  });
  return divElemt;
};
