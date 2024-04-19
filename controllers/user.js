const userModel = require("../models/users");
const createOutput = require("../utils").createOutput;
const utils = require("../utils");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const passwordMatched = await utils.comparePassword(
        password,
        user.password
      );
      if (passwordMatched) {
          return res.json(createOutput(true, user));
        }else {
          return res.json(createOutput(false, "Incorrect Password"));
        }
    } else {
      return res.json(createOutput(false, "No such user"));
    }
  } catch (error) {
    console.log(error.message);
    return res.json(createOutput(false, error.message, true));
  }
};

const register = async (req, res) => {
  try {
    const { email, password, accountType, firstName, lastName, speciality } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      const saved = await userModel.create({
        email,
        password,
        accountType,
        firstName,
        lastName,
        speciality,
        
      });
      if(saved) {
          return res.json(createOutput(true, "successful registered..."));
        }
      } 
      else {
        return res.json(createOutput(false, "sorry email taken.."));
      }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.json(createOutput(true, users));
  } catch (error) {
    return res.json(false, error.message, true);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    // querying the user in the database
    const user = await userModel.findById(id);
    const { password, email, username } = req.body;
    if (user) {
      const updated = await userModel.updateOne(
        { email: user.email },
        { password, email, username }
      );
      if (updated) {
        return res.json(createOutput(true, updated));
      } else {
        return res.json(createOutput(false, "failed to update the user"));
      }
    }
    return res.json(createOutput(false, "failed to get user with given id"));
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};

const countUsers = async (req, res) => {
  try {
    const allUsersCount = await userModel.find().count();
    if (allUsersCount) {
      return res.json(createOutput(true, allUsersCount));
    } else {
      return res.json(createOutput(false, allUsersCount));
    }
  } catch (error) {
    console.log(error.message);
    return res.json(createOutput(false, error.message, true));
  }
};

const deleteUser = async (req, res) => {
  try {
    const email = req.params.email;
    const deleted = await userModel.deleteOne({ email });
    if (deleted) {
      return res.json(createOutput(true, deleted));
    } else {
      return res.json(createOutput(false, deleted));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};




const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (user) {
      return res.json(createOutput(true, user));
    } else {
      return res.json(createOutput(false, "No such user"));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};


const specificSpeciallity = async (req, res) => {
  try {
    const nature = req.params.nature
    const data = await userModel.find({accountType: nature})
    // console.log("Nature: ", nature);
    if(data) {
      return res.json(createOutput(true, data));
    }else {
      return res.json(createOutput(false, data));

    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
}


module.exports = {
  allUsers,
  login,
  deleteUser,
  updateUser,
  register,
  getUserById,
  countUsers,
  specificSpeciallity
};
