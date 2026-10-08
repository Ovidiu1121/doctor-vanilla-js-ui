# Doctor Management Application — Frontend

A browser interface for managing doctor records, built with vanilla JavaScript, HTML, and CSS. The application communicates with an ASP.NET Core REST API.

**Backend repository:** [doctor-crud-api](https://github.com/Ovidiu1121/doctor-crud-api)

## Technologies

- JavaScript (ES modules)
- HTML
- CSS
- Fetch API

## Features

- Display doctor records in a table.
- Add doctors with a name, type, and patient count.
- Update the patient count of an existing doctor.
- Delete doctor records.
- Validate required form fields.
- Display loading indicators, success messages, and error feedback.

## Project Structure

- **index.html:** Main application page.
- **app.js:** Application entry point.
- **functions.js:** UI rendering, event handling, validation, and API requests.
- **Stylesheets:** Application styling.
- **example-markup and mockups:** Reference layouts and design assets.

## Running Locally

1. Clone this repository.
2. Set up and start the backend by following its README.
3. Check the API URLs in `functions.js`. They currently use:

```text
https://localhost:7111/api/v1/Doctor
```

Update the address if your backend runs on a different host or port.

4. Serve the frontend through a local HTTP server, such as the Live Server extension in Visual Studio Code.
5. Open `index.html` through that server.

Use a local server rather than opening the HTML file directly, because the application uses JavaScript modules.

## Backend Requirements

The frontend requires a running backend and its configured MySQL database.

For local HTTPS, ensure that your browser trusts the backend development certificate. If the frontend and backend run on different origins, the backend must allow the frontend origin through CORS.

## Related Repository

See [doctor-crud-api](https://github.com/Ovidiu1121/doctor-crud-api) for the API implementation, database configuration, Swagger documentation, and backend tests.
