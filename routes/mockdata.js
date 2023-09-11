const path = require('path')

const userRoutes = (app, fs) => {

    const ENV_DIR = 'sit'

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
      const subPath = getDataPath(req);
      if(subPath.match(/.(jpg|jpeg|svg|png)/g)) {
        // default content type
        let contentType = 'text/html'

        // extract the extension from the filepath
        let mimeType = path.extname(subPath)

        // load various image types
        switch (mimeType) {
            case '.png': contentType = 'image/png'; break;
            case '.jpg': contentType = 'image/jpg'; break;
            case '.jpeg': contentType = 'image/jpeg'; break;
            case '.svg': contentType = 'image/svg+xml'; break;
            
        }

        const filePath = `./data/${ENV_DIR}/${subPath}`
        fs.readFile(filePath, (error, data) => {
          // stop the execution and send nothing if the requested file path does not exist.
          if (error) return
          
          // otherwise, fetch and show the target image
          res.writeHead(200, { 'Content-Type': contentType })
          res.end(data, 'utf8')
          return
        })
        return;
      }


      const dataPath = `./data/${ENV_DIR}/${subPath}.json`
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          res.send({ message: `Cannot find ${dataPath}` });
          return;
        }

        if(JSON.parse(data).redirect) {
          res.redirect(JSON.parse(data).redirect)
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