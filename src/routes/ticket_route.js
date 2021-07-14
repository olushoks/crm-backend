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
  const { subject, sender, message } = req.body;
  console.log(req.body);
  res.json({ message: "Create new ticket" });
});

module.exports = router;
