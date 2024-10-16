const { default: axios } = require('axios');
const express = require('express');
const cors=require('cors')
const router = express.Router()
const apiKey = process.env.API_KEY

router.get("/all-news", async (req, res) => {
    try {
        let pageSize = parseInt(req.query.pageSize) || 40
        let page = parseInt(req.query.page) || 1
        let url = `https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`

        let response = await axios.get(url);
        // console.log(response)

        if (response.data.totalResults > 0) {
            res.json({
                status: 200,
                success: true,
                message: "News data fetched successfully!!",
                data: response.data
            })
        }
        else {
            res.json({
                status: 200,
                success: true,
                message: "No more news to fetch"
            })
        }

    } catch (error) {
        res.json({
            status: 500,
            success: false,
            message: "failed to fetch weather data",
            error: error.message
        })
    }

})

router.options("/top-headlines",cors())
router.get("/top-headlines", async (req, res) => {
    try {
        let pageSize = parseInt(req.query.pageSize) || 20
        let page = parseInt(req.query.page) || 1
        let category=req.query.category || "business"
        let url = `https://newsapi.org/v2/top-headlines?page=${page}&category=${category}&language=en&pageSize=${pageSize}&apiKey=${apiKey}`

        let response = await axios.get(url);

        if (response.data.totalResults > 0) {
            res.json({
                status: 200,
                success: true,
                message: "News data fetched successfully!!",
                data: response.data
            })
        }
        else {
            res.json({
                status: 200,
                success: true,
                message: "No more news to fetch"
            })
        }

    } catch (error) {
        res.json({
            status: 500,
            success: false,
            message: "failed to fetch weather data",
            error: error.message
        })
    }
})



router.options("/country/:iso",cors())
router.get("/country/:iso", async (req, res) => {
    try {
        let pageSize = parseInt(req.query.pageSize) || 20
        let page = parseInt(req.query.page) || 1
        let country=req.params.iso || "in"

        let url=`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
        let response = await axios.get(url);

        if (response.data.totalResults > 0) {
            res.json({
                status: 200,
                success: true,
                message: "News data fetched successfully!!",
                data: response.data
            })
        }
        else {
            res.json({
                status: 200,
                success: true,
                message: "No more news to fetch"
            })
        }

    } catch (error) {
        res.json({
            status: 500,
            success: false,
            message: "failed to fetch weather data",
            error: error.message
        })
    }
})

module.exports = router