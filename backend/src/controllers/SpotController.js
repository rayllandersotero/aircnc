const User = require('../models/User')
const Spot = require('../models/Spot')

module.exports = {
    async index(req, res) {
        const { tech } = req.query

        const spot = await Spot.find({ techs: tech })

        res.json(spot)
    },

    async store(req, res) {
        const { company, price, techs } = req.body
        const { filename } = req.file
        const { user_id } = req.headers

        const user = await User.findById(user_id)

        if (!user) {
            res.status(400).json({ error: 'Usuário não está logado ou não existe!' })
        } else {
            const spot = await Spot.create({
                user: user_id,
                thumbnail: filename,
                company,
                price,
                techs: techs.split(',').map(tech => tech.trim())
            })

            await spot.populate('user').execPopulate()

            res.json(spot)
        }
    }
}