import express from 'express';

import { currentUser } from '@phuctickets/common';

const router = express.Router();

router.get('/api/users/currentus', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
