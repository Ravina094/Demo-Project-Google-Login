const db = require("../Models");
const axios = require("axios");
require("dotenv").config();

/**
 * Register a new user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body containing user details.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - Express response object.
 *
 * @returns {void}
 *
 * @description This function handles user registration. It receives the user's name, email, and password, creates a new user in the database, and returns a success message with the user data if successful. If an error occurs, it returns an error message.
 */
const registerUser = async (req, res) => {
  const { name, email, password, location } = req.body;
  try {
    const user = await db.user.create({ name, email, password, location });
    res.json({
      message: "User registered successfully!", 
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

/**
 * Log in a user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @returns {void}
 *
 * @description This function handles user login. It assumes that the user has already been authenticated by Passport.js. It returns a success message with the authenticated user data.
 */
const loginUser = (req, res) => {
  res.json({ message: "User logged in successfully!", data: req.user });
};

/**
 * Get weather data for the authenticated user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @returns {void}
 *
 * @description Fetches and returns weather data based on the authenticated user's location stored in the database.
 */
const getWeatherForUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch the user from the database
    const user = await db.user.findByPk(userId);

    if (!user || !user.location) {
      return res.status(400).json({ message: "User location not available" });
    }

    // Construct the OpenWeatherMap API URL
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      user.location
    )}&appid=${apiKey}&units=metric`;

    // Fetch weather data from OpenWeatherMap API
    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    // Return the weather data
    res.json({
      message: "Weather data fetched successfully!",
      data: weatherData,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching weather data", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getWeatherForUser,
};
