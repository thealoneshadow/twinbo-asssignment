const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001; // THIS IS IMPORTANT ✅

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// THIS LINE IS REQUIRED!
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
