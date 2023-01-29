// update user photo
const user = require("../models/User");
const updatePhoto = async (req, res) => {
    try {
        const { photo, userId } = req.body;
        const userInfo = await user.findById(userId);
        userInfo.photo = photo;
        await userInfo.save();
        res.status(200).json({
            status: "success",
            data: {
                userInfo,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        });
    }
};

module.exports = { updatePhoto };