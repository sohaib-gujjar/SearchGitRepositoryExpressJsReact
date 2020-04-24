import express, { Request, Response } from "express";
import * as Service from "../services/git.service";


/**
 * Router Definition
 */

export const gitRouter = express.Router();

// midleware
/**
 * This function comment is middleware for all
 * @route GET /api
 */
gitRouter.use(function (req, res, next) {
  console.log('Time:', Date.now())
  console.log('Request URL:', req.originalUrl)
  next()
});

/**
 * GET repsitories with search term
 * @route GET /api
 */

gitRouter.get("/get/:string", async (req: Request, res: Response) => {
  const str = req.params.string;
  try {
    const item: any = await Service.githubRepository(str);
    res.status(200).send(item);
  } catch (e) {
    res.status(500).send(e.message);
  }
});




/* GET all bookmarked repositories. */
gitRouter.get("/bookmark", async (req: Request, res: Response) => {
  try {
    const items: any = await Service.getAllBookmarkedRepositories();
    res.status(200).send(items);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

/* Bookmark repository. */
gitRouter.post('/bookmark/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const items: any = await Service.createBookmark(id, body);
    
    res.status(200).send(items);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

/* Bookmark repository. */
gitRouter.delete('/bookmark/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const items: any = await Service.reomoveBookmark(id, body);

    res.status(200).send(items);
  } catch (e) {
    res.status(500).send(e.message);
  }
});


/**
 * @swagger
 * models:
 *   User:
 *     id: User
 *     properties:
 *       username:
 *         type: String
 *       password:
 *         type: String    
 */