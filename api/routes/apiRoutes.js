import express from 'express';
import { register, login } from '../controllers/authController.js';
import {
    getAllGoals,
    createGoal,
    updateGoal,
    deleteGoal,
} from '../controllers/goalController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Authentication Routes
router.post('/auth/register', express.json(), async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
          return res.status(400).json({ message: 'Validation Error' });
        }
        await register(req, res);
    } catch (error) {
      console.error("Error in register route:", error);
       res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/auth/login', express.json(), async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: 'Validation Error' });
        }
        await login(req, res);
    } catch (error) {
      console.error("Error in login route:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Goal Routes - Protected with authMiddleware
router.get('/goals', authenticate, async (req, res) => {
    try {
        await getAllGoals(req, res);
    } catch (error) {
      console.error("Error in get goals route:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/goals', authenticate, express.json(), async (req, res) => {
    try {
        if (!req.body.name || !req.body.target || !req.body.unit) {
            return res.status(400).json({ message: 'Validation Error' });
        }
        await createGoal(req, res);
    } catch (error) {
      console.error("Error in create goal route:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/goals/:id', authenticate, express.json(), async (req, res) => {
    try {
        if (!req.body.name || !req.body.target || !req.body.unit) {
            return res.status(400).json({ message: 'Validation Error' });
        }
        await updateGoal(req, res);
    } catch (error) {
      console.error("Error in update goal route:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/goals/:id', authenticate, async (req, res) => {
    try {
        await deleteGoal(req, res);
    } catch (error) {
      console.error("Error in delete goal route:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;