# Zara Challenge - Marvel

### Aplicación de Personajes de Marvel

This project was done with great enthusiasm to showcase my knowledge up to date.
Below, the project structure, prerequisites, and the commands to execute it are detailed.

## Prerequisites

- Node.js >= 18
- In Visual Studio Code or your preferred editor, install the Playwright extension.

## Project structure.

The project follows a clear organizational structure, with the following folders and files:

- ***src***: Source code main folder.

  - ***assets***: Contains images and icons.
  - ***contexts***: Contains React contexts for application functionalities.
  - ***hooks***: Contains React hooks for application functionalities.
  - ***modules***: Contains application modules following the hexagonal architecture pattern.

    - ***characters***: Characters module.

      - ***application***: Contains application logic related to characters.
      - ***domain***: Contains entities and repositories related to characters.
      - ***service***: Contains services related to characters.

    - ***comics***: Comics module.

      - ***application***: Contains application logic related to comics.
      - ***domain***: Contains entities and repositories related to comics.
      - ***service***: Contains services related to comics.

  - ***test***: Contains configuration files and utilities for tests.
  - ***types***: Contains type definition files.
  - ***utils***: Contains reusable functions and utilities.
  - ***views***: Contains components, layouts, and pages of the application.

    - ***components***: Contains reusable components.
    - ***layouts***: Contains larger layouts that encapsulate other components.
    - ***pages***: Contains page-level components.

    ## How to Run the Project Locally

##### 1. Clone the GitHub repository.

```
   git clone https://github.com/orlandos20/marvel-btw-tst
```

##### 2. Install dependencies:

```
   yarn install
```

or

```
   npm install
```

##### 3. Run the project locally:

```
   yarn dev
```

or

```
   npm run dev
```

### Testing.

- Run unit tests.

```
   yarn test
```

- Run integration tests using Playwright.

```
   yarn playwright test
```

- Run integration tests using ui mode.

```
   yarn playwright test --headed --project=chromium
```

## Conclusion

**Note:** First of all, excited and grateful for the opportunity to participate in the selection process.
**_For any contact information, you can find me at my [linkedIn profile](https://www.linkedin.com/in/jimenezorlando/)_**
