# API Documentation

This document provides detailed information about the Study Timer API endpoints.

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: (To be configured)

## Interactive Documentation

For interactive API documentation with Swagger UI, visit: [http://localhost:3000/api-docs](/api-docs)

## Endpoints

### Get All Persons

Retrieve a list of all persons/characters stored in the database.

**Endpoint:** `GET /api/persons`

**Description:** Returns an array of all persons with their details including id, name, level, and image path.

#### Request

No request parameters or body required.

#### Response

**Success (200 OK)**

```json
[
  {
    "id": 1,
    "name": "Batman",
    "level": 0,
    "image_path": "/assets/persons/batman.webp"
  },
  {
    "id": 2,
    "name": "Dracula",
    "level": 10,
    "image_path": "/assets/persons/dracula.webp"
  }
]
```

**Error (500 Internal Server Error)**

```json
{
  "error": "Erro ao buscar dados"
}
```

#### Response Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Unique identifier for the person |
| `name` | string | Name of the person/character |
| `level` | integer | Current level of the person |
| `image_path` | string | Path to the person's image file |

#### Example Usage

**cURL**

```bash
curl -X GET http://localhost:3000/api/persons
```

**JavaScript (Fetch)**

```javascript
fetch('http://localhost:3000/api/persons')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**TypeScript**

```typescript
interface Person {
  id: number;
  name: string;
  level: number;
  image_path: string;
}

async function getPersons(): Promise<Person[]> {
  const response = await fetch('http://localhost:3000/api/persons');
  if (!response.ok) {
    throw new Error('Failed to fetch persons');
  }
  return response.json();
}
```

## Error Handling

All endpoints may return the following error responses:

- **500 Internal Server Error**: Occurs when there's a database connection issue or query error.

Error responses follow this format:

```json
{
  "error": "Error message description"
}
```

## Notes

- All endpoints return JSON responses
- The API does not require authentication at this time
- Database connection is required for all endpoints to function properly
