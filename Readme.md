# G-Scores Web Application

This project is developed as part of the web developer intern assignment at [Golden Owl](https://goldenowl.asia).

## Overview

The G-Scores web application allows users to check the scores of students based on their registration number and view statistical reports based on their performance. The application processes raw student data, stores it in a database, and provides various features such as score checking, report generation, and more.

The project is structured into frontend and backend components with a focus on clear code, clean design, and responsive functionality.

## Features

### Must-Have Features:
1. **Data Conversion and Storage**: 
   - Convert the raw data file [diem_thi_thpt_2024.csv](./dataset/diem_thi_thpt_2024.csv) into a structured database format using migration and seeder scripts.
   
2. **Score Check**:
   - Feature to check scores by entering the registration number.
   
3. **Report Generation**:
   - Generate a report with 4 score levels: 
     - >= 8 points
     - 8 > points >= 6
     - 6 > points >= 4
     - < 4 points
   - Provide statistics (chart) on the number of students per score level for each subject.
   
4. **Top 10 Students**:
   - List the top 10 students from group A based on subjects: Math, Physics, and Chemistry.

## Technologies Used

### Frontend:
- HTML/CSS
- Tailwind CSS or AdminLTE template for UI

### Backend:
- Chosen Framework: Nodejs/TypeScript
- OOP-based architecture for managing subjects.
- ORM for database interaction (e.g., Sequelize, TypeORM).
- Form validation and tight logic handling.

### Database:
- MongoDB

## Setup & Installation

### Prerequisites:
- Node.js (if using Node.js backend)
- Docker (optional)
- A database like PostgreSQL, MySQL, or MongoDB
- TypeScript and `ts-node` for seeding

### Running the Project Locally:

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/g-scores.git

2 Navigate to the project directory:

    ```bash 
    cd g-scores

3 Install dependencies:

    ```bash 
    npm install

4 Set up the database:

    ```bash 
    npm run seed

5 Start the application:

    ```bash 
    npm npm start
