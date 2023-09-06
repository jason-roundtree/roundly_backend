async function createRecords(model, numRecords = 0, fn) {
  console.log({ model, numRecords, fn: fn.name });
  for (let i = 0; i < numRecords; i++) {
    try {
      const createdRecord = await model.create(fn());
      console.log("successfully created record");
      // console.log("successfully created record: ", createdRecord);
    } catch (e) {
      console.log("create records error: ", e);
    }
  }
}

module.exports = createRecords;
