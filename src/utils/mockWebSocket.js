// src/utils/mockWebSocket.js
export const simulateInventorySocket = (dispatch) => {
  setInterval(() => {
    // Generate a valid ID that exists in your dataset
    const randomId = Math.floor(Math.random() * 1000) + 1;
    const update = {
      id: `product-${randomId}`, // Use a more realistic ID format
      quantity: Math.floor(Math.random() * 100),
    };

    dispatch({
      type: 'inventory/updateQuantity',
      payload: update,
    });
  }, 5000);
};


// export const connectInventorySocket = (dispatch: any) => {
//   const ws = new WebSocket('wss://yourapi.com/inventory');

//   ws.onmessage = (event) => {
//     const data = JSON.parse(event.data);
//     dispatch({
//       type: 'inventory/realTimeUpdate',
//       payload: data,
//     });
//   };

//   return ws;
// };
