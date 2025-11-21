const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// data untuk movies
let movies = [
  { id: 1, title: "Parasite", director: "Bong Joon-ho", year: 2019 },
  {
    id: 2,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: 2008,
  },
  { id: 3, title: "Spirited Away", director: "Hayao Miyazaki", year: 2001 },
  { id: 4, title: "Inception", director: "Christopher Nolan", year: 2010 },
  { id: 5, title: "Interstellar", director: "Christopher Nolan", year: 2014 },
  { id: 6, title: "The Matrix", director: "Lana Wachowski", year: 1999 },
];
// data untuk directors
let directors = [
  { id: 1, name: "Asep Laku Keras", birthYear: 2000 },
  { id: 2, name: "Agus Lapar", birthYear: 2004 },
  { id: 3, name: "Owok", birthYear: 2001 },
  { id: 4, name: "Kevin Pelatihan Militer ", birthYear: 2002 },
  { id: 5, name: "Sugeng Keseimbangan", birthYear: 2003 },
  { id: 6, name: "Subianto", birthYear: 2006 },
];

// get untuk movies
app.get("/", (req, res) => {
  res.send(movies);
});

app.listen(PORT, () => {
  console.log(`Server aktif di http://localhost:${PORT}`);
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find((m) => m.id === movieId);
  if (!movie) {
    return res.status(404).json({ message: "film tidak ditemukan" });
  }
  res.json(movie);
});

// get untuk directors
app.get("/api/directors", (req, res) => {
  res.send(directors);
});

app.get("/directors", (req, res) => {
  res.json(directors);
});

app.get("/directors/:id", (req, res) => {
  const directorId = parseInt(req.params.id);
  const director = directors.find((d) => d.id === directorId);
  if (!director) {
    return res.status(404).json({ message: "Penulis tidak ditemukan" });
  }
  res.json(director);
});

// post untuk movies
app.post("/movies", (req, res) => {
  const { title, director, year } = req.body;
  if (!title || !director || !year) {
    return res
      .status(400)
      .json({ message: "Semua field (title, director, year) harus diisi" });
  }
  const newId = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;
  const newMovie = { id: newId, title, director, year };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// post untuk directors
app.post("/directors", (req, res) => {
  const { name, birthYear } = req.body;
  if (!name || !birthYear) {
    return res
      .status(400)
      .json({ message: "Semua field (name, birthYear) harus diisi" });
  }
  const newId =
    directors.length > 0 ? directors[directors.length - 1].id + 1 : 1;
  const newDirector = { id: newId, name, birthYear };
  directors.push(newDirector);
  res.status(201).json(newDirector);
});

// put untuk movies
app.put("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movieIndex = movies.findIndex((m) => m.id === movieId);
  if (movieIndex === -1) {
    return res.status(404).json({ message: "Film tidak ditemukan" });
  }
  const { title, director, year } = req.body;
  if (!title || !director || !year) {
    return res.status(400).json({
      message:
        "Semua field (title, director, year) harus diisi untuk pembaruan",
    });
  }
  const updatedMovie = { id: movieId, title, director, year };
  movies[movieIndex] = updatedMovie;
  res.status(200).json(updatedMovie);
});

// put untuk directors
app.put("/directors/:id", (req, res) => {
  const directorId = parseInt(req.params.id);
  const directorIndex = directors.findIndex((d) => d.id === directorId);
  if (directorIndex === -1) {
    return res.status(404).json({ message: "Penulis tidak ditemukan" });
  }
  const { name, birthYear } = req.body;
  if (!name || !birthYear) {
    return res.status(400).json({
      message: "Semua field (name, birthYear) harus diisi untuk pembaruan",
    });
  }
  const updatedDirector = { id: directorId, name, birthYear };
  directors[directorIndex] = updatedDirector;
  res.status(200).json(updatedDirector);
});

// delete untuk movies
app.delete("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movieIndex = movies.findIndex((m) => m.id === movieId);
  if (movieIndex === -1) {
    return res.status(404).json({ message: "Film tidak ditemukan" });
  }
  movies.splice(movieIndex, 1);
  res.status(204).send();
});

// delete untuk directors
app.delete("/directors/:id", (req, res) => {
  const directorId = parseInt(req.params.id);
  const directorIndex = directors.findIndex((d) => d.id === directorId);
  if (directorIndex === -1) {
    return res.status(404).json({ message: "Penulis tidak ditemukan" });
  }
  directors.splice(directorIndex, 1);
  res.status(204).send();
});
