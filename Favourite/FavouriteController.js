const favSchema = require('./FavouriteSchema');

const addUserFavouriteBooks = async (req, res) => {
  try {
    const { userId, userType, bookId, action } = req.body;

    if (!userId || !bookId || !userType) {
      return res.status(400).json({ message: "User ID, User Type, and Book ID are required." });
    }
    let userFavorites = await favSchema.findOne({ userId, userType });

    if (!userFavorites) {
      userFavorites = new favSchema({
        userId,
        userType,
        bookIds: [],
      });
    }

    if (action === "add") {
      if (!userFavorites.bookIds.includes(bookId)) {
        userFavorites.bookIds.push(bookId);
      }
    } else if (action === "remove") {
      userFavorites.bookIds = userFavorites.bookIds.filter(id => id.toString() !== bookId);
    } else {
      return res.status(400).json({ message: "Invalid action. Use 'add' or 'remove'." });
    }
    await userFavorites.save();

    return res.status(200).json({
      message: "Favorite books updated successfully.",
      favouriteBooks: userFavorites.bookIds,
    });

  } catch (error) {
    console.error("Error updating favorite books:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getUserFavouriteBooks = async (req, res) => {
  try {
    const { userId, userType } = req.body;

    if (!userId || !userType) {
      return res.status(400).json({ message: "User ID and User Type are required." });
    }

    const userFavorites = await favSchema
      .findOne({ userId, userType })
      .populate("bookIds"); 
    if (!userFavorites) {
      return res.status(200).json({ message: "No favorite books found.", favouriteBooks: [] });
    }

    return res.status(200).json({
      message: "User favorite books retrieved successfully.",
      favouriteBooks: userFavorites.bookIds, // Returns full book objects
    });

  } catch (error) {
    console.error("Error fetching favorite books:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


module.exports = { addUserFavouriteBooks,getUserFavouriteBooks };
