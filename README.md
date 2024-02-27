# qp-assessment
API documentation:

# Grocery Booking API Documentation


## Admin Endpoints

### 1. Add New Grocery Item

- **Endpoint:**
POST /admin/addItem

- **Request:**
```
{
  "name": "Yogurt",
  "price": 20,
  "quantity": 50
}
```
- **Response:**
```
{
  "success": true,
  "message": "Grocery item added successfully"
}
```
### 2. View Existing Grocery Items

- **Endpoint:**
GET /admin/viewItems

- **Response:**
```
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Yogurt",
      "price": 20,
      "quantity": 50
    },
    // ...
  ]
}
```

### 3. Remove Grocery Item

- **Endpoint:**
DELETE /admin/removeItem?itemId=1

- **Response:**
```
{
  "success": true,
  "message": "Grocery item removed successfully"
}
```
### 4. Update Grocery Item

- **Endpoint:**
PUT /admin/updateItem?itemId=1

- **Request:**
```
{
  "name": "Strawberry Yogurt",
  "price": 40,
  "quantity": 70
}
```

- **Response:**
```
{
  "success": true,
  "message": "Grocery item updated successfully"
}
```
### 5. Manage Inventory of Grocery Item
   
- **Endpoint:**
PUT /admin/manageInventory?itemId=1

- **Request:**
```
{
  "quantity": 90
}
```
- **Response:**
```
{
  "success": true,
  "message": "Inventory managed successfully"
}
```


## User Endpoints
### 1. View Available Grocery Items
   
- **Endpoint:**
GET /user/viewItems

- **Response:**
```
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Yogurt",
      "price": 30,
      "quantity": 70
    },
    // ...
  ]
}
```
### 2. Book Multiple Grocery Items

- **Endpoint:**
POST /user/bookItems
  
- **Request:**
```
 {
    "items": [
      { "itemId": 1, "quantity": 2 },
      { "itemId": 2, "quantity": 3 }
    ],
    "userName": "Mike Lee"
}
```

- **Response:**
```
  {
    "success": true,
    "data": {
      "orders": [
        { "itemId": 1, "status": "Success", "userName": "Mike Lee", "groceryName": "Yogurt", "quantity": 3 },
        { "itemId": 2, "status": "Not Found" }
      ]
    },
    "message": "Order processing completed"
  }
```
``
