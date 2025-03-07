# Task-Management-Project
# For the backend Project 

## Getting Started

### Clone the Repository
open development console and go to the TaskManagement folder
cd .\TaskManagement\TaskManagement.Web.API.UI

### Set Up the Database

1. Update the connection string in `appsettings.json` to point to your SQL Server instance:
"ConnectionStrings": {
  "DefaultConnection": "Server=your_server;Database=your_database;User Id=your_user;Password=your_password;"
}

2. Apply the database migrations:
 dotnet ef database update  


### Configure JWT Authentication

Update the JWT settings in `appsettings.json`:
"Jwt": { "Key": "your_secret_key", "Issuer": "your_issuer", "Audience": "your_audience" }


### Run the Application

1. Open the solution in Visual Studio 2022.
2. Set `TaskManagement.Web.API.UI` as the startup project.
3. Press `F5` to run the application.

The API will be available at `https://localhost:5001`.

### Swagger UI

You can explore the API endpoints using Swagger UI at `https://localhost:5001/swagger`.

## CORS Configuration

The application is configured to allow requests from an Angular application running on `http://localhost:4200`. You can update the CORS policy in `Program.cs` if needed.
builder.Services.AddCors(options => { options.AddPolicy("AllowAngularApp", policy => { policy.WithOrigins("http://localhost:4200") .AllowAnyMethod() .AllowAnyHeader() .AllowCredentials(); }); });


## Session Configuration
The application uses session management with a timeout of 1 hour. You can update the session settings in `Program.cs` if needed.
builder.Services.AddSession(options => { options.Cookie.Name = ".TeamManagement.Session"; options.IdleTimeout = TimeSpan.FromSeconds(10); options.Cookie.IsEssential = true; });

# For the backend Project 


    
