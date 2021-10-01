import mongoose from 'mongoose';
import { app } from './app.js';

async function main() {
  const uri = 'mongodb+srv://root:root@cluster0.g6zhy.mongodb.net/lusha-exc?retryWrites=true&w=majority';

  try {
    await mongoose.connect(uri);

    app.listen(3002, () => {
      console.log('server is running on port 3002!');
    });
  } catch (e) {
    console.error(e);
  }
}

main().catch(console.error);
