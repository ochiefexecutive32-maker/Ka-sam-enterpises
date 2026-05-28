import express from 'express';
import * as controllers from '../controllers/index.js';

const router = express.Router();

router.get('/', controllers.home);
router.get('/services', controllers.services);
router.get('/projects', controllers.projects);
router.get('/about', controllers.about);
router.get('/contact', controllers.contact);
router.post('/contact', controllers.contact);

export default router;
