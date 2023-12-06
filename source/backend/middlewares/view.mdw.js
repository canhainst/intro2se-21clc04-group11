import { engine } from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections';

export default function (app) {
  app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'bs4',
    helpers: {
      section: hbs_sections(),
      
    }
  }));
  app.set('view engine', 'hbs');
  app.set('views', 'D:\\Download\\PTUDW-Final-Project-Online-Academy-a77836977fe861a17d5ba6d3366c5e3d946e306b\\views');
}