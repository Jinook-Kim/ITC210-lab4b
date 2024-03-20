# Task API Documentation

## To Start

Visit https://jinook.itc210.net:1337/api/v1/auth/google and log in with your Google account. Then save the Cookie "it210_session" to use in your application.

The top endpoint is https://jinook.itc210.net:1337/api/v1/

## Get a Task by ID

### Description
This endpoint retrieves a task with a given ID.

### Path Parameters

| Parameter | Description |
| :---      | :---        |
| id        | The ID of the task to retrieve |

### Request Example
```
GET /task/:id
```

### Response Example
```json
{
    "_id": "60b5ead1b34f5c3a54c2d0cf",
    "UserId": "60b5ea8cb34f5c3a54c2d0ce",
    "Text": "Buy groceries",
    "Done": false,
    "Date": "2021-05-31",
    "__v": 0
}
```

## Create a New Task

### Description
This endpoint creates a new task.

### Request Body JSON Example
```json
{
    "UserId": "60b5ea8cb34f5c3a54c2d0ce",
    "Text": "Buy groceries",
    "Done": false,
    "Date": "2021-05-31"
}
```

### Response Example
```json
{
    "_id": "60b5ead1b34f5c3a54c2d0cf",
    "UserId": "60b5ea8cb34f5c3a54c2d0ce",
    "Text": "Buy groceries",
    "Done": false,
    "Date": "2021-05-31",
    "__v": 0
}
```

## Retrieve All Tasks

### Description
This endpoint retrieves all tasks for a given user.

### Request Example
```
GET /task
```

### Response Example
```json
[
    {
        "_id": "60b5ead1b34f5c3a54c2d0cf",
        "UserId": "60b5ea8cb34f5c3a54c2d0ce",
        "Text": "Buy groceries",
        "Done": false,
        "Date": "2021-05-31",
        "__v": 0
    },
    {
        "_id": "60b5ead1b34f5c3a54c2d0d0",
        "UserId": "60b5ea8cb34f5c3a54c2d0ce",
        "Text": "Walk the dog",
        "Done": true,
        "Date": "2021-05-31",
        "__v": 0
    }
]
```

## Update a Task

### Description
This endpoint updates a task with a given ID.

### Path Parameters

| Parameter | Description |
| :---      | :---        |
| id        | The ID of the task to update |

### Request Body JSON Example
```json
{
    "Text": "Buy groceries",
    "Done": true
}
```

### Response Example
```json
{
    "_id": "60b5ead1b34f5c3a54c2d0cf",
    "UserId": "60b5ea8cb34f5c3a54c2d0ce",
    "Text": "Buy groceries",
    "Done": true,
    "Date": "2021-05-31",
    "__v": 0
}
```

## Delete a Task

### Description
This endpoint deletes a task with a given ID.

### Path Parameters

| Parameter | Description |
| :---      | :---        |
| id        | The ID of the task to delete |

### Request Example
```
DELETE /task/:id
```

### Response Example
```json
{
    "message": "Task deleted successfully"
}
```