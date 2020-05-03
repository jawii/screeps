var https = require("https");
fs = require("fs").promises;
const dotenv = require("dotenv");
dotenv.config();

const branch = "default";
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

const data = {
  branch: branch,
  modules: {},
  /*
  modules: {
    main: 'require("hello");',
    hello: 'console.log("Hello World!");',
  },
  */
};

const readModules = async () => {
  let filenames = await fs.readdir("./modules/" + branch);
  console.log("Files: " + filenames);

  for (let filename of filenames) {
    let filedata = await fs.readFile(
      "./modules/" + branch + "/" + filename,
      "utf8"
    );

    let fileNameWithoutExtension = filename.split(".").slice(0, -1).join(".");
    data.modules[fileNameWithoutExtension] = filedata;
  }
};

readModules().then(() => {
  var req = https.request({
    hostname: "screeps.com",
    port: 443,
    path: "/api/user/code",
    method: "POST",
    auth: email + ":" + password,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  req.write(JSON.stringify(data));
  req.end();
});
