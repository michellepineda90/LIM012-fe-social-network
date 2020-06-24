
export const fixtureData = {
  __collection__: {
    users: {
      __doc__: {
        user_1: {
          name: 'Luna123',
          email: 'lunachan@gmail.com',
        },
        user_2: {
          name: 'Luna123',
          email: 'usuario2@gmail.com',
        },
        user_3: {
          name: 'Luna123',
          email: 'usuario3@gmail.com',
        },
      },
    },
    posts: {
      __doc__: {
        post_1: {
          idUser: 'user_1',
          textContent: 'primer post user_a',
          imageContent: '',
          privacity: 'public',
          likes: ['user_1', 'user_2'],
        },
        post_2: {
          idUser: 'user_1',
          textContent: 'segundo post user_a',
          imageContent: '',
          privacity: 'private',
          likes: ['user_1', 'user_2', 'user_3'],
        },
        post_3: {
          idUser: 'user_2',
          textContent: 'primer post user_b',
          imageContent: '',
          privacity: 'public',
          likes: ['user_1', 'user_3'],
        },
        post_4: {
          idUser: 'user_2',
          textContent: 'segundo post user_b',
          imageContent: '',
          privacity: 'private',
          likes: ['user_1', 'user_2'],
        },

      },
    },
    comments: {
      __doc__: {
        comment_1: {
          textContent: 'holiholiholi',
          postId: 'post_1',
          userId: 'user_1',
        },
      },
    },
  },
};
