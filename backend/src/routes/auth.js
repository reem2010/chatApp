// routes/auth.js
 import { Router } from 'express';
 import createUser from '../models/userModels';
 import { compare, hash } from 'bcrypt';
 import { sign } from 'jsonwebtoken';
  const router = Router();
router.post("/login", async (req, res) => {
   try {
    const { username, password, email } = req.body;
    const user = await prisma.user.findOne({ username });
    if (!user) {
    return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
    return res.status(401).json({ error: 'Authentication failed' });
       }
    const token = sign({ userId: user._id }, 'your-secret-key', {
    expiresIn: '1h',
    });
    res.status(200).json({ token });
    } catch (error) {
    res.status(500).json({ error: 'Login failed' });
    }
})
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = prisma.user.findOne({ email: email })
        await user.save()
        hashed_pass = await hash(password, 10)
        createUser({ name: username, email: email, password: hashed_pass })
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (err) {
         res.status(500).json({ error: 'Registration failed' });
    }
})
module.exports = router;
