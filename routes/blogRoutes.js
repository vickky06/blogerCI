const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Blog = mongoose.model('Blog');
const cleanCache = require('../middlewares/cleanCache');

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    const blogs = await Blog
      .find({ _user: req.user.id })
      .cache({ key: req.user.id });
    ////and many more functions like sort, limit result can be added just by creating the function as propery of mongoose.Query.prototype 
    ////the calling method just needs to return "this", post execution.
    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, cleanCache, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
    
  });
};



////////////////*****************DND****************************************** */
 // const redis = require('redis');
    // const redisUrl = 'redis://127.0.0.1:6379';
    // const client = redis.createClient(redisUrl);
    // const util = require('util');
    // client.get = util.promisify(client.get);
    // const cachedBlog = await client.get(req.user.id)
    // if (cachedBlog){
    //   console.log("SERVING FROM CACHE");
    //   return res.send(JSON.parse(cachedBlog));
    // }else{
    //   console.log("SERVING FROM MONGO");
    //   const blogs = await Blog.find({ _user: req.user.id });
    //   res.send(blogs);
    //   client.set(req.user.id,JSON.stringify(blogs));
    // }