var express = require('express');
var router = express.Router();
var santadeptosModel = require('../../models/santadeptosModel');
const util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);



router.get('/', async function (req, res, next) {

  var santadeptos = await santadeptosModel.getSantadeptos(); //4 registros

  santadeptos = santadeptos.map(santadeptos => {
    if (santadeptos.img_id) {
      const imagen = cloudinary.image(santadeptos.img_id, {
        width: 100,
        height: 100,
        crop: 'fill'
      });
      return {
        ...santadeptos,
        imagen
      }
    } else {
      return {
        ...santadeptos,
        imagen: ''
      }
    }
  });

  res.render('admin/santadeptos', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    santadeptos


  });
});

router.get('/agregar', (req, res, next) => {
  res.render('admin/santadeptosagregar', {
    layout: 'admin/layout'
  }) //cierra render
}); //cierra get

router.post('/agregar', async (req, res, next) => {
  try {

    var img_id = '';
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }


    if (req.body.titulo != "" && req.body.cuerpo != "") {
      await santadeptosModel.insertSantadeptos({
        ...req.body,
        img_id
      });
      res.redirect('/admin/santadeptos')
    } else {
      res.render('admin/santadeptosagregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/santadeptosagregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargó la novedad'
    })
  }
})

/*eliminar una novedad */     
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;  //captura del id


  let depto = await santadeptosModel.getSantadeptosById(id);
  if (depto.img_id) {
    await (destroy(depto.img_id));
  }

  await santadeptosModel.deleteSantadeptosById(id);
  res.redirect('/admin/santadeptos');     

}); //cierra get de eliminar


/*modificar una sola novedad by id */

router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  console.log(req.params.id);
  var depto = await santadeptosModel.getSantadeptosById(id);

  console.log(req.param.id);
  res.render('admin/santadeptosmodificar', {
    layout: 'admin/layout',
    depto
  })

});


router.post('/modificar', async (req, res, next) => {
  try {

    let img_id = req.body.img_original;
    let borrar_img_vieja = false;
    if (req.body.img_delete === "1") {
      img_id = null;
      borrar_img_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja = true;
      }
    }
    if (borrar_img_vieja && req.body.img_original) {
      await (destroy(req.body.img_original));
    }


    var obj = {
      titulo: req.body.titulo,
      cuerpo: req.body.cuerpo,
      img_id
    }


    console.log(obj)
    console.log(req.body.id)


    await santadeptosModel.modificarSantadeptosById(obj, req.body.id);
    res.redirect('/admin/santadeptos');      //cambie esto

  } catch (error) {
    console.log(error)
    res.render('admin/santadeptosmodificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modificó la novedad'
    })
  }
})


module.exports = router;