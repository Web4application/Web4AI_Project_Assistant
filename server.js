const WebSocket = require('ws');
// Replace with your specific in-built model's library loader
const { loadInBuiltModel } = require('./lmlm'); 

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', async (ws) => {
  console.log('Client connected to local model API');
  const model = await loadInBuiltModel();

  ws.on('message', async (message) => {
    const data = JSON.parse(message);
    const userPrompt = data.prompt;

    // Call the model and stream token chunks back as they generate
    await model.generate(userPrompt, {
      onToken: (token) => {
        ws.send(JSON.stringify({ event: 'token', text: token }));
      },
      onComplete: () => {
        ws.send(JSON.stringify({ event: 'done' }));
      }
    });
  });
});
