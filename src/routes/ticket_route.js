const express = require("express");
const router = express.Router();
const { insertTicket } = require("../model/ticket/Ticket_Model");

/*===================================*
        END OF IMPORTS
*===================================*/

router.all("/", (req, res, next) => {
  // res.json({ message: "return ticket from route" });
  next();
});

router.post("/", async (req, res) => {
  try {
    const { subject, sender, message } = req.body;
    const ticketObj = {
      client_id: "60ed7e16904167149b99dceb",
      subject,
      conversation: [
        {
          sender,
          message,
        },
      ],
    };
    const result = await insertTicket(ticketObj);

    if (result._id) {
      return res.json({
        status: "success",
        message: "New ticket has been created",
      });
    }
    return res.json({
      status: "error",
      message: "Unablee to create the ticket. Please try again",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
