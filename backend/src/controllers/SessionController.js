const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const {id} = request.body;
        
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();
        
        if (!ong) {
            return request.status(400).json("Não existe essa ONG!");
        }

        return response.json(ong);
    }
}