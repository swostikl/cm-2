# React Jobs Project

```javascript
    jobSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
    });

```

## Explanation of above code
- Configure the schema's JSON output
- jobSchema.set'toJSON',      Tells Mongoose to use this config when converting docs to JSON
- virtuals: true,           Includes virtual properties (schema.virtual(...)) in the JSON output
- transform: (doc, ret) =>    Provides a transform function that runs after conversion
- ret.id = ret._id;          Creates a new property "id" and set it to the original MongoDB _id
- delete ret._id;            Removes the original "_id" field from the JSON (cleaner output)
- delete ret.__v;            Removes the "__v" version key (Mongoose internal)    
- return ret;                Returns the modified object which will be sent to the client
  













## Usage

 
### Mock Server

1. Open a terminal in the `backend/api-fake-server` directory

2. Install Dependencies

```bash
npm install
```

3. Start the JSON-Server

```bash
npm run dev
```

4. The server will run on http://localhost:8000

### Frontend-simplified and/or Frontend

1. Open another terminal in the `frontend` directory (or `frontend-simplified`)

2. Install Dependencies 

```bash
npm install
```

3. Start the App

```bash
npm run dev
```

React will run on http://localhost:3000


### Api Server

1. Open another terminal in the `backend/api-server-starter` directory

2. Install Dependencies

```bash
npm install
```

3. Start the Server

```bash
npm run dev
```

4. The server will run on http://localhost:4000

---
## Other

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### About 
This is the jobs listing project based on the [YouTube crash course](https://youtu.be/LDB4uaJ87e0).

<img src="./frontend/public/screen.png" />