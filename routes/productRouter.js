const {Router} = require('express');
const {createCategory, updateCategory, getAllCategory, getCategory, deleteCategory} = require('../controllers/productCategoryController');
const {createType, updateType, getAllTypes, getType, deleteType} = require('../controllers/productTypeController');
const {createBrand, updateBrand, getAllBrands, getBrand, deleteBrand} = require('../controllers/productBrandController');
const {auth, adminAuth} = require('../middleware/auth');

const router = Router();

router.get('/', (req, res) => {
  res.json('Hello World!');
});

router.post('/category', auth, adminAuth, createCategory);
router.get('/category', auth, getAllCategory);
router.put('/category/:productId', auth, adminAuth, updateCategory);
router.get('/category/:productId', auth, adminAuth, getCategory);
router.delete('/category/:productId', auth, adminAuth, deleteCategory);


router.post('/type', auth, adminAuth, createType);
router.get('/type', auth, getAllTypes);
router.put('/type/:typeId', auth, adminAuth, updateType);
router.get('/type/:typeId', auth, adminAuth, getType);
router.delete('/type/:typeId', auth, adminAuth, deleteType);

router.post('/brand', auth, adminAuth, createBrand);
router.get('/brand', auth, getAllBrands);
router.put('/brand/:brandId', auth, adminAuth, updateBrand);
router.get('/brand/:brandId', auth, adminAuth, getBrand);
router.delete('/brand/:brandId', auth, adminAuth, deleteBrand);

module.exports = router;