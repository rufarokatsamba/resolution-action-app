# resolution-action-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm serve
```

### Compiles and minifies for production
```
npm build
```

### Lints and fixes files
```
npm lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Setup instructions

## C# Backend

1.Open  ResolutionActionSystem_Backend  folder with preferably Visual studio 2022
2.From the file explorer open Api folder and set ResolutionActionSystem.Api  as the startup project
3.Within  the src/API folder there is appsettings.json file with below format where you change the miscrosoft sql server db connection string.

{
  "ConnectionStrings": {
    "ResolutionActionSystemConnectionString": "server=***;database=resolution_action_system_db;trusted_connection=true;trustServerCertificate=true;Integrated Security=False;User ID=***;Password=***"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "JwtSettings": {
    "Key": "84322CFB66934ECC86D547C5CF4F2EFC", //84322CFB66934ECC86D547C5CF4F2EFC
    "Issuer": "@RKats",
    "Audience": "ResolutionActionSystem",
    "DurationInMinutes": 60
  }
}


4.Migrations

-within  Visual Studio go to Tools->Nugget Package Manager->Package Manager Console and execute below migrations within the terminal.

run them in the order they appear
dotnet ef migrations add InitialIdenityCreation --project ResolutionActionSystem.Identity --startup-project ResolutionActionSystem.Api --context ResolutionActionIdentityDbContext
dotnet ef database update InitialIdenityCreation --project ResolutionActionSystem.Identity --startup-project ResolutionActionSystem.Api --context ResolutionActionIdentityDbContext

The Above creates the database tables and we now proceed to setting up frontend

5.Execute the project and take note of the port its running on. in my case its  https://localhost:7266/

Vue frontend

1.Extract  resolution-action-app.zip or pull from the git repo : https://github.com/rufarokatsamba/resolution-action-app
2.Navigate into the extracted folder and run  npm install
3.within  the src folder there is a .env file  in my case it has the below contents. Modify the port to match that of the backend
	# Backend API
	VUE_APP_RESOLUTION_SYSTEM_API=https://localhost:7266/api

4.Proceed to registering an account and Login
5.Start by configuring the meeting type and meeting status by navigating to their pages on the left navigation sidebar before capturing a new meeting under meetings page

