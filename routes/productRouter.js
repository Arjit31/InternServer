const {Router} = require('express');
const {createCategory, updateCategory, getAllCategory, getCategory, deleteCategory} = require('../controllers/productCategoryController');
const {createType, updateType, getAllTypes, getType, deleteType} = require('../controllers/productTypeController');
const {createBrand, updateBrand, getAllBrands, getBrand, deleteBrand} = require('../controllers/productBrandController');
const {createProduct, updateProduct, getAllProducts, getProduct, deleteProduct} = require('../controllers/productController');
const {Product} = require('../models/productModel');
const {auth, adminAuth} = require('../middleware/auth');
const multer = require('multer');
const getSchemaFields = require('../utils/getSchemaFields');

const router = Router();
// Configure Multer to store files temporarily on the server
const upload = multer({
  dest: 'temp/', // Temporary folder for storing files
});

const productSchemaFields = getSchemaFields(Product);
const productUploadFields = productSchemaFields.map((field) => ({
  name: field,
  maxCount: field === "productImageId" ? 7 : 1
}));

router.get('/', getAllProducts);
router.post('/', auth, upload.fields(productUploadFields), createProduct);
router.put('/:productId', auth, upload.fields(productUploadFields), updateProduct);
router.get('/:productId', getProduct);
router.delete('/:productId', auth, deleteProduct);

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