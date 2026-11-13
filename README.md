# Task Manager

A simple to-do website where you can add your daily tasks, set a priority, mark them as done and delete them. The tasks are saved in the browser using localStorage, so they do not disappear when the page is refreshed.

This is my CA project for **CSE326 - Internet Programming**.

## Features

- Add a new task with a priority (low, medium, high)
- Mark a task as done
- Delete a task
- Filter tasks by all, done or pending
- Shows how many tasks are pending
- Tasks stay saved after closing the browser (localStorage)

## Technologies Used

- HTML - for the structure of the page
- CSS - for the design and colors
- JavaScript - for adding, deleting and showing tasks
- localStorage - for saving the tasks in the browser

## Project Structure

```
task-manager/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run

1. Download or clone this repository
2. Open the folder
3. Double click on `index.html` to open it in the browser

No installation is needed.

## How It Works

- Every task is stored as an object, like `{ text: "Study JS", priority: "high", done: false }`
- All the tasks are kept in an array
- When a task is added, deleted or marked done, the array is saved in localStorage using `JSON.stringify`
- When the page opens, the tasks are read back using `JSON.parse`

## What I Learned

- How to use the DOM to change the page with JavaScript
- How to use events like click and submit
- How to store data in localStorage
- How to use git and GitHub for my project

## Made By

[Your Name]
[Your Registration Number]
B.Tech CSE, Lovely Professional University
