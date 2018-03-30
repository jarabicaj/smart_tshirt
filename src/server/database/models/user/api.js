import User from "./model";

export const getAllUsers = async () => {
  try {
    return await User.find()
  } catch(err) {
    console.log("error", err)
    return null;
  }
}
export const getUser = async (id) => {
  try {
    return await User.findById(id)
  } catch(err) {
    console.log("error", err)
    return null;
  }
}

export const createNewUser = async (userInput) => {
  const user = new User(userInput);
  try {
    return await user.save()
  } catch(err) {
    console.log("error", err)
    return null;
  }
}