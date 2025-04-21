module.exports = function (req, res, next) {
    const { name, address, latitude, longitude } = req.body;
  
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Valid school name is required' });
    }
  
    if (!address || typeof address !== 'string' || address.trim() === '') {
      return res.status(400).json({ error: 'Valid address is required' });
    }
  
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
  
    if (isNaN(lat) || lat < -90 || lat > 90) {
      return res.status(400).json({ error: 'Valid latitude is required (between -90 and 90)' });
    }
  
    if (isNaN(lon) || lon < -180 || lon > 180) {
      return res.status(400).json({ error: 'Valid longitude is required (between -180 and 180)' });
    }
  
    req.body.latitude = lat;
    req.body.longitude = lon;
  
    next();
  };
  