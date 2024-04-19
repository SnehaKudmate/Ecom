export function fetchAllProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8000/product/api/get",{
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchProductsByFilter (filter,sort,pagination,admin) {
  let queryString = '';
  for(let key in filter){
     queryString += `${key}=${filter[key]}&`
  }
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
 }
 for(let key in pagination){
  queryString += `${key}=${pagination[key]}&`
}
if(admin){
  queryString += `admin=true`;
}
  return new Promise(async(resolve) =>
   { 
    const response = await fetch("http://localhost:8000/product/api/get?" + queryString,{
      credentials: 'include',
    });
    const data = await  response.json();
    resolve({data})
  }
  );
}


export function createProduct(product) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8000/product/api/create",{
        method:"POST",
        headers:{
          'content-type': "application/json"
        },
        credentials: 'include',
        body:JSON.stringify(product)
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchProductDetails(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8000/product/api/get/${id}`,{
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}


export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      'http://localhost:8000/product/api/update/' + update.id,
      {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
//category
export function fetchAllCatgories() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8000/category/api/get",{
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}


//brand


export function fetchAllBrands() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8000/brand/api/get",{
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}
