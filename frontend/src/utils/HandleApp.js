import axios from "axios";

// const baseUrl = 'http://localhost:6000'

const getAllTodo = async (setToDo) => {
  // try {
  //   const response = await axios.get(`${baseUrl}/task/alltask`);
  //   const data = response.data;
  //   console.log('API Response:', data);
  //   setToDo(data);
  // } catch (err) {
  //   console.error('Error fetching todos:', err.message);
  // }

  axios.get('http://127.0.0.1:9178/task/alltask')
      .then(response => {
          console.log(response.data?.data);
          setToDo(response.data?.data);  // Move setToDo inside the then() block
      })
      .catch(error => {
          console.error('Error fetching data:', error);
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error('Error status', error.response.status);
              console.error('Error data', error.response.data);
          } else if (error.request) {
              // The request was made but no response was received
              console.error('Error request', error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              console.error('Error message', error.message);
          }
          console.log(error.config);
      });


};

export { getAllTodo };
