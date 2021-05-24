import express from 'express';
import {
    getProducts, 
    getProductById, 
    deleteProduct, 
    createProduct, 
    updateProduct, 
    getTopProduct,
    createProductReview} from "../controlers/productControler.js"
import {protect, admin} from "../middlwware/authMiddleware.js"


const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.get('/top', getTopProduct)
router.route('/:id')
 .get(getProductById)
 .delete(protect, admin, deleteProduct)
 .put(protect, admin, updateProduct)
 router.route('/:id/reviews').post(protect, createProductReview)

export default router;
