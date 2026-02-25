import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const creatorId = "105e2c5f-d2f9-40b2-a85b-8b163617b801";
const movies = [
  {
    title: "Inception",
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseYear: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    runtime: 148,
    posterUrl: "https://m.media-amazon.com/images/I/51s+qjv9ZlL._AC_SY679_.jpg",
    createdBy: creatorId,
  },
  {
    title: "The Matrix",
    overview:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    releaseYear: 1999,
    genre: ["Action", "Sci-Fi"],
    runtime: 136,
    posterUrl: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg",
    createdBy: creatorId,
  },
  {
    title: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseYear: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    runtime: 169,
    posterUrl: "https://m.media-amazon.com/images/I/71n58lQyZL._AC_SY679_.jpg",
    createdBy: creatorId,
  },
];

async function main() {
  for (const movie of movies) {
    await prisma.movie.create({
      data: {
        ...movie,
      },
    });
  }
}

main()
  .then(() => {
    console.log("Seed data inserted successfully.");
  })
  .catch((error) => {
    console.error("Error inserting seed data:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
