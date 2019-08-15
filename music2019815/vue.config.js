const axios = require('axios')
module.exports = {
  devServer: {
    before(app){
      app.get('/api/getDiscList', function (req, res) {
        const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
    }
  }
}

// var apiRouter = express.Router();
// apiRouter.get('',function(req,res){
//      var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
//      axios.get(url,{
//       header: {
//         referer: 'https://c.y.qq.com',
//         host: 'c.y.qq.com'
//       },
//       params: req.query
//      }).then((response) =>{
//       res.json(response.data)
//      }).catch((e)=>{
//       console.log(e)
//     });
// })