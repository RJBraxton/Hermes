# Hermes
*Documentation in progress*

## Background
Hermes is a blogging platform built from the ground up. It seemed like a great way to combine all of my web-development abilities, as well as brush up on a few that I hadn't utilized recently. Once completed, I'll be converting my personal website over to the platform.

## What does Hermes use?

Hermes primarily uses AngularJS for client-side code, and PHP for server-side code. Blog-specific information is stored within several tables in a MySQL database.

While it would be possible to throw together several large, do-it-all frameworks, that would only create spaghetti code and future confusion. Any and all third-party plugins were chosen for very specific reasons.

All plugins are managed through Grunt.js, which also keeps dependencies in line.

## Current State
At this moment, Hermes has a backend with basic functionality - creating, editing, and deleting posts, pages, and users. The next step is to take this information and display it in an intuitive fashion.

User information is kept secure by hashing all passwords with a unique, rnadomly generated salt.

All information is stored in a series of MySQL tables for posts, users, and edit history.

More detail will be provided once a larger and more comprehensive structure has been completed.

## Plugins used
*Upcoming*