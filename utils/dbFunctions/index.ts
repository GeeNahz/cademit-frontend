export async function createObject(model: any, payload: any) {
  const newRecord = new model({ ...payload });
  const createdRecord = await newRecord.save();
  return createdRecord;
}

export async function listObjects(model: any, limit: string | number, skip: string | number) {
  const list = await model.find({});
  return list;
}