
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')
const url = require('url')
const rateLimit = require('express-rate-limit')

const API_BASE_URL = process.env.API_BASE_URL
let cache = apicache.middleware

const limiter = rateLimit({
    windowMS: 10 * 60 * 1000,   //10min
    max: 3
})

router.get('/', limiter, async (req, res) => {  //cache('2 minutes')

    try {
        const params = new URLSearchParams({
            app_id: process.env.API_ID_VALUE,
            app_key: process.env.API_KEY_VALUE,
            ...url.parse(req.url, true).query

        });

        const apiRes = await needle('get', `${API_BASE_URL}?${params}`)
        const data = apiRes.body

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router