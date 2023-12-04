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

  userExists: (googleId) => {
    return axios.get(`https://project4-back-end.wl.r.appspot.com/api/userExists/${googleId}`)
      .then(response => {
        return response.data.exists;
      })
      .catch(error => {
        console.error('Error checking user existence:', error);
        throw error; // Propagate error to the caller
      });
  },


   fetchUserScores: (user) => {
     if (!user) {
       return Promise.reject(new Error("No user provided"));
     }
     return axios.get('https://project4-back-end.wl.r.appspot.com/fetchUserScores', {
       params: {
         googleId: user.uid
       }
     }).then(response => response.data)
       .catch(error => {
         console.error('Error fetching user scores:', error);
         throw error;
       });
   },

   fetchHighScores: (currentPage, pageSize) => {
     return axios.get('https://project4-back-end.wl.r.appspot.com/fetchHighScores', {
       params: {
         page: currentPage,
         size: pageSize
       }
     }).then(response => response.data)
       .catch(error => {
         console.error('Error fetching high scores:', error);
         throw error;
       });
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
