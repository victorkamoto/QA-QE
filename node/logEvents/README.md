# logEvents

Install dependencies:

```bash
pnpm install
```

Run:

```bash
pnpm start
```

## Problem

Create two pages , LogEvents.js and index.js files in your folder.
Create a new package.json file using **npm init**

Install three packages, **nodemon, uuid** and **date-fns**

Date-fns is just used for format const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`

nodemon is used to automate node to run automatically without need to cancel the terminal and re-runing the app again.
make sure you connfigure your scripts for nodemon

In LogEvents, import the uuid and date-fns packages and just create a function called **LogEvents**

Make sure LogEvents is an **async function** so you can be able to use **Promises.**

Inside LogEvents, hey👌👌👌 just a simple thing, print a new **uuid** and **new date** and a message in one variable called **logItem**

Take the logItem and append it to a new file **eventLogs.txt** that is contained inside **Logs folder**

**PLEASE DONT CREATE THE FOLDER MANUALLY, CREATE IT USING NODE AND PROMISES, REALLY EASY**

//first we check if a folder doesnt exist hence we create it
//then we create a file to the folder
//then we appendData to it, so appendFile will automatically create
//and append data to a file if didnt exist

---

Next steps

Go to **Index.js** file and **import the LogEvent function** exported from LogEvents.js and use it isnide a new **EventEmitter**

**then** use your EventEmmiter to emit a your event with a message **new log event emmited. This should be wrapped iside a setTimeOut function of 2000 ms.**

**remember** the message is what was passed **as a parameter** from the function LogEvent function

USE THIS WAY TO CREATE A FILE AND CHECK IF IT EXISTS OR NOT

```javascript
const fs = require("node:fs");

const folderName = "/Users/joe/test";

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}
```
