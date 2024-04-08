const express = require("express");
const cors = require("cors");
const app = express();
const port = 3008;
const { Sequelize, DataTypes } = require("sequelize");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "unPasswordMegaSeguro0231948!";
app.use(cors());
// Express middleware for parsing JSON
app.use(express.json());

//Conexion a la DB

// Database connection

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "516938",
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

// Synchronize the database with the defined models.
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

//syncronizeDB();

const verifyToken = (req, res, next) => {
  // Get the token from the request headers or query parameters
  const token = req.headers["authorization"] || req.query.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  console.log("token");

  const tokenWithoutBearer = token.split(" ")[1];
  console.log(token);
  console.log("tokenWithoutBearer");
  console.log(tokenWithoutBearer);
  // Verify the token
  jwt.verify(tokenWithoutBearer, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Check if the token has expired
    if (decoded.exp <= Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ error: "Token has expired" });
    }

    // Attach the decoded user ID to the request object for further use
    req.userId = decoded.userId;
    next(); // Move to the next middleware
  });
};

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
    const { user_email, user_password } = req.body;
    console.log("req.body");
    console.log(req.body);
    const user = await User.model.findOne({
      where: {
        user_email: user_email,
      },
    });

    const isValidPassword = await bcrypt.compare(
      user_password,
      user.user_password
    );
    // Define token expiration time (e.g., 1 hour)
    const expirationTime = 300; // in seconds

    // Generate JWT token with expiration time
    const token = jwt.sign(
      { userId: user.user_id, timeIssued: Date.now() }, // payload
      secretKey,
      { expiresIn: expirationTime } // options
    );

    if (user && isValidPassword) {
      res.status(200).json({ message: "Login successful", user, token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { user_email, user_name, user_last_name, user_password } = req.body;
    console.log("req.body");
    console.log(req.body);

    const hassPassword = await bcrypt.hash(user_password, 10);

    const user = await User.model.create({
      user_email,
      user_name,
      user_last_name,
      user_password: hassPassword,
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await User.model.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    await User.model.destroy({
      where: {
        user_id,
      },
    });

    res.status(204).json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { user_email, user_name, user_last_name, user_password } = req.body;
    await User.model.update(
      {
        user_email,
        user_name,
        user_last_name,
        user_password,
      },
      {
        where: {
          user_id,
        },
      }
    );

    res.status(204).json({ message: "User updated" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//nodemon server.js
