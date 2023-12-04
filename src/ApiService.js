import axios from 'axios';

const ApiService = {
  saveGameRecord: (user, gameRecord, onSuccess, onError) => {
    if (!user) {
      onError(new Error("No user provided"));
      return;
    }
    axios.post('https://project4-back-end.wl.r.appspot.com/saveGameRecord', gameRecord)
      .then(onSuccess)
      .catch(onError);
  },

   fetchUserScores: (user, onSuccess, onError) => {
      if (!user) {
        onError(new Error("No user provided"));
        return;
      }
      axios.get('https://project4-back-end.wl.r.appspot.com/fetchUserScores', {
        params: {
          googleId: user.uid
        }
      })
      .then(onSuccess)
      .catch(onError);
    },

  fetchHighScores: (currentPage, pageSize, onSuccess, onError) => {
    axios.get('https://project4-back-end.wl.r.appspot.com/fetchHighScores', {
      params: {
        page: currentPage,
        size: pageSize
      }
    })
    .then(onSuccess)
    .catch(onError);
  },

  changeUserHandle: (user, newHandle, onSuccess, onError) => {
      if (!user) {
          onError(new Error("No user provided"));
          return;
      }
      axios.put(`https://project4-back-end.wl.r.appspot.com/users/${user.uid}/updateHandle?newHandle=${encodeURIComponent(newHandle)}`)
          .then(onSuccess)
          .catch(onError);
  },

  deleteUserScore: (scoreId, onSuccess, onError) => {
    if (!scoreId) {
      onError(new Error("No score ID provided"));
      return;
    }
    axios.delete(`https://project4-back-end.wl.r.appspot.com/deleteUserScore?scoreId=${scoreId}`)
      .then(onSuccess)
      .catch(onError);
  },

  createUser: (userData, onSuccess, onError) => {
    axios.post('https://project4-back-end.wl.r.appspot.com/users', userData)
      .then(onSuccess)
      .catch(onError);
  }
};

export default ApiService;
