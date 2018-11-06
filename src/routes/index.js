import i18n from 'i18n';
module.exports = app => {

  app.get('', (req, res) => {
    if (req.headers.locale) {
      i18n.setLocale(req, req.headers.locale);
      i18n.setLocale(res, req.headers.locale);
    }

    res.send(req.__('Welcome'));
  });
};