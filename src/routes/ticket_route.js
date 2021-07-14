const express = require("express");
const router = express.Router();
const { insertTicket, getTickets } = require("../model/ticket/Ticket_Model");
const { userAuth } = require("../middleware/auth");

/*===================================*
        END OF IMPORTS
*===================================*/

router.all("/", (req, res, next) => {
  // res.json({ message: "return ticket from route" });
  next();
});

// create new tickekt
router.post("/", userAuth, async (req, res) => {
  try {
    const { subject, sender, message } = req.body;
    const userId = req.userId;
    const ticketObj = {
      client_id: userId,
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

// get all tickets for specific user
router.get("/", userAuth, async (req, res) => {
  try {
    const userId = req.userId;

    const result = await getTickets(userId);

    if (result.length) {
      return res.json({
        status: "success",
        result,
      });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
