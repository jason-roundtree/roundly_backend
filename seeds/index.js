async function createRecords(model, numRecords = 0, fn) {
  console.log({ model, numRecords, fn: fn.name });
  for (let i = 0; i < numRecords; i++) {
    try {
      const createdRecord = await model.create(fn());
      console.log("successfully created record");
      // console.log("successfully created record: ", createdRecord);
    } catch (e) {
      console.log("createRecords error: ", e);
    }
  }
}

async function createBulkRecords(model, data) {
  console.log(">>>>> createBulkRecords data", data);
  try {
    const createdRecords = await model.bulkCreate(data);
    console.log("successfully bulk created records: ", createdRecords);
    // console.log("successfully created record: ", createdRecord);
  } catch (e) {
    console.log("creatBulkRecords error: ", e);
  }
}

module.exports = {
  createRecords,
  createBulkRecords,
};
