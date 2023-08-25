var express = require('express');
var router = express.Router();
var pinadeptosModel = require('../../models/pinadeptosModel');
const util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);



router.get('/', async function (req, res, next) {

  var pinadeptos = await pinadeptosModel.getPinadeptos(); //4 registros

  pinadeptos = pinadeptos.map(pinadeptos => {
    if (pinadeptos.img_id) {
      const imagen = cloudinary.image(pinadeptos.img_id, {
        width: 100,
        height: 100,
        crop: 'fill'
      });
      return {
        ...pinadeptos,
        imagen
      }
    } else {
      return {
        ...pinadeptos,
        imagen: ''
      }
    }
  });

  res.render('admin/pinadeptos', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    pinadeptos


  });
});

router.get('/agregar', (req, res, next) => {
  res.render('admin/pinadeptosagregar', {
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
      await pinadeptosModel.insertPinadeptos({
        ...req.body,
        img_id
      });
      res.redirect('/admin/pinadeptos')
    } else {
      res.render('admin/pinadeptosagregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/pinadeptosagregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargó la novedad'
    })
  }
})

/*eliminar una novedad */     
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;  //captura del id


  let depto = await pinadeptosModel.getPinadeptosById(id);
  if (depto.img_id) {
    await (destroy(depto.img_id));
  }

  await pinadeptosModel.deletePinadeptosById(id);
  res.redirect('/admin/pinadeptos');     

}); //cierra get de eliminar


/*modificar una sola novedad by id */

router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  console.log(req.params.id);
  var depto = await pinadeptosModel.getPinadeptosById(id);

  console.log(req.param.id);
  res.render('admin/pinadeptosmodificar', {
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


    await pinadeptosModel.modificarPinadeptosById(obj, req.body.id);
    res.redirect('/admin/pinadeptos');      //cambie esto

  } catch (error) {
    console.log(error)
    res.render('admin/pinadeptosmodificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modificó la novedad'
    })
  }
})


module.exports = router;