const prompt = require("prompt-sync")();
const username = prompt("What is your name? ");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const customerSchema = require("./schema");
const Create = "1.Create a customer";
const View = "2.View all customers";
const Update = "3.Update a customer ";
const Delete = "4.Delete a customer ";
const Exit = "5.quit";
console.log(`Welcome ${username}\n`);
console.log(`What do you want to do ${username}\n`);
console.log(`${Create}\n${View}\n${Update}\n${Delete}\n${Exit}\n`);
let query = prompt(`Number of action to run:`);

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await runQueries();
  await mongoose.disconnect();
  process.exit();
};

const runQueries = async () => {
  if (query === "1") {
    const userName = prompt(`What is the customers new name?`);
    const userAge = prompt(`What is the customers new age?`);
    await createSchema(userName, userAge);
    console.log(`\n\nWhat do you want to do again ${username}\n`);
    console.log(`${Create}\n${View}\n${Update}\n${Delete}\n${Exit}\n\n`);
    query = prompt(`Number of action to run:`);
    await runQueries();
  }
  if (query === "2") {
    await findSchema();
    console.log(`\n\nWhat do you want to do again ${username}\n`);
    console.log(`${Create}\n${View}\n${Update}\n${Delete}\n${Exit}\n\n`);
    query = prompt(`Number of action to run:`);
    await runQueries();
  }
  if (query === "3") {
    await findSchema();
    const userId = prompt(
      `Copy and paste the id of the customer you would like to update here:`
    );
    const userName = prompt(`What is the customers new name?`);
    const userAge = prompt(`What is the customers new age?`);
    await updateSchema(userId, userName, userAge);
    console.log(`\n\nWhat do you want to do again ${username}\n`);
    console.log(`${Create}\n${View}\n${Update}\n${Delete}\n${Exit}\n\n`);
    query = prompt(`Number of action to run:`);
    await runQueries();
  }
  if (query === "4") {
    await findSchema();
    const userId = prompt(
      `Copy and paste the id of the customer you would like to delete here:`
    );
    await deleteSchema(userId);
    console.log(`\n\nWhat do you want to do again ${username}\n`);
    console.log(`${Create}\n${View}\n${Update}\n${Delete}\n${Exit}\n\n`);
    query = prompt(`Number of action to run:`);
    await runQueries();
  }
  if (query === "5") {
    console.log("Exiting...");
    mongoose.connection.close();
  }
  if (
    query !== "5" ||
    query !== "4" ||
    query !== "3" ||
    query !== "2" ||
    query !== "1"
  ) {
    console.log(`\n\nPick a right number ${username}\n`);
    console.log(`${Create}\n${View}\n${Update}\n${Delete}\n${Exit}\n\n`);
    query = prompt(`Number of action to run:`);
    await runQueries();
  }
};

const createSchema = async (userName, userAge) => {
  const SchemaData = {
    name: userName,
    age: userAge,
  };

  const Schema = await customerSchema.create(SchemaData);
  console.log("New Schema: ", Schema);
};

const findSchema = async () => {
  const Schemas = await customerSchema.find({});
  Schemas.forEach((schema) => {
    console.log(
      `ID: ${schema._id} --  Name: ${schema.name} , Age: ${schema.age}`
    );
  });
};

const updateSchema = async (userId, userName, userAge) => {
  const updatedSchema = await customerSchema.findByIdAndUpdate(
    userId,
    { name: userName },
    { age: userAge }
  );
  console.log("Updated Schema:", updatedSchema);
};

const deleteSchema = async (userId) => {
  const removedSchema = await customerSchema.findByIdAndDelete(userId);
  console.log("Removed Schema:", removedSchema);
};
connect();
