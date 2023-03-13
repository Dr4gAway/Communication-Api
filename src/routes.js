import { Router } from 'express';
import { insertProjeto, selectProjetos, selectProjeto, updateProjeto, deleteProjeto, searchProjeto} from './controller/Projeto.js';

const router = Router();

router.get('/projeto', selectProjetos);
router.get('/projeto/select/:id', selectProjeto);
router.get('/projeto/pesquisa', searchProjeto);
router.post('/projeto/', insertProjeto);
router.put('/projeto/:id', updateProjeto);
router.delete('/projeto/:id', deleteProjeto);

export default router;