const express = require('express')
const router = express.Router()
const path = require('path');
const Herb = require('../models/Herb')
const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`) 
        //cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);   
    }
})

function checkFileType(file, cb){
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null, true)
    }else{
        cb('Images Only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
})

//GET Herbs List
router.get('/', async (req, res) => {
    try {
        const herbs = await Herb.find() 
        res.json(herbs)
    } catch (err) {
        console.err(err.message)
        res.status(500).send('Server Error')
    }
})

//POST a New Entry
router.post('/', async (req, res) => {
    const { 
        name,
        other,
        description, 
        img, 
        cuisines,
        origin,
        substitutes,
        categories
    } = req.body

    try {

        let herb = await Herb.findOne({ name }) 

        if (herb){
            return res.status(400).json({ msg: 'Herb Already Exists in Database' })
        }

        herb = new Herb ({
            name,
            other,
            description, 
            img, 
            cuisines,
            origin,
            substitutes,
            categories
        })

        await herb.save()
        res.json(herb)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//POST Upload
router.post('/upload', upload.single('img'), (req, res) => {
    res.send(`/${req.file.path}`)
})


//UPDATE an Entry
router.put('/:id', async (req, res) => {

    const { 
        name,
        other,
        description, 
        img, 
        cuisines,
        origin,
        substitutes,
        categories
    } = req.body

    const herbFields = {
        name,
        other,
        description, 
        img, 
        cuisines,
        origin,
        substitutes,
        categories
    }

    try {

        let herb = await Herb.findById(req.params.id)
        if (!herb) return res.status(404).json({msg: 'Herb not found'})

        herb = await Herb.findByIdAndUpdate(
            req.params.id,
            {$set: herbFields},
            {new: true},
        );
     
        res.json(herb)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//DELETE an Entry
router.delete('/:id',async(req, res) => {
    try {
        let herb = await Herb.findById(req.params.id)
    
        if(!herb) return res.status(404).json({ msg: 'Herb Not Found' })
   
        await Herb.findByIdAndRemove(req.params.id)
        res.json({ msg: 'Herb Deleted From Database'})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router
