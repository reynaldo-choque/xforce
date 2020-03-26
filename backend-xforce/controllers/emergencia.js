'use strict'

var Emergencia = require('../models/emergencia');
var controller = {

    home: function(req, res){
        return res.status(200).send({message: 'Home'})
    },
    saveEmergencia: function (req, res) {
        var emergencia = new Emergencia(req.body);
        emergencia.save((err,emergenciaStored)=>{
            if(err) return res.status(500).send({message:"error"});
            if(!emergenciaStored) return res.status(404).send({message:" no se pudo guardar"});
            return res.status(200).send({emergencia:emergenciaStored});
        });
        // return res.status(200).send({
        //     emergencia: emergencia,
        //     message: "Emergencia creado"
        // })
    },

    getEmergencia: function (req, res) {
      var departamento = req.params.id;
      Emergencia.findById(departamento, (err, departamento)=>{
         if(err) return res.status(500).send({message:"Error al devolver el departamento"});
         if(!departamento) return res.status(404).send({message:"El departamento no existe"});
         return res.status(200).send({departamento});
      });
    },
    getEmergencias: function (req, res) {
        Emergencia.find({}).exec((err, departamentos)=>{
            if(err) return res.status(500).send({message:"Error al devolver los datos"});
            if(!departamentos) return res.status(404).send({message:"El departamento no existe"});
            return res.status(200).send({departamentos});
        });
    },
    updateDepartamento: function(req,res){
        var departamentoId = req.params.id;
        var update = req.body;
        Emergencia.findByIdAndUpdate(departamentoId,update,{new: true}, (err,departamentoUpdated)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!departamentoUpdated) return res.status(404).send({message:"El departamento no existe para actualizar"});
            return res.status(200).send({departamentoUpdated});
        });
    },
    deleteDepartamento: function (req, res) {
        var departamentoId = req.params.id;
        Emergencia.findByIdAndDelete(departamentoId,(err,departamentoDeleted)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!departamentoDeleted) return res.status(404).send({message:"El departamento no existe para borrar"});
            return res.status(200).send({departamentoDeleted});
        });
    }
};

module.exports = controller;