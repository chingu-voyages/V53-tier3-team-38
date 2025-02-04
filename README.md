# Voyage-53 Project

**Voyage-Project-Tier3-Menu-Scheduler**

This project focuses on developing a menu scheduling application that allows managers to create and share weekly menus for staff workers. The application ensures employees have clear visibility of the planned meals while addressing specific dietary restrictions and allergies.

## Key Features

- **Authentication**: Secure user authentication via Google or GitHub OAuth.
- **Allergy Management**: Managers can input, save, and manage workers' allergies, and the application will automatically filter out dishes containing allergens.
- **Week Scheduling**: Provides managers with the ability to schedule menus for a specific week using various methods like date picker and manual input.
- **Dish Management**: Enables managers to assign unique dishes for each day of the week, regenerate menus, and mark specific weekdays as "Day Off".
- **Validation and Error Handling**: Ensures menus are created only for the current or future weeks, prevents duplicate dish assignments, and provides clear error messages.
- **User Interface and Experience**: Presents the weekly menu in an intuitive format and ensures the application is fully responsive.
- **Data Export**: Allows managers to download or export the finalized weekly menu as a PDF or Excel file.

## Benefits

This application simplifies menu planning and ensures inclusivity for all employees by addressing dietary restrictions and allergies. It provides a user-friendly interface for managing tasks, tracking progress, and collaborating with team members.

## CI/CD Pipeline

This project uses a CI/CD pipeline for automated builds, code quality checks, and deployments. The pipeline is configured with GitHub Actions and deploys to Netlify.

### Pipeline Steps

1. **Build**: Compiles the application.
2. **Deploy**: Deploys the application to Netlify.

### Tools and Technologies

- **Vite**: Used to create the initial React project
- **React**: Frontend
- **Supabase**: Backend
- **TypeScript**: Primary Programming Language
- **Netlify**: Deployment server
- **GitHub Actions**: Used for CI/CD automation
- **ESLint**: Used for linting and code quality
- **Prettier**: Used for code formatting

### Triggering the Pipeline

The pipeline is automatically triggered on each push to the main branch after checks are conducted.

## Team Documents

- [Team Project Ideas](./docs/team_project_ideas.md)
- [Team Decision Log](./docs/team_decision_log.md)

## Our Team

- Teammate name #1: Nathan Syfrig (digable1) [GitHub](https://github.com/digable1) / [LinkedIn](https://www.linkedin.com/in/nathansyfrig/)
- Teammate name #2: Robert Gordon (bobbygrdn)[GitHub](https://github.com/bobbygrdn) / [LinkedIn](https://linkedin.com/in/bobbygrdn)
- Teammate name #3: Dev Govindji (d0uble0deven) [GitHub](https://github.com/d0uble0deven) / [LinkedIn](https://www.linkedin.com/in/devgovindji/)
- Teammate name #4: Louis Choi (louis-code)[GitHub](https://github.com/chef-louis)
