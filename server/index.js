// Import Dependencies
const express = require('express');
const app = express();

// Get Route
app.get('/', (req,res)=>{
  // Sending This is the home page! in the page
  res.send('This is the home page!');
});

// Listening to the port
let PORT = 5555;
app.listen(PORT)

// FINISH!




// // npm init
// // npm i express

// const express = require('express');
// const server = express();

// const PORT = 3000;

// // Body parser
// server.use(express.json());

// // Homme page
// server.get('/', (req, res) => {
//   return res.send("<h1 style='text-align: center;'>Hello,<br />from the Express.js server!</h1>");
// })

// // About page
// server.get('/about', (req, res) => {
//   return res.send('<h2 style="text-align:center">About us</h2>');
// })

// // 404 page
// server.use((req, res, next) =>{
//   res.status(404);

//   // respond with html page
//   if (req.accepts('html')) {
//     res.sendFile(__dirname + '/error404.html');
//     return;
//   }
//   // respond with json
//   else if (req.accepts('json')){
//     res.send({
//       status: 404,
//       error: 'Not found'
//     });
//     return;
//   }
//   // respond with text
//   else {
//     res.type('txt').send('Error 404 - Not found');
//   }
// });

// // Listening to the port
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Running the server: node server.js