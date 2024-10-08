import chalk from "chalk";
import { uuid } from "uuidv4";
import { db } from "./app.js";

// http://localhost:3000 - default route
// http://localhost:3000/api/events - return all events
// http://localhost:3000/api/events/1 - GET return event with id of 1
// http://localhost:3000/api/events - POST post event with new id
// http://localhost:3000/api/events/1 - DELETE delete event with id of 1
// http://localhost:3000/api/events/1 - PUT update event with id of 1

const router = async (req, res) => {
  // Destructure the req
  const { url, method } = req;

  // Helper function to send JSON response
  const sendJSONResponse = (statusCode, data) => {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(statusCode);
    res.end(JSON.stringify(data));
  };

  // GET all events
  if (url === "/api/events" && method === "GET") {
    const events = db.read();
    if (events.length > 0) {
      sendJSONResponse(200, events);
    } else {
      sendJSONResponse(400, { message: "Events are empty" });
    }
  }

  // GET a single event
  else if (url.match(/\/api\/events\/\d+/) && method === "GET") {
    const id = parseInt(url.split("/")[3]);
    const event = db.read(id);

    if (event) {
      sendJSONResponse(200, event);
    } else {
      sendJSONResponse(404, { message: "Event not found" });
    }
  }

  // POST a new event
  else if (url === "/api/events" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { imageUrl, title, price, date, location, company } =
        JSON.parse(body);
      const newevent = {
        id: db.data.events.length + 1,
        imageUrl,
        title,
        price,
        date,
        location,
        company,
      };
      db.create(newevent);
      sendJSONResponse(201, { message: "New event added", event: newevent });
    });
  }

  // PUT to update an existing event
  else if (url.match(/\/api\/events\/\d+/) && method === "PUT") {
    const id = parseInt(url.split("/")[3]);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { imageUrl, title, price, date, location, company } =
        JSON.parse(body);
      const updateData = { imageUrl, title, price, date, location, company };

      const updated = db.update(id, updateData);
      if (updated) {
        sendJSONResponse(200, { message: "Event updated", event: updated });
      } else {
        sendJSONResponse(404, { message: "Event not found" });
      }
    });
  }

  // DELETE an event
  else if (url.match(/\/api\/events\/\d+/) && method === "DELETE") {
    const id = parseInt(url.split("/")[3]);
    const deleted = db.delete(id);
    if (deleted) {
      sendJSONResponse(200, { message: "Event deleted" });
    } else {
      sendJSONResponse(404, { message: "Event not found" });
    }
  }

  // GET all favorite events
  else if (url === "/api/favorites" && method === "GET") {
    const favorites = db.getFavorites(); // Get all favorites
    sendJSONResponse(200, favorites);
  }

  // POST add an event to favorites
  else if (url === "/api/favorites" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { id } = JSON.parse(body);
      const addedFavorite = db.addFavorite(id);
      if (addedFavorite) {
        sendJSONResponse(201, {
          message: "Event added to favorites",
          event: addedFavorite,
        });
      } else {
        sendJSONResponse(404, {
          message: "Event not found or already in favorites",
        });
      }
    });
  }

  // DELETE an event from favorites
  else if (url.match(/\/api\/favorites\/\d+/) && method === "DELETE") {
    const id = parseInt(url.split("/")[3]);
    const removedFavorite = db.removeFavorite(id);
    if (removedFavorite) {
      sendJSONResponse(200, { message: "Event removed from favorites" });
    } else {
      sendJSONResponse(404, { message: "Favorite event not found" });
    }
  }

  // If no route matched, send a 404 and a message
  else {
    sendJSONResponse(404, { message: "Route Not Found 😒😒" });
  }
};

export default router;
