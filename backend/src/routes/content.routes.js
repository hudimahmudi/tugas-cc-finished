const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  listContents,
  getContent,
  createContent,
  updateContent,
  deleteContent,
  replaceChecklists,
  createMetricSnapshot,
  authorizeContentFileUpload,
  contentFileUpload,
  saveContentFile,
  downloadContentFile,
} = require('../controllers/content.controller');

router.use(auth);
router.get('/', listContents);
router.post('/', createContent);
router.get('/:id', getContent);
router.put('/:id', updateContent);
router.patch('/:id', updateContent);
router.delete('/:id', deleteContent);
router.put('/:id/checklists', replaceChecklists);
router.post('/:id/metrics', createMetricSnapshot);
router.post('/:id/files/:kind', authorizeContentFileUpload, contentFileUpload.single('file'), saveContentFile);
router.get('/:id/files/:kind', downloadContentFile);

module.exports = router;
