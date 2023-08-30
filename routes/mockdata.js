const userRoutes = (app, fs) => {

    const ENV_DIR = 'uat'

    const getDataPath = (req) => {
      const path1 = req.params['0'].replace('/api/', '');
      const subPaths = path1.split('/').slice(-2);
      var joined = subPaths.join('_').trim('_')
      if( joined.charAt( 0 ) === '_' ){
        joined = joined.slice( 1 );
      }
      return joined;
    }

    app.get('*', (req, res) => {
      const dataPath = `./data/${ENV_DIR}/${getDataPath(req)}.json`
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          res.send({ message: `Cannot find ${dataPath}` });
          return;
        }
  
        res.send(JSON.parse(data));
      });
    });

    app.post('*', (req, res) => {
      const dataPath = `./data/${ENV_DIR}/post_${getDataPath(req)}.json`
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          res.send({ message: `Cannot find ${dataPath}` });
          return;
        }
  
        res.send(JSON.parse(data));
      });
    });

    app.put('*', (req, res) => {
      const dataPath = `./data/${ENV_DIR}/put_${getDataPath(req)}.json`
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          res.send({ message: `Cannot find ${dataPath}` });
          return;
        }
  
        res.send(JSON.parse(data));
      });
    });
    
  };
  
  module.exports = userRoutes;