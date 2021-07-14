const { TicketSchema } = require("./Ticket_Schema");

const insertTicket = (ticketObj) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.save(ticketObj)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insertTicket,
};
