"use strict";
const Utility = require("../lib/utils/util");
const UtilityInstance = new Utility();
const db = require("../db");
const { response } = require("express");

const addItem = async (request, response) => {
  let data;
  let status = 200;
  let message;

  try {
    const { name, price, quantity } = request.body;

    if (!name || !price || !quantity) {
      return response
        .status(400)
        .json({ success: false, message: "Incomplete data provided" });
    }

    const insertQuery =
      "INSERT INTO grocery_items (name, price, quantity) VALUES (?, ?, ?)";

    db.query(insertQuery, [name, price, quantity], (err, result) => {
      if (err) {
        console.error(
          "Error adding grocery item to the database: " + err.message
        );
        throw { status: 500, message: "Internal server error" };
      }

      data = { success: true, message: "Grocery item added successfully" };
      return response.send(
        UtilityInstance.formatResponse(status, data, message)
      );
    });
  } catch (error) {
    message = error.message;
    status = error.status === void 0 ? 500 : error.status;
    data = {
      Error: error.data === void 0 ? "Unable to fetch detail !" : error.data,
    };
    return response.send(UtilityInstance.formatResponse(status, data, message));
  }
};

const viewItems = async (request, response) => {
  let data;
  let status = 200;
  let message;

  try {
    const selectQuery = "SELECT * FROM grocery_items";

    db.query(selectQuery, (err, results) => {
      if (err) {
        return response
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }

      const groceryItems = results.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      return response.send(
        UtilityInstance.formatResponse(
          status,
          { groceryItems },
          "Grocery items retrieved successfully"
        )
      );
    });
  } catch (error) {
    message = error.message;
    status = error.status === void 0 ? 500 : error.status;
    data = {
      Error: error.data === void 0 ? "Unable to feth detail !" : error.data,
    };
    return response.send(UtilityInstance.formatResponse(status, data, message));
  }
};

const removeItems = async (request, response) => {
  let data;
  let status = 200;
  let message;

  try {
    const { itemId } = request.query;

    if (!itemId) {
      return response
        .status(400)
        .json({ success: false, message: "Item Id is Required" });
    }

    const deleteQuery = "DELETE FROM grocery_items WHERE id = ?";

    db.query(deleteQuery, [itemId], (err, result) => {
      if (err) {
        return response
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return response
          .status(404)
          .json({ success: false, message: "Grocery item not found" });
      }

      return response.send(
        UtilityInstance.formatResponse(
          200,
          null,
          "Grocery item removed successfully"
        )
      );
    });
  } catch (error) {
    message = error.message;
    status = error.status === void 0 ? 500 : error.status;
    data = {
      Error: error.data === void 0 ? "Unable to feth detail !" : error.data,
    };
    return response.send(UtilityInstance.formatResponse(status, data, message));
  }
};

const updateItem = async (request, response) => {
  let data;
  let status = 200;
  let message;

  try {
    const { itemId } = request.query;

    if (!itemId) {
      return response
        .status(400)
        .json({ success: false, message: "Item Id is Required" });
    }

    const { name, price, quantity } = request.body;

    if (!name || !price || !quantity) {
      return response
        .status(400)
        .json({ success: false, message: "Incomplete data provided" });
    }

    const updateQuery =
      "UPDATE grocery_items SET name = ?, price = ?, quantity= ? WHERE id = ?";

    db.query(updateQuery, [name, price, quantity, itemId], (err, result) => {
      if (err) {
        return response
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return response
          .status(404)
          .json({ success: false, message: "Grocery item not found" });
      }

      return response.send(
        UtilityInstance.formatResponse(
          200,
          null,
          "Grocery item updated successfully"
        )
      );
    });
  } catch (error) {
    message = error.message;
    status = error.status === void 0 ? 500 : error.status;
    data = {
      Error: error.data === void 0 ? "Unable to feth detail !" : error.data,
    };
    return response.send(UtilityInstance.formatResponse(status, data, message));
  }
};

const manageInventory = async (request, response) => {
  let data;
  let status = 200;
  let message;

  try {
    const { itemId } = request.query;

    if (!itemId) {
      return response
        .status(400)
        .json({ success: false, message: "Item Id is Required" });
    }

    const { quantity } = request.body;

    if (!quantity) {
      return response
        .status(400)
        .json({ success: false, message: "Incomplete data provided" });
    }

    const updateQuery = "UPDATE grocery_items SET quantity= ? WHERE id = ?";

    db.query(updateQuery, [quantity, itemId], (err, result) => {
      if (err) {
        return response
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return response
          .status(404)
          .json({ success: false, message: "Grocery item not found" });
      }

      return response.send(
        UtilityInstance.formatResponse(
          200,
          null,
          "Inventory levels managed successfully"
        )
      );
    });
  } catch (error) {
    message = error.message;
    status = error.status === void 0 ? 500 : error.status;
    data = {
      Error: error.data === void 0 ? "Unable to feth detail !" : error.data,
    };
    return response.send(UtilityInstance.formatResponse(status, data, message));
  }
};

module.exports = {
  addItem,
  viewItems,
  removeItems,
  updateItem,
  manageInventory,
};
