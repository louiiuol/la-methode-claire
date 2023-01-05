# La Méthode Claire 👓

> A simple yet neat and effective reading methodology for school teachers. This project allows:
>
> - Public to discover the project, and sign up
> - Logged in user to follow their progress and more ..
> - Administrators to manage content and users.

## Features 🎉

1. User Authentication
2. Library
3. Content Administration
4. User's progression
5. Subscription & payment

## Get started 💪

> After cloning project locally you can run the followings commands in the root folder in order to launch the app locally

``` bash
npm i # Install workspace dependency
npm run serve:apps # Launch API and ng applications (user-board & admin-board)
npm run serve:public:ui # Launch distinct Nextjs Public application
```

After running these commands, you can access locally these applications:

| Application | URL | Description |
|:------------|:----|:------------|
| Public UI   | htttp://localhost:8080 | Public landing page |
| User Space   | htttp://localhost:4200 | UI dedidacted to logged in users |
| Admin Space   | htttp://localhost:4201 | UI dedidacted to Administrator |

### NX commands 🕹️

> Handy commands to help you run, generate, build, test and more from root workspace.

|        Name            |             Command         | Description  |
|:----------------------|:----------------------------| :------------|
| Launch dev server     | `nx serve APP_NAME`         | - |
| Test the app          | `nx test APP_NAME`          | Not functional yet ! |
| Build the app         | `nx build APP_NAME`          | Not functional yet ! |
| See apps deps         | `nx graph`          | Diagram of the dependencies of the projects |
| Remote caching          | `npx nx connect-to-nx-cloud`          | - |

## Wiki 🙏

> This project have it's own wiki available [here](https://github.com/louiiuol/la-methode-claire/wiki). It explains how this project was made and what is next on the development scope.

## Contact ✉️

Feel free to contact `dev@vidmizer.com` if you have any suggestions or wish to learn more about certain aspects of this project.
