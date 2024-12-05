const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://dbUberApp:dbUber123456@tellevoapp.me7lb.mongodb.net/?retryWrites=true&w=majority&appName=TeLLevoApp';

exports.handler = async (event) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('TeLLevoApp'); // Asegúrate de usar el nombre correcto de la base de datos.
    const collection = database.collection('pasajeros');

    const user = {
      name: event.name,
      email: event.email,
      password: event.password,
    };

    const result = await collection.insertOne(user);

    console.log('Usuario registrado:', result);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Usuario registrado exitosamente',
        data: result,
      }),
    };
  } catch (err) {
    console.error('Error al conectar con MongoDB Atlas:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Hubo un error al registrar el usuario',
        error: err.message,
      }),
    };
  } finally {
    await client.close();
  }
};