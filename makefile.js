const fs = require("fs");
const path = require("path");

fs.readdir("./img", (err, files) => {
  const images = files.filter((f) => {
    const r = path.parse(f);

    return !!r.ext;
  });

  const contents = {
    list: images,
  };

  fs.writeFile("./src/assets/members.json", JSON.stringify(contents), () => {
    console.log("make file success");
  });
});
