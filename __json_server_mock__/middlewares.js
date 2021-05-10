module.exports = (req, res, next) => {
    if(req.method === "POST" && req.path === '/register') {
      if(req.body.name === 'hqb' && req.body.password === '123456') {
          return res.status(200).json({
            name: 'hqb',
            password: '123456',
            token: '123'
          })
      } else {
         return res.status(400).json({message: '用户名或者密码错误'})
      }
    }
    next();
};