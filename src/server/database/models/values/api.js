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

export const getValues = async (id) => {
  try {
    return await Values.findById(id)
  } catch(err) {
    console.log("error", err)
    return null;
  }
}
