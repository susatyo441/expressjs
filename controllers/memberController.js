exports.get = (req, res) => {
    
      res.json({message:"INI METHOD GET"});

  };
  
  // Create a new user
  exports.post = (req, res) => {
    res.json({message:"INI METHOD POST"});

  };
  
  // Update a user by ID
  exports.path = (req, res) => {
   
      res.json({ message: `ini adalah path nya : ${req.path}` });

  };
  
  // Delete a user by ID
  exports.header = (req, res) => {
    const userAgent = req.headers['user-agent'];
  
    // Menampilkan header User-Agent dalam JSON response
    res.json({ userAgent });
  };