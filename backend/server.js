import app from "./src/app.js";

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);
});