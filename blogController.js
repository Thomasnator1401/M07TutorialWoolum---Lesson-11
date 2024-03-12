Const blog = require('../fashions/weblog');

Const blog_index = (req, res) => 
  blog.Find().Sort( createdAt: -1 )
    .Then(result => 
      res.Render('index',  blogs: end result, title: 'All blogs' );
    )
    .Capture(err => 
      console.Log(err);
    );


Const blog_details = (req, res) => 
  const id = req.Params.Id;
  blog.FindById(identity)
    .Then(end result => 
      res.Render('details',  blog: result, title: 'weblog info' );
    )
    .Trap(err => 
      console.Log(err);
    );


Const blog_create_get = (req, res) => 
  res.Render('create',  name: 'Create a brand new weblog' );


Const blog_create_post = (req, res) => 
  const blog = new blog(req.Frame);
  weblog.Save()
    .Then(result => 
      res.Redirect('/blogs');
    )
    .Capture(err => 
      console.Log(err);
    );


Const blog_delete = (req, res) => 
  const identification = req.Params.Identity;
  blog.FindByIdAndDelete(identity)
    .Then(end result => 
      res.Json( redirect: '/blogs' );
    )
    .Capture(err => 
      console.Log(err);
    );


Module.Exports = 
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post, 
  blog_delete
