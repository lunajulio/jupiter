const bcrypt = require('bcrypt');

function login(req, res) {
    res.send('Login Page');
}

function auth(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send('Server error');
        conn.query('SELECT * FROM users WHERE username = ?', [data.username], (err, userdata) => {
            if (err) return res.status(500).send('Server error');
            console.log(userdata);
            if (userdata.length > 0) {
                userdata.forEach(element => {
                    bcrypt.compare(data.password, element.Password, (err, match) => {
                        if (err) return res.status(500).send('Server error');
                        if (match) {
                            res.send({ success: true, message: 'Login successful' });
                        } else {
                            res.send({ success: false, message: 'Invalid credentials' });
                        }
                    });
                });      
            } else {
                res.send({ success: false, message: 'User not registered' });
            }
        });
    });
}

function register(req, res) {
    res.send('Register Page');
}

function storeUser(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send('Server error');
        conn.query('SELECT * FROM users WHERE username = ?', [data.username], (err, userdata) => {
            if (err) return res.status(500).send('Server error');
            if (userdata.length > 0) {
                res.send({ success: false, message: 'User already exists' });
            } else {
                bcrypt.hash(data.password, 12).then(hash => {
                    data.password = hash;
                    conn.query('INSERT INTO users SET ?', [data], (err, rows) => {
                        if (err) return res.status(500).send('Server error');
                        res.send({ success: true, message: 'User registered' });
                    });
                }).catch(err => {
                    res.status(500).send('Server error');
                });
            }
        });
    });
}

module.exports = {
    login,
    auth,
    register,
    storeUser,
};