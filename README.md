# Hermes
*Documentation in progress*

## Background
Hermes is a blogging platform built from the ground up. It seemed like a great way to combine all of my web-development abilities, as well as brush up on a few that I hadn't utilized recently. Once completed, I'll be converting my personal website over to the platform.

## Current State
At this moment, Hermes has a backend with basic functionality - creating, editing, and deleting posts, pages, and users. The next step is to take this information and display it in an intuitive fashion.

User information is kept secure by hashing all passwords with a unique, rnadomly generated salt.

All information is stored in a series of MySQL tables for posts, users, and edit history.

More detail will be provided once a larger and more comprehensive structure has been completed.

## Plugins used
*Upcoming*

# Working documentation

## What will it run on?
*	AngularJS/ng-boilerplate frontend
*	MySQL + PHP backend
*	We will need an installer at the end. How??? Who???
    *	PHP can run “CREATE TABLE”. Think about this.

## What are our main goals?
*	SEO capability
    *   Google analytics tracking is done via $onRouteChange
*	Ability to add and edit data and templates from browser
    *	Store HTML and CSS in a table. May require some PHP magic.
*	Users. Log in, out, deletion, and admin rights.
*	Ability to upload images and use them in posts/pages.
*	Blogging capabilities.
*	Ability to add plugins?
    *	Something like the Wordpress system could be nice. The goal would be to make a modular plugin system.
    *	This could get nasty. Brainstorming below:
        *	Have directives for these. They sound like they don’t even need their own controllers?
        *	This can be put off. Still not exactly sure how this would even be executed.

## Requirements

### > Page & Post requirements
*	Pages
    *	Have some kind of tiering for pages and the navbar, which will dropdown if pages have any ‘children’.
    *	The logic for this needs to be laid out.
*	Posts
	*	In-browser text editor
            *	http://textangular.com/
    *	Storing entries in MySQL (Prepared statements for DB security)
    *	Safely render and display HTML + images.
    *	Image clickthrough options? Will have to use some fancy class magic. 

### > MySQL requirements
*	Tables
    *	Posts
        *	postId
        *	title
        *	body
        *	summary
        *	author
        *	postdate
        *	lastEditDate
        *	lastEditUser
        *	category
    *	Pages
        *	pageId
        *	pagetitle
        *	pageBody
        *	pageAuthor
        *	pageDate
        *	lastEditDate
    * Page Edits
        *   editId
        *   editTime
        *   editBody
        *   pageId
        *   authorId
    *   Post Edits
        *   editId
        *   editTime
        *   editBody
        *   postId
        *   authorId
    *	Images/files
    *	Templates
    *	Users
        *	id
        *	Username
        *	Password (hash)
        *	salt
        *	email
        *	isAdmin
        *	signupDate
        *	lastLogin
*	Views
    *	Two views for posts
        *	One will have just summary details, one everything. Both will have usernames rather than IDs.

### > Angular requirements
*	Views
    *	Navs
        *   Main Nav
        *	Admin Nav (for backend)
    *	Home
    *	Posts
    *	Pages
    *	Admin (backend)
        *	Overview (google analytics, what else?)
        *	Posts
            *	Edit individual post
        *	Pages
            *	Edit individual page
        *	Users
*	Controllers
    *	One controller for the whole website (Manage navbar, etc) Within that:
        *	One for all of the aforementioned views
        *	Except
            *	Navs, those inherit the ‘master’ scope
*	Factories
    * dbConnect manages db connections. It sends all requests to dbConnect.php
*	Directives
    *	Plugins could go here!

### > Permissions
*	Secrets folder NEEDS 770.

### > Files that need to be modified for a fresh install
*	App/app.js (Site name, details, global stuff)
*	Secrets/* (MySQL passwords, JWT key, etc)

## Todo

### > Main Todo:
*	Scratch a few things off the misc list.
*	A profile page!
*	Navbar and pages…

### > Misc. todo:
*	When going between pages, the navbar flickers.
    *	The collapse function on the enclosing div is to blame. What do we do about this???
*	Is Satellizer even needed?
    *	It provides ‘linking’. What is this??
*	Some kind of generalized error handling for all of our database communications. Something that can display an error on the screen if needed.
*	Pagination! Implement LIMIT into the SQL queries
*	In the PHP file, ‘summaries’ need to be taken care of.
*	Category support. (posts)
*	Summary support (posts)
*	Sorting/ordering on posts page.
*	Work on a unified color scheme/plan for buttons.
*	Custom angular filter for showing summaries and titles. If greater than a certain amount of characters, substr and add “…”
*   Note - MAMP is set to Berlin time. We should consider switching to GMT, or just go with the server's time zone.
*	Tiering for pages? childOf, etc
*	Dynamic titles on blog posts
*   Hidden/Draft pages and posts.

### > Thoughts for the future
*	Pages
    *	Somehow we need something in the back end that determines what pages go where and in the nav. Probably a whole new view for this.
        *	A ‘settings’ view where we can put this and maybe template stuff in the future?
        *	I’m going to put this off for the moment. I think this can be done, but it would just require using some PHP to generate the code, so it’s going to be put aside until we have reached that point.
