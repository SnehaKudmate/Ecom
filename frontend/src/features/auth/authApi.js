// A mock function to mimic making an async request for data
export function createUser (userData) {
  return new Promise(async(resolve) =>
   { 
    const response = await fetch("http://localhost:8000/auth/api/create",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        },
        credentials: 'include',
        body:JSON.stringify(userData)
    });
    const data = await  response.json();
    resolve({data})
  }
  );
}

export function checkUser (userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8000/auth/api/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        credentials: 'include',
        headers: { 'content-type': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }

  });
}
