const fs = require("fs");

const fileDB = "koders.json";

const createDbFile = (file) => {
    fs.writeFileSync(file, "[]", "utf-8");
};

const ensureDbFileExists = () => {
    if (!fs.existsSync(fileDB)) {
        createDbFile(fileDB);
    }
};

const readDbFileContent = () => {
    return JSON.parse(fs.readFileSync(fileDB, "utf-8"));
};

const writeDbFileContent = (data) => {
    fs.writeFileSync(fileDB, JSON.stringify(data), "utf-8");
};

const createKoder = (koder) => {
    ensureDbFileExists();
    const contentJson = readDbFileContent();
    contentJson.push({ name: koder });
    writeDbFileContent(contentJson);
};

const listAllKoders = () => {
    ensureDbFileExists();
    const contentJson = readDbFileContent();
    contentJson.forEach(koder => {
        console.log(koder);
    });
};

const deleteKoder = (koderName) => {
    ensureDbFileExists();
    const contentJson = readDbFileContent();
    const updatedKoders = contentJson.filter(koder => koder.name !== koderName);
    if (updatedKoders.length === contentJson.length) {
        console.log(`No se ha encontrado el nombre ${koderName}, por lo cual no se ha podido borrar`);
        process.exit(1);
    }
    writeDbFileContent(updatedKoders);
};

const command = process.argv[2];
const value = process.argv[3];

switch (command) {
    case "add":
        (!value) && console.log("Es necesario ingresar el nombre del Koder") && process.exit(1);
        createKoder(value);
        break;
    case "ls":
        listAllKoders();
        break;
    case "rm":
        (!value) && console.log("Es necesario ingresar el nombre del Koder") && process.exit(1);
        deleteKoder(value);
        break;
    case "reset":
        createDbFile(fileDB);
        break;
    default:
        console.log("Es necesario agregar algún argumento");
        process.exit(1);
        break;
}
