import User from "./model";

export const createNewUser = async (userInput) => {
  const user = new User(userInput);
  try {
    return await user.save()
  } catch(err) {
    console.log("error", err)
    return null;
  }
}