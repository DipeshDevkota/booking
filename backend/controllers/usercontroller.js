const User = require('../model/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({ message: "User created successfully", newUser });
    } catch (error) {
        console.error("User creation failed", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find the user by email
        const userDoc = await User.findOne({ email });
        if (!userDoc) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check if the password matches
        const isPasswordMatch = await bcrypt.compare(password, userDoc.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate a token
        const token = jwt.sign(
            { email: userDoc.email, id: userDoc._id, name: userDoc.name }, // Include name here
            process.env.SECRET_KEY,
            { expiresIn: '30d' }
        );
        

        // Set token as a cookie
        res.cookie('jwttoken', token, { httpOnly: true,secure: false })
           .status(200)
           .json({
               message: "Login successful",
               user: {
                   id: userDoc._id,
                   name: userDoc.name,
                   email: userDoc.email
               },
               token
           });

    } catch (error) {
        console.error("Login failed", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



const profileUser = async (req, res) => {
    try {
        const { jwttoken } = req.cookies; // Match cookie name

        if (!jwttoken) {
            return res.status(401).json({ message: "No token provided" });
        }

        jwt.verify(jwttoken, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }

            // Optionally, fetch more user details from the database using `user.id`
            // and return it as part of the response
            return res.status(200).json({ user, token: jwttoken });
        });

    } catch (error) {
        console.error("Error in profileUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// const profileUser = (req, res) => {
//     if (someCondition) {
//       return res.json({ message: "Condition met" });
//     }
//     // Some more code, but the previous return prevents another response
//     return res.json({ message: "Another response" });
//   };
  


const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        // Clear the token cookie
        res.clearCookie("jwttoken", { httpOnly: true, secure: false });
 
        // Optionally, find and update user details or log activity
        if (email) {
            const user = await User.findOne({ email });
            if (user) {
                // Perform any additional logic if necessary
                // Example: log the logout event or update the user's last activity
                console.log(`User ${email} logged out.`);
            } else {
                console.log("User not found.");
            }
        }

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout failed", error);
        return res.status(500).json({ message: "Internal server error" });
    }

};

module.exports = {
    registerUser,
    loginUser,
    profileUser,
    logoutUser
};
