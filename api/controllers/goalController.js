import Goal from '../../models/Goal.js';

const getAllGoals = async (req, res) => {
  try {
    const userId = req.user.userId;
    const goals = await Goal.find({ userId });
    res.status(200).json(goals);
  } catch (error) {
    console.error("Error in getAllGoals controller:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createGoal = async (req, res) => {
    try {
        const { name, target, unit } = req.body;
        const userId = req.user.userId;

        if (!name || typeof name !== 'string' || name.trim() === '' ||
            target === undefined || typeof target !== 'number' ||
            !unit || typeof unit !== 'string' || unit.trim() === '') {
            return res.status(400).json({ message: 'Validation Error' });
        }

        const newGoal = new Goal({
            name,
            target,
            unit,
            userId,
        });

        await newGoal.save();
        res.status(201).json(newGoal);
    } catch (error) {
      console.error("Error in createGoal controller:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, target, unit } = req.body;
        const userId = req.user.userId;

        if (!name || typeof name !== 'string' || name.trim() === '' ||
            target === undefined || typeof target !== 'number' ||
            !unit || typeof unit !== 'string' || unit.trim() === '') {
              return res.status(400).json({ message: 'Validation Error' });
        }

      const goal = await Goal.findOneAndUpdate(
          { _id: id, userId: userId },
          { name, target, unit },
          { new: true }
      );


        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.status(200).json(goal);
    } catch (error) {
      console.error("Error in updateGoal controller:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
      const userId = req.user.userId;

    const goal = await Goal.findOneAndDelete({_id: id, userId: userId});

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error("Error in deleteGoal controller:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getAllGoals, createGoal, updateGoal, deleteGoal };