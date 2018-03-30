import Stats from "./model";

export const saveStats = async (statsInput) => {
  const stats = new Stats(statsInput);
  try {
    return await stats.save()
  } catch(err) {
    console.log("error", err)
    return null;
  }
}