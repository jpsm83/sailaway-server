### **" My Recipe Library"**


### Description

A aplication to rent diferent kinds of boats with many choices of size, groups, time and experience.
Advertize your own boat with yours preferences, add prices, available dates, type of experience, photos.
Manage your bookings, reply to reviews, acept or decline bookings.


### MVP
Create, read, update, delete boat advertizes (CRUD).
Book your boat.
Get notifications with Nodemailer.
Recive payments throught Strype.
Add photos throught Cloudinaty.
Find boats with Mapbox.
You have to signin, login and logout to be able to use all the web functionality.


### User Host Stories

- **404** - See a friendly 404 page when the page that doesn’t exist.
- **500** - see a friendly error page when the server is down.
- **homepage** - Be able to access the personal host homepage. 
- **sign up** - Create host account.
- **login** - Acess to personal account and all its features (CRUD for boats & edit account).
- **logout** - Ensure that your personal account session been closed.
- **boat cards** - See in details specifyed boat.
- **boats list** - See the list of boats and filter by my preferences.
- **user data** - View and edit personal data.


### User Client Stories

- **404** - See a friendly 404 page when the page that doesn’t exist.
- **500** - see a friendly error page when the server is down.
- **homepage** - Be able to access the personal client homepage. 
- **sign up** - Create client account.
- **login** - Acess to personal account and all its features (edit account, book boats & add reviews).
- **logout** - Ensure that your personal account session been closed.
- **boat cards** - See in details specifyed boat.
- **boats list** - See the list of boats and filter by my preferences.
- **user data** - View and edit personal data.


### Backlog

- Add Cloudinary functionalities.
- Add Nodemailer functionalities.
- Add Strype functionalities.
- Add Mapbox functionalities.
- Advance filters
- jquery desktop and mobile version
- Optimize CSS


### Client / Frontend

### React Router Routes (React App)
| Path | Page | Permissions | Behavior |
| - | - | - | - |
| `/` | Home Page | public `<Route>` | Home page, Login link, Signup link, filter boats for rent, show nearby options, advertize boat button, choose type of boat |
| `/signup` | Signup Page | anon only `<AnonRoute>` | Signup form, Home link, Login link |
| `/login` | Login Page | anon only `<AnonRoute>` | Login form, Home link, Signup link |
| `/user/:id` | User Home Page | user only `<PrivateRoute>` | Edit user profile link, Logout button, filter boats for rent, show nearby options, advertize boat button, choose type of boat |
| `/user/:id/edit` | User Edit Profile Page | user only `<PrivateRoute>` | Edit user form, Home link, Logout button | 
| `/boats` | Boats page | anon `<AnonRoute>` | Shows all boats available in a list and their location on the map, filter boats for rent, choose type of boat, Login link, Signup link, Logout link, advertize boat button |
| `/boat/create` | Boat Form | user only `<PrivateRoute>` | Create boat form, Home link, Logout button | 
| `/boats/:id` | Boat Detail | anon `<AnonRoute>` | Details of a boat, Reserve button, Review button, Home link, Login link, Signup link, Logout link, advertize boat button |
| `/boat/:id/edit` | Boat Form | user only `<PrivateRoute>` | Edit boat form, Home link, Logout button | 


### Components

- NavBar (Home, Login, Signup, Logout, Profile, Become a host).

- Experience (Private Boat, Share Boat, Party Boat, Fishing experience).

- SearchBar (Search by date, location, guests).

- FilterBar (filter by boat type (Yacht, pontoon, catamaran, sailboat), skypper (with or without) and organize by price or size)

- BoatsList (List of boats from search filtered).

- BoatDetail (Full description, reviews, details and features. Option to reserve it and contact skypper).

- NearbyAdvice (Nearby options base in the comunnit reviews).

- UserForm (User Data, create, read, update, delete).

- BoatForm (Boat Data, create, read, update, delete).

- MyBoats (List of my own advertize boats).

- HistoryBooked (List of my booking history).

- ReviewsForm (Reviews Data, create, read, update, delete).

### Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - isLoggedIn(user)
  - auth.logout()
- Boat Service
  - boat.list()
  - boat.detail(id)
  - boat.edit(id)
  - boat.create(id)
  - boat.delete(id)
- User Service 
  - user.edit(id)
  - user.delete(id)


### Data Structure FrontEnd
```
├── public
|   └── _index.html
├── src
|   └── components
|       └── NavBar.js
|       └── Experience.js
|       └── SearchBar.js
|       └── FilterBar.js
|       └── BoatList.js
|       └── BoatDetail.js
|       └── NearbyAdvice.js
|       └── MyBoats.js
|       └── HistoryBooked.js
|   └── app.css
|   └── app.js
|   └── index.css
|   └── index.js
|   └── reportWebVitals.js
├── gitignore
├── package-lock.json
└── package.json
└── README.md
```

### Server / Backend

### Models

- User model

```javascript
{
  userName: {type: String, required: true},
  email: {type: String,
    unique: true, 
    lowercase: true,
    trim: true,
    required: true,
    match: [/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, 'Please fill a valid email']
  },
  password: {type: String, required: true, minlenght: 5},
  photo: {type: String},
  myBoats: [{
    type: Schema.Types.ObjectId,
    ref: 'Boat'
  }]
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
}
```

- Boat model

```javascript
{
    boatName: { type: String, maxlength: 100, required: true},
    type: { type: Selection, required: true},
    image: { type: String },
    guestMax: { type: Number, required: true },
    guestMin: { type: Number, required: true },
    size: { type: Number, required: true },
    description: { type: String, maxlength: 5000, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    review: {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
}
```

- Review model

```javascript
{
    review: { type: String, maxlength: 5000, required: true},
    stars: { type: Selection, required: true},
    boat: {
      type: Schema.Types.ObjectId,
      ref: 'boat'
    }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
}
```

### API Endpoints (backend routes)

| HTTP Method | URL | Request Body | Success status | Error Status | Description |
| - | - | - | - | - | - |
| GET | `/auth/profile` | Saved session | 200 | 404 | Check if user is logged in and return profile home page |
| POST| `/auth/signup` | {name, email, password}  | 201 | 404 | Checks if fields are not empty (422) and user do not exists (409), then create user with encrypted password, and store user in session |
| POST | `/auth/login` | {username, password} | 200 | 401 | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST | `/auth/logout` | (empty) | 204 | 400 | Logs out the user and clean the session |
| GET | `/api/boats` | (empty) | 200 | 400 | Show all boats |
| GET | `/api/boat/:id` | {id} | 200 | 400 | Show specific boat |
| POST | `/api/create-boat` | {body} | 201 | 400 | Create and save a new boat |
| PUT | `/api/boat/:id` | {id} | 200 | 400 | edit boat |
| DELETE | `/api/boat/:id` | {id} | 201 | 400 | delete boat |
| GET | `/api/user` | {id}| 200 | 400 | Show user |
| PUT | `/api/user/:id/` | {id} | 200 | 400 | edit user |
| DELETE | `/api/user/:id` | {id} | 201 | 400 | delete user |


### Data Structure BackEnd
```
├── bin
|   └── www
├── configs
|   └── cors.config.js
|   └── db.config.js
|   └── middleware.config.js
|   └── session.config.js
├── models
|   └── recipes.model.js
|   └── user.model.js
├── public
|   └── images
|   └── javascript
|   └── stylesheets
├── routes
|   └── recipes.routes.js
├── gitignore
├── app.js
├── package-lock.json
└── package.json
└── Recipes App.postman_collection
```

### link
* [Trello](https://something)


### Git
* [GitHub] Server (https://github.com/jpsm83/sailaway-server)
* [GitHub] Client (https://github.com/jpsm83/sailaway-client)


### Slides
* [Figma](https://something)