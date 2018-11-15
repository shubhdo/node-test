import ModuleController from '../controllers/module';
import passport from 'passport';
module.exports = app => {
    let module = '/module/';
    app.post(`${module}create`, ModuleController.createModule);
    app.post(`${module}edit`, ModuleController.editModule);
    app.post(`${module}delete`, ModuleController.deleteModule);
    app.get(`${module}`, ModuleController.getModule);

};