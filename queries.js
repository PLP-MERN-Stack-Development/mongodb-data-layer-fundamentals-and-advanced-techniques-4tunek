const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/plp_bookstore';
const dbName = 'plp_bookstore';
const collectionName = 'books';


//  Basic CRUD Operations
async function myQueries(){
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const books = db.collection(collectionName);

//     // // Find all books in a specific genre
    const dystopianBooks = await books.find({ genre: 'Fiction' }).toArray();
    console.log("All Dystopian Books: ", dystopianBooks);

//     // Find books published after a certain year
const recentBooks = await books.find({ published_year: { $gt: 1950 } }).toArray();
    console.log('Books published after 1950:');

//     // Find books by a specific author
    const authorBooks = await books.find({ author: 'Paulo Coelho' }).toArray();
    console.log("Books by Paulo Coelho: ", authorBooks);

    // Update the price of a specific book
      const updateBook = await books.updateOne(
      { title: 'The Catcher in the Rye' },
      { $set: { price: 17.99 } }
    );
    console.log('The Catcher in the Rye was updated')

    // Delete a book by its title
    const deleteBook = await books.deleteOne(
      { title:'To Kill a Mockingbird'}
    );
    console.log('To Kill a Mockingbird was deleted')

    // Advanced Queries

    // Find books that are both in stock and published after 2010
    const bookStock = await books.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }).toArray();
    console.log("Books in stock and published after 2010: ", bookStock);

    // Use projection to return only the title, author, and price fields in your queries
    const bookProjection = await books.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    },

    { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray();

    // Implement sorting to display books by price (both ascending and descending)
    const sortedBooksAsc = await books.find().sort({ price: 1 }).toArray();
    console.log("Books sorted by price (ascending): ", sortedBooksAsc);

    const sortedBooksDesc = await books.find().sort({ price: -1 }).toArray();
    console.log("Books sorted by price (descending): ", sortedBooksDesc);

    // Use the `limit` and `skip` methods to implement pagination (5 books per page)
    const page = 1; 
    const booksPerPage = 5;
    const paginatedBooks = await books.find()
      .skip((page - 1) * booksPerPage)
      .limit(booksPerPage)
      .toArray();
    console.log(`Books on page ${page}: `, paginatedBooks);

    // Aggregation Pipeline

    // Create an aggregation pipeline to calculate the average price of books by genre
    const avgPriceByGenre = await books.aggregate([
      { $group: { _id: '$genre', averagePrice: { $avg: '$price' } } }
    ]).toArray();
    console.log("Average price of books by genre: ", avgPriceByGenre);

    // Create an aggregation pipeline to find the author with the most books in the collection
    const authorWithMostBooks = await books.aggregate([
      { $group: { _id: '$author', bookCount: { $sum: 1 } } },
      { $sort: { bookCount: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log("Author with the most books: ", authorWithMostBooks);

    // Implement a pipeline that groups books by publication decade and counts them
    const booksByDecade = await books.aggregate([
      {
        $group: {
          _id: {
            $subtract: [
              { $divide: ['$published_year', 10] },
              { $mod: ['$published_year', 10] }
            ]
          },
          bookCount: { $sum: 1 }
        }
      }
    ]).toArray();
    console.log("Books by publication decade: ", booksByDecade);

    // Indexing

    // Create an index on the `title` field for faster searches
    await books.createIndex({ title: 1 });
    console.log("Index on title field created");

    // Create a compound index on `author` and `published_year`
    await books.createIndex({ author: 1, published_year: 1 });
    console.log("Compound index on author and published_year created");

    // Use the `explain()` method to demonstrate the performance improvement with your indexes
    const explainResult = await books.find({ title: '1984' }).explain();
    console.log("Explain plan for finding '1984': ", explainResult);
  }
  
  catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

myQueries().catch(console.error);