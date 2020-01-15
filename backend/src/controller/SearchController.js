const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response){
        // Buscas todos devs em um raio de 10km
        // filtrar por tecnologias
        const {latitude, longitude, techs} = request.query

        const techs_arrays = parseStringAsArray(techs)

        const devs = await Dev.find({
            techs: {
                $in: techs_arrays
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                }
            }
        })

        return response.json({ devs: devs})
    }
}