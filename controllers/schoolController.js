const pool = require('../db/pool');
const calculateDistance = require('../utils/distance');

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    connection.release();

    res.status(201).json({
      success: true,
      message: 'School added successfully',
      schoolId: result.insertId
    });
  } catch (error) {
    console.error('Add school error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  if (
    isNaN(userLat) || userLat < -90 || userLat > 90 ||
    isNaN(userLon) || userLon < -180 || userLon > 180
  ) {
    return res.status(400).json({
      error: 'Valid latitude and longitude parameters are required'
    });
  }

  try {
    const connection = await pool.getConnection();
    const [schools] = await connection.query('SELECT * FROM schools');
    connection.release();

    const schoolsWithDistance = schools.map(school => ({
      ...school,
      distance: parseFloat(
        calculateDistance(userLat, userLon, school.latitude, school.longitude).toFixed(2)
      )
    }));

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      success: true,
      count: schoolsWithDistance.length,
      userLocation: { latitude: userLat, longitude: userLon },
      schools: schoolsWithDistance
    });
  } catch (error) {
    console.error('List schools error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
