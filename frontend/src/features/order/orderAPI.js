// A mock function to mimic making an async request for data
export function addOrder (orderData) {
  return new Promise(async(resolve) =>
   { 
    const response = await fetch("http://localhost:8000/order/api/create",{
      method: "POST",
      headers:{
        'content-type': "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(orderData)
    });
    const data = await  response.json();
    resolve({data})
  }
  );
}
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/order/api/update/'+order.id, {
      method: 'PATCH',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllOrders(sort, pagination) {
  let queryString = '';
 
  for (let key in sort) {
   queryString += `${key}=${sort[key]}&`;
 }
   for (let key in pagination) {
     queryString += `${key}=${pagination[key]}&`;
   }
 
   return new Promise(async (resolve) => {
     const response = await fetch(
       'http://localhost:8000/order/api?' + queryString,{
        credentials: 'include',
       }
     );
     const data = await response.json();
     const totalOrders = await response.headers.get('X-Total-Count');
     resolve({ data: { orders: data, totalOrders: +totalOrders } });
   });
 }