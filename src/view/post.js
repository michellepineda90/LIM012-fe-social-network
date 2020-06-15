// import { auth } from '../firebaseInit.js';
// import { deletePost } from '../controller/postController.js';


// const dropdownDots = (idPost, idUser) => {
//   // console.log(auth.currentUser.uid, idUser);
//   const drop = `
//   <div class="dropdown">
//     <i class="bx bx-dots-horizontal-rounded dropdown-btn ${auth.currentUser.uid === idUser ? '' : 'hidden'}" post-id='${idPost}'></i>
//     <ul class="right dropdown-menu" id="dots-1">
//       <li id="edit"> <i class='bx bxs-edit' ></i>Editar</li>
//       <li id="delete"><i class='bx bxs-trash'></i>Eliminar</li>
//     </ul>
//   </div> `;
//   return drop;
// };

// const getAllComments = (comments) => {
//   let allComments = '';
//   comments.forEach((com) => {
//     allComments += ` 
//       <div class="comment-created">
//         <img src="${com.userPhoto}" class="post-user-photo">
//         <span class="comment-text"> 
//           <span class="name-user"> ${com.userName}</span>
//           ${com.text}
//         </span>
//       </div>`;
//   });
//   return allComments;
// };

// export const post = (postObj, postId) => {
//   const divPost = document.createElement('div');
//   divPost.classList.add('post');
//   divPost.innerHTML = `
//   <div class="post-header border">
//       <img src="${postObj.photoUser}" class="icon-photo-user">       
//       <div class="name-date-post">
//         <div>
//           <span class="name-user">${postObj.nameUser}</span>
//           ${dropdownDots(postId, postObj.idUser)}
//         </div>
//         <small>${(postObj.date ? postObj.date.toDate() : new Date()).toLocaleString()}</small>
//         <i class='bx ${postObj.privacity === 'public' ? 'bx-world' : 'bxs-lock-alt'} privacy-icon' id="${postObj.privacity}"></i>
//       </div>   
//     </div>

//     <div class="post-body border"> 
//       <p class="text-post-value"> ${postObj.textContent}</p>
//       ${(postObj.imageContent ? `<img src="${postObj.imageContent}"></img>` : '')}      
//     </div>
//     <div class="post-likes border">
//     <span id="num-likes" class="quantity-icon">${postObj.likes}
//       <i class="fa fa-heart cursor" aria-hidden="true"></i>
//     </span>
//     <span id="num-comments" class="quantity-icon">${postObj.comments.length}
//       <i class="fa fa-comment-o cursor" aria-hidden="true"></i>
//     </span>
//     </div>
//     <div class="post-comments ">    
//       <div class="create-comment-container border">
//         <img src="${postObj.photoUser}" class="post-user-photo">
//         <textarea type="text" class="input-comment" placeholder="Escribre un comentario"></textarea>
//       </div>
//       ${getAllComments(postObj.comments)}
//       </div>`;

//   const dotsBtn = divPost.querySelector('.dropdown-btn');
//   const dropdownMenu = divPost.querySelector('.dropdown-menu');
//   dotsBtn.addEventListener('click', () => {
//     dropdownMenu.classList.toggle('show');
//     // dropdownMenu.classList.add('active');
//   });

//   const bgModal = document.querySelector('.bg-modal');
//   const editOption = divPost.querySelector('li#edit');
//   const deleteOption = divPost.querySelector('li#delete');

//   deletePost.addEventListener('click', () => {
//     bgModal.style.display = 'flex';
//     const modalDetele = bgModal.querySelector('.modal-delete');

//     const deletePostBtn = modalDetele.querySelector('button#delete');
//     const cancelBtn = modalDetele.querySelector('button#cancel');
//     modalDetele.classList.remove('hidden');

//     cancelBtn.addEventListener('click', () => {
//       modalDetele.classList.add('hidden');
//       bgModal.style.display = 'none';
//     });

//     deletePostBtn.addEventListener('click', (e) => {
//       e.stopPropagation();
//       deletePostBD(id)
//         .then(() => {
//           console.log('se elimino con exito');
//           modalDetele.classList.add('hidden');
//           bgModal.style.display = 'none';
//         })
//         .catch(err => console.log(err));
//     });
//   });


//   return divPost;
// };
