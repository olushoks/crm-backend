const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  client_id: {
    type: Schema.Types.ObjectId,
  },
  subject: {
    type: String,
    maxlength: 100,
    required: true,
    default: "",
  },
  opened_on: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  status: {
    type: String,
    maxlength: 300,
    required: true,
    default: "Pendng operator responose",
  },
  conversation: [
    {
      sender: {
        type: String,
        maxlength: 50,
        required: true,
        default: "",
      },
      message: {
        type: String,
        maxlength: 1000,
        required: true,
        default: "",
      },
      sent_date: {
        type: Date,
        required: true,
        default: Date.now(),
      },
    },
  ],
});

module.exports = {
  TicketSchema: mongoose.model("Ticket", TicketSchema),
};
