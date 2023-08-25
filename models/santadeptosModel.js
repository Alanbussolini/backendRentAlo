var pool = require('./db');

async function getSantadeptos() {
    var query = 'select * from santadeptos';
    var rows = await pool.query(query);
    return rows;
}

async function insertSantadeptos(obj) {
    try {
        var query = "insert into santadeptos set ?";
        var rows = await pool.query(query, [obj])
        return rows;

    } catch (error) {
        console.log(error);
        throw error;
    } //cierro catch
} //cierro insert


async function deleteSantadeptosById(id) {
    var query = 'delete from santadeptos where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}


async function getSantadeptosById(id) {
    var query = 'select * from santadeptos where id= ? ';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

/* modificar datos*/
async function modificarSantadeptosById(obj, id) {
    try {
        var query = 'update santadeptos set ? where id=?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }

}


module.exports = { getSantadeptos, insertSantadeptos, deleteSantadeptosById, getSantadeptosById, modificarSantadeptosById }