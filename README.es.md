# Zara Challenge - Marvel

### Aplicación de Personajes de Marvel

Este proyecto fue hecho con mucho entusiasmo por demostrar mi conocimiento hasta la fecha.
A continuación, se detalla la estructura del proyecto, los pre-requesitos y los comandos a ejecutar en el mismo.

## Prerequisitos

- Node.js >= 18
- En visual studio code o tu editor de preferencia, intalar la extensión Playwright.

## Estructura del Proyecto

El proyecto sigue una estructura organizativa clara, con las siguientes carpetas y archivos:

- \***\*src\*\***: Carpeta principal del código fuente.

  - \***\*assets\*\***: Contiene imágenes e iconos.
  - \***\*contexts\*\***: Contiene los contextos de React para las funcionalidades de la aplicación.
  - \***\*hooks\*\***: Contiene los hooks de React para las funcionalidades de la aplicación.
  - \***\*modules\*\***: Contiene los módulos de la aplicación siguiendo el patrón de arquitectura hexagonal.

    - \***\*characters\*\***: Módulo de personajes.

      - \***\*application\*\***: Contiene la lógica de aplicación relacionada con los personajes.
      - \***\*domain\*\***: Contiene las entidades y los repositorios relacionados con los personajes.
      - \***\*service\*\***: Contiene los servicios relacionados con los personajes.

    - \***\*comics\*\***: Módulo de cómics.

      - \***\*application\*\***: Contiene la lógica de aplicación relacionada con los cómics.
      - \***\*domain\*\***: Contiene las entidades y los repositorios relacionados con los cómics.
      - \***\*service\*\***: Contiene los servicios relacionados con los cómics.

  - \***\*test\*\***: Contiene los archivos de configuración y utilidades para las pruebas unitarias.
  - \***\*types\*\***: Contiene archivos de definición de tipos.
  - \***\*utils\*\***: Contiene funciones reutilizables y utilidades.
  - \***\*views\*\***: Contiene los componentes, diseños y páginas de la aplicación.

    - \***\*components\*\***: Contiene componentes reutilizables.
    - \***\*layouts\*\***: Contiene diseños más grandes que engloban otros componentes.
    - \***\*pages\*\***: Contiene componentes a nivel de página.

    ## Cómo ejecutar el proyecto localmente.

##### 1. Clonar el repositorio de github.

This is `inline code`. This is a <^>variable<^>. This is an `in-line code <^>variable<^>`.

```bash
[label bash]
   git clone https://github.com/orlandos20/marvel-btw-tst
```

##### 2. Instalar las dependencias.

```bash
[label bash]
   yarn install
```

o

```bash
[label bash]
   npm install
```

##### 3. Ejecutar el proyecto localmente.

```bash
[label bash]
   yarn dev
```

o

```bash
[label bash]
   npm run dev
```

### Testing.

Para ejecutar las pruebas unitarias.

```bash
[label bash]
   yarn test
```

Para ejecutar las pruebas End to End.

```bash
[label bash]
   yarn playwright test
```

Para ejecutar las pruebas End to End en modo ui

```bash
[label bash]
   yarn playwright test --headed --project=chromium
```

https://www.linkedin.com/in/jimenezorlando/

## Conclusión

<$>[note]
**Note:** Ante todo entusiasmado y agradecido por la oportunidad de participar en el proceso de selección.
<$>
**_Para cualquier información de contacto, puedes encontrarme en mi [perfil de linkedIn](https://www.linkedin.com/in/jimenezorlando/)_**
