// Render the home page
const buildHome = async (req, res) => {
  res.render("index", {
    title: "Home",
  });
};

export { buildHome };