'use strict'

var Cuestionario = require('../models/cuestionario');
var controller = {

    saveCuestionario: function (req, res) {
        var cuestionario = new Cuestionario(req.body);
        cuestionario.save((err,emergenciaStored)=>{
            if(err) return res.status(500).send({message:"error"});
            if(!emergenciaStored) return res.status(404).send({message:" no se pudo guardar"});
            return res.status(200).send({emergencia:emergenciaStored});
        });

    },

    getCuestionario: function (req, res) {
      var cuestionario = req.params.id;
      Cuestionario.findById(cuestionario, (err, cuestionario)=>{
         if(err) return res.status(500).send({message:"Error al devolver el departamento"});
         if(!cuestionario) return res.status(404).send({message:"El cuestionarios no existe"});
         return res.status(200).send({cuestionario});
      });
    },
    getCuestionarios: function (req, res) {
        Cuestionario.find({}).exec((err, cuestionarios)=>{
            if(err) return res.status(500).send({message:"Error al devolver los datos"});
            if(!cuestionarios) return res.status(404).send({message:"El cuestionarios no existe"});
            return res.status(200).send({cuestionarios});
        });
    },
    updateCuestionario: function(req,res){
        var cuestionariosId = req.params.id;
        var update = req.body;
        Cuestionario.findByIdAndUpdate(cuestionariosId,update,{new: true}, (err,cuestionarioUpdated)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!cuestionarioUpdated) return res.status(404).send({message:"El departamento no existe para actualizar"});
            return res.status(200).send({cuestionarioUpdated});
        });
    },
    deleteCuestionario: function (req, res) {
        var cuestionarioId = req.params.id;
        Cuestionario.findByIdAndDelete(cuestionarioId,(err,departamentoDeleted)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!departamentoDeleted) return res.status(404).send({message:"El cuestionario no existe para borrar"});
            return res.status(200).send({departamentoDeleted});
        });
    }
};

module.exports = controller;