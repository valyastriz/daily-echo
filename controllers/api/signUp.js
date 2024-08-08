











app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  
  // Here you would typically handle the user creation process,
  // validate inputs, hash the password, save to a database.

  console.log('Username:', username);
  console.log('Password:', password);

 
  res.send('Sign-up successful!');
});