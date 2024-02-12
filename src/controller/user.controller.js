import { userService } from "../services/index.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.send({ status: "success", payload: users });
    } catch (error) {
        console.error("Error fetching all users:", error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).send({ status: "error", error: "User not found" });
        }

        res.send({ status: "success", payload: user });
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const updateBody = req.body;
        const userId = req.params.uid;
        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).send({ status: "error", error: "User not found" });
        }

        await userService.update(userId, updateBody);
        res.send({ status: "success", message: "User updated" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        await userService.deleteById(userId);
        res.send({ status: "success", message: "User deleted" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
};
