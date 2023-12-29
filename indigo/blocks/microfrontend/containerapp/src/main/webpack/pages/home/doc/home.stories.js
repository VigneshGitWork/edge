import Handlebars from "handlebars/runtime.js";
import header from "../../../components/static/header/header.hbs";
import breadcrumb from "../../../core-components/breadcrumb/standard.hbs";
import carousel from "../../../core-components/carousel/image-slides.hbs";
import footer from "../../../components/static/footer/footer.hbs";
import Home from "../home.hbs";

Handlebars.registerPartial("header/header", header);
Handlebars.registerPartial("breadcrumb/standard", breadcrumb);
Handlebars.registerPartial("carousel/image-slides", carousel);
Handlebars.registerPartial("footer/footer", footer);

// import '../../../site/main.scss';

export default {
  title: "Pages/Home",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
  },
};
  
const TemplateHome = ({ label, ...args }) => Home();
export const Primary = TemplateHome.bind();
