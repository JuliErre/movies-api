const user = require("../models/User");
const watchList = require("../models/WatchList")
const { encryptPassword, comparePassword } = require("../helpers/handleBcrypt");
const { tokenSign, verifyToken } = require("../helpers/generateToken");

const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).send({msg:"Please enter all fields"});
        }

        const userExists = await user.findOne({
            email,
        });

        if (userExists) {
            return res.status(400).send({msg:"User already exists"});
        }

        const passwordHash = await encryptPassword(password);

        const date = new Date();
        const register = await user.create({
            password: passwordHash,
            email,
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
            photo: "https://art-gallery-latam.api.hbo.com/images/a286cb57-fee3-45b1-a9c0-b9fabe519bfb/avatar?size=250x250&format=png",
        });
        const createUserWl = await watchList.create({
            userId: register._id,
            movies: [],
        })

        const sendData = await res.send(register);
        return sendData;
    } catch (err) {
        console.log(err);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userLogin = await user.findOne({
            email,
        });

        if (!userLogin) {
            return res.status(400).send("User not found");
        }
        const checkPassword = await comparePassword(
            password,
            userLogin.password
        );

        const token = await tokenSign(userLogin);

        if (checkPassword) {
            return res.send({data:{id : userLogin._id, name : userLogin.name, photo: userLogin.photo}, token});
        }

        return res.status(400).send("Password is incorrect");
    } 
    
    catch (err) {
        console.log(err);
    }
};

module.exports = { register, login };
