const express = require("express");
const cors = require("cors");
const app = express();
const port = 3008;
const { Sequelize, DataTypes } = require("sequelize");

app.use(cors());

//Conexion a la DB

// Database connection

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "1234",
  database: "notas_pweb",
});
// Entity class for dynamic table creation
class Entity {
  constructor(name, fields) {
    this.name = name;
    this.model = sequelize.define(name, fields);
  }

  async sync() {
    await this.model.sync({ force: true });
    console.log(`Table for ${this.name} synchronized`);
  }
}

// Define a simple schema for the User entity
const userSchema = {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  user_last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
};

const noteSchema = {
  note_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    autoIncrement: false,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
};

// Create User entity using the schema
const User = new Entity("User", userSchema);
const Note = new Entity("Note", noteSchema);

// Synchronize the database with the defined models
// This will create the tables if they do not exist
// It will also create the tables with the defined schema
// it will delete the information in the table

const syncronizeDB = () => {
  sequelize
    .sync()
    .then(async () => {
      await User.sync();
      await Note.sync();
    })
    .catch((error) => {
      console.error("Error synchronizing database:", error);
    });
};

syncronizeDB();

// Express middleware for parsing JSON
app.use(express.json());

const user = {
  name: "John",
  age: 25,
};
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.post("/user", (req, res) => {
  console.log("req.body");
  console.log(req);
  res.send(user);
});

app.post("/login", async (req, res) => {
  try {
    const { user_name, user_password } = req.body;
    console.log("req.body");
    console.log(req);

    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//nodemon server.js
