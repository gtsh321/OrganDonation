const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('homepage'));
router.get('/login', (req, res) => res.render('login'));
router.get('/recipientForm', (req, res) => res.render('recipientForm'));
router.get('/newDonorRegister', (req, res) => res.render('newDonorRegister'));
router.get('/donorFinalConfirmation', (req, res) => res.render('donorFinalConfirmation'));



module.exports = {
    routes: router
}