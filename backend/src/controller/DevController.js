const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

// index, show, store, update, destroy

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs)
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const api_response = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio } = api_response.data

            const techs_arrays = parseStringAsArray(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techs_arrays,
                location,
            })

            // filtrar as conexoes websocket que estão no maximo 10km de distance e
            // que o novo deve tenha as techs filtradas

            const sendSocketMessageTo = findConnections({latitude, longitude}, techs_arrays)

            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }

        return response.json(dev)
    }
}