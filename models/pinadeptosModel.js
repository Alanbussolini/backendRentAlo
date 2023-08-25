var pool = require('./db');

async function getPinadeptos() {
    var query = 'select * from pinadeptos';
    var rows = await pool.query(query);
    return rows;
}

async function insertPinadeptos(obj) {
    try {
        var query = "insert into pinadeptos set ?";
        var rows = await pool.query(query, [obj])
        return rows;

    } catch (error) {
        console.log(error);
        throw error;
    } //cierro catch
} //cierro insert


async function deletePinadeptosById(id) {
    var query = 'delete from pinadeptos where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}


async function getPinadeptosById(id) {
    var query = 'select * from pinadeptos where id= ? ';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

/* modificar datos*/
async function modificarPinadeptosById(obj, id) {
    try {
        var query = 'update pinadeptos set ? where id=?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }

}


module.exports = { getPinadeptos, insertPinadeptos, deletePinadeptosById, getPinadeptosById, modificarPinadeptosById }