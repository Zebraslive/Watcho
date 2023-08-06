
export default (req, res) => {


  
  const userIp = req.headers["x-real-ip"] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const userAgent = req.headers['user-agent'];
  
    res.json({ userIp, userAgent });
  };