export function addToCart (userData) {
  return new Promise(async(resolve, reject) =>
   { 
    try {
      const response = await fetch("http://localhost:8000/cart/api/create",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          },
          credentials:"include",
          body:JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      resolve({data});
    } catch (error) {
      reject(error);
    }
  }
  );
}
export function fetchItemsByUserId () {
  return new Promise(async(resolve, reject) =>
   { 
    try {
      const response = await fetch("http://localhost:8000/cart/api",{
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      resolve({data});
    } catch (error) {
      reject(error);
    }
  }
  );
}

export function updateCart(updated) {
  return new Promise(async(resolve, reject) =>
   { 
    try {
      const response = await fetch("http://localhost:8000/cart/api/update/"+updated.id,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json",
          },
          body:JSON.stringify(updated) ,
          credentials: 'include',   
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      resolve({data});
    } catch (error) {
      reject(error);
    }
  }
  );
}


export function deleteItemFromCard(itemId) {
  return new Promise(async(resolve, reject) =>
   { 
    try {
      const response = await fetch("http://localhost:8000/cart/api/delete/"+itemId,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          },
          credentials: 'include',  
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      resolve({data:{id:itemId}});
    } catch (error) {
      reject(error);
    }
  }
  );
}


export function resetCart() {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId();
 
    const items = response.data;
    
    for (let item of items) {
      await deleteItemFromCard(item.id);
    }
    resolve({ status: 'success' });
  });
}