import Client from "../models/client.model.js";
import clientVisit from "../models/clientVisit.model.js";
import createError from "../utils/createError.js";

export const createClient = async (req, res, next) => {
  try {
    const newClient = new Client(req.body);

    await newClient.save();

    res.status(200).send(newClient);
  } catch (err) {
    next(err);
  }
};

export const getClients = async (req, res, next) => {
  try {
    const clients = await Client.find({}).populate("clientVisits");
    if (!clients) return next(createError(403, "there is not client"));

    res.status(200).send(clients);
  } catch (err) {
    next(err);
  }
};

export const getClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id).populate(
      "clientVisits"
    );
    if (!client) return next(createError(404, "no client found"));

    res.status(200).send(client);
  } catch (err) {
    next(err);
  }
};

export const getAllVisits = async (req, res, next) => {
  try {
    const visits = await clientVisit.find({});

    if (!visits) return next(createError(404, "no client visits found"));

    res.status(200).send(visits);
  } catch (err) {
    next(err);
  }
};
