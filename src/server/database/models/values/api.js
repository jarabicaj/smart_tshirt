import Values from "./model";

export const saveValues = async (valuesInput) => {
  const values = new Values(valuesInput);
  try {
    return await values.save()
  } catch(err) {
    console.log("error", err)
    return null;
  }
}