import ClientVisit from "../models/clientVisit.model.js";
import Client from "../models/client.model.js";
import createError from "../utils/createError.js";
import User from "../models/user.model.js";

export const createClientVisit = async (req, res, next) => {
  try {
    const client = await Client.findById(req.clientID);

    if (!client) {
      return res.status(404).send("Client not found");
    }
    const newClientVisit = await ClientVisit({
      ...req.body,
      client: req.clientID,
    });

    client.clientVisits.push(newClientVisit);

    await newClientVisit.save();
    await client.save();

    res.status(200).send("new visit client saved");
  } catch (err) {
    next(err);
  }
};

export const getClientVisits = async (req, res, next) => {
  try {
    const clientVisits = await ClientVisit.find({});

    if (clientVisits.length === 0) {
      return next(createError(404, "No client visits found for this client"));
    }

    res.status(200).send(clientVisits);
  } catch (err) {
    next(err);
  }
};

export const getClientVisitDetails = async (req, res, next) => {
  try {
    const clientVisits = await User.aggregate([
      {
        $project: {
          manager: 1,
          firstName: 1,
          lastName: 1,
        },
      },
    ]);

    if (!clientVisits || clientVisits.length === 0) {
      return next(createError(404, "No client visits found"));
    }

    res.status(200).send(clientVisits);
  } catch (err) {
    next(err);
  }
};
