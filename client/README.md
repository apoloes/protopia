# Protopia Internal Dashboards

This project is for COMP 523 Software Engineering Lab. We are working with a start-up called Protopia, an online platform that fosters student-alumni engagement. We have created Vue.js dashboards to provide insights using Protopia's API. 

## Getting Started

### Prerequisites
For this project, install Node.js and npm from here: https://nodejs.org/en/

### Installation
Both the main directory and the /client directory have package.json files. For both directories, run:
```
npm install 
```

### Running locally
To run concurrently on your local machine, in the main directory, run:
```
npm run dev
```
The Vue project runs on localhost:8080 and the Node.js Express API runs on localhost:8000.

### Warranty
Last verified by Joshua Shrestha on 11/8/2019 on Windows 10. 

## Testing
To run the Jest test suite, in the /client directory, run:
```
npm run test
```
## Deployment

To build the client, in the main directory, run:

```
npm run build
```

To build the client and serve concurrently, in the main directory, run :
```
npm run start
```
We are in the process of working with the our client to deploy our application to a GCP server created by our client. Stay tuned. 

## Technologies
* Express App
    * Found in server.js
* Vue.js Frontend
    * Found in /client

## Contributing
In order to contribute, you should ask for access to the Github repository.
We use the Jest Testing Framework for testing, so any additional contributions should include tests.
Here is a link to our project website to learn more about the project: https://teamn.web.unc.edu/

## Authors
* [Benajmin Lu](https://github.com/BenLu910) - Vue Development and Data Analysis
* [Angello Polo](https://github.com/apoloes) - Vue Development
* [Joshua Shrestha](https://github.com/joshrestha7) - Backend Development

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
