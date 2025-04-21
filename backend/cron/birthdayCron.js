const cron = require("node-cron");
const User = require("../models/User");
const { sendBirthdayEmail } = require("../utils/mailer");

const runBirthdayJob = () => {
  cron.schedule("0 7 * * *", async () => {
    // cron.schedule("* * * * *", async () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    try {
      const users = await User.find();
      const birthdayPeople = users.filter((user) => {
        const dob = new Date(user.dateOfBirth);
        return dob.getDate() === day && dob.getMonth() + 1 === month;
      });

      for (const user of birthdayPeople) {
        await sendBirthdayEmail(user.email, user.username);
      }
    } catch (error) {
      console.error("Cron error:", error);
    }
  });
};

module.exports = runBirthdayJob;
