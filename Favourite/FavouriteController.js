const favSchema = require("./FavouriteSchema");

const addUserFavouriteBooks = async (req, res) => {
  try {
    const { userId, userType, bookId, action } = req.body;

    if (!userId || !bookId || !userType) {
      return res
        .status(400)
        .json({ message: "User ID, User Type, and Book ID are required." });
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
      userFavorites.bookIds = userFavorites.bookIds.filter(
        (id) => id.toString() !== bookId
      );
    } else {
      return res
        .status(400)
        .json({ message: "Invalid action. Use 'add' or 'remove'." });
    }
    await userFavorites.save();
    if (action === "add") {
      return res.status(200).json({
        message: "Book added to your Favourites",
        favouriteBooks: userFavorites.bookIds,
      });
    } else if (action === "remove") {
      return res.status(200).json({
        message: "Book removed from your Favourite",
        favouriteBooks: userFavorites.bookIds,
      });
    }
  } catch (error) {
    console.error("Error updating favorite books:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getUserFavouriteBooks = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const userFavorites = await favSchema
      .findOne({ userId })
      .populate("bookIds");
    if (!userFavorites) {
      return res
        .status(200)
        .json({ message: "No favorite books found.", favouriteBooks: [] });
    }

    return res.status(200).json({
      message: "User favorite books retrieved successfully.",
      favouriteBooks: userFavorites.bookIds,
    });
  } catch (error) {
    console.error("Error fetching favorite books:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const removeFavouriteBook = async (req, res) => {
  try {
    const { userId, userType, bookId } = req.body;
    let userFavorites = await favSchema.findOne({ userId, userType });

    if (!userFavorites) {
      return res.status(400).json({
        message: "No data found",
      });
    }

    // Ensure comparison is done on the same type
    userFavorites.bookIds = userFavorites.bookIds.filter((id) => {
      return id.toString() !== bookId.toString();
    });

    await userFavorites.save();

    return res.status(200).json({
      message: "Book removed successfully",
      updatedFavorites: userFavorites,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addUserFavouriteBooks,
  getUserFavouriteBooks,
  removeFavouriteBook,
};
