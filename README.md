# Worknest

Worknest is a full-stack productivity workspace for quick notes and lightweight Kanban task planning. It is designed for students, personal projects, and admin-heavy workflows where users need to capture information quickly, organise recurring work, and track tasks without the complexity of larger project management tools.

## Project Overview

Worknest combines a notes app with a simple Kanban board system. Users can create workspaces, write and manage notes, pin important information, search through notes, and organise tasks visually through boards and columns.

This project was created as a full-stack web development portfolio project to demonstrate practical skills in frontend development, backend logic, database design, authentication, CRUD operations, and responsive UI design.

## Purpose

The goal of Worknest is to create a lightweight alternative to large productivity platforms by focusing on the features most useful for day-to-day work:

- Fast note-taking
- Workspace-based organisation
- Pinned notes for important information
- Searchable notes
- Simple task tracking
- Kanban boards for project planning
- Reusable templates for repeated workflows

## Features

### Notes

- Create, edit, and delete notes
- Save notes under different workspaces
- Pin important notes
- Search notes by title or content
- Organise notes using tags
- View recently updated notes

### Workspaces

- Create separate workspaces for different areas of life or work
- Example workspaces:
  - School
  - Studio Admin
  - Personal
  - Projects
- Keep notes and boards organised by workspace

### Kanban Boards

- Create task boards
- Add columns such as To Do, Doing, and Done
- Create, edit, and delete task cards
- Move cards between columns
- Add priority levels and due dates
- Use drag-and-drop task management

### Dashboard

- View recent notes
- View pinned notes
- View active tasks
- Quickly create a new note
- Navigate between workspaces, notes, and boards

### Templates

- Create reusable note templates
- Use templates for repeated workflows such as:
  - Meeting notes
  - Client message drafts
  - Project planning
  - Sprint planning
  - Daily notes

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API routes or server actions
- Prisma ORM

### Database

- PostgreSQL

### Authentication

- Clerk, Supabase Auth, or Auth.js

### Drag and Drop

- dnd kit

### Deployment

- Vercel

### Database Hosting

- Supabase or Neon

## Planned Stack

| Area             | Technology                      |
| ---------------- | ------------------------------- |
| Framework        | Next.js                         |
| Language         | TypeScript                      |
| Styling          | Tailwind CSS                    |
| Database         | PostgreSQL                      |
| ORM              | Prisma                          |
| Authentication   | Clerk / Supabase Auth / Auth.js |
| Drag and Drop    | dnd kit                         |
| Deployment       | Vercel                          |
| Database Hosting | Supabase / Neon                 |

## Main Pages

### Dashboard

The dashboard gives users a quick overview of their workspace, including recent notes, pinned notes, and active tasks.

### Notes

The notes page allows users to create, edit, delete, search, and pin notes.

### Boards

The boards page allows users to manage tasks through a Kanban-style workflow.

### Templates

The templates page stores reusable formats for repeated note types and work processes.

### Settings

The settings page allows users to manage account and workspace preferences.

## Database Design

The project uses a relational database structure to manage users, workspaces, notes, boards, columns, cards, and tags.

### Main Models

```txt
User
- id
- name
- email
- createdAt

Workspace
- id
- userId
- name
- icon
- createdAt

Note
- id
- workspaceId
- title
- content
- isPinned
- isArchived
- createdAt
- updatedAt

Board
- id
- workspaceId
- name
- createdAt
- updatedAt

BoardColumn
- id
- boardId
- name
- position

TaskCard
- id
- columnId
- title
- description
- priority
- dueDate
- position
- createdAt
- updatedAt

Tag
- id
- workspaceId
- name
- colour
```
