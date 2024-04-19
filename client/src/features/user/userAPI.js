// A mock function to mimic making an async request for data
export function updateUser (update) {
  return new Promise(async(resolve) =>
   { 
    const response = await fetch("http://localhost:8000/user/api/update",{
      method: "PATCH",
      body:JSON.stringify(update),
      headers:{
        'content-type':'application/json'
      },
      credentials: 'include',
    });
    const data = await  response.json();
    resolve({data})
  }
  );
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8000/user/api",{
       credentials: 'include',
    }) ;
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8000/order/api/user',{
      credentials:'include'
    }) 
    const data = await response.json()
    resolve({data})
  }
  );
}