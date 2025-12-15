import { Router, Request, Response } from 'express';

import { HTTP_STATUS } from '@monorepo/shared';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: [],
    message: 'Users retrieved successfully',
  });
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: { id },
    message: 'User retrieved successfully',
  });
});

export default router;
