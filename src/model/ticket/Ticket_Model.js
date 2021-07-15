const { TicketSchema } = require("./Ticket_Schema");

const insertTicket = (ticketObj) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema(ticketObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getTickets = (client_id) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ client_id })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getSingleTicketById = (client_id, _id) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ client_id, _id })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const clientReply = ({ _id, client_id, message, sender }) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findByIdAndUpdate(
        { _id, client_id },
        {
          status: "pending operator response",
          $push: { conversation: { message, sender } },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const closeTicket = ({ _id, client_id }) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findByIdAndUpdate(
        { _id, client_id },
        { status: "closed" },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const deleteTicket = ({ _id, client_id }) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findByIdAndDelete({ _id, client_id })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insertTicket,
  getTickets,
  getSingleTicketById,
  clientReply,
  closeTicket,
  deleteTicket,
};
