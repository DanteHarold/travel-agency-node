import { Testimonial } from "../models/Testimoniales.js";
import { Viaje } from "../models/Viaje.js";

const paginaInicio = async (req, res) => {
  //*Consultar 3 viajes del modelo

  const promiseDB = [];

  promiseDB.push(Viaje.findAll({ limit: 3 }));
  promiseDB.push(Testimonial.findAll({ limit: 3 }));

  try {
    const resultado = await Promise.all(promiseDB);

    res.render("inicio", {
      pagina: "Inicio",
      clase: "home",
      viajes: resultado[0],
      testimoniales: resultado[1],
    });
  } catch (e) {
    console.log(e);
  }
};

const paginaNosotros = (req, res) => {
  res.render("nosotros", {
    pagina: "Nosotros",
  });
};

const paginaViajes = async (req, res) => {
  //*Consultar BD

  const viajes = await Viaje.findAll();

  res.render("viajes", {
    pagina: "Proximos Viajes",
    viajes,
  });
};

const paginaTestimoniales = async (req, res) => {
  try {
    const testimoniales = await Testimonial.findAll();

    res.render("testimoniales", {
      pagina: "Testimoniales",
      testimoniales,
    });
  } catch (e) {
    console.log(e);
  }
};

const paginaDetalleViaje = async (req, res) => {
  const { slug } = req.params;
  try {
    const viaje = await Viaje.findOne({
      where: { slug },
    });
    res.render("viaje", {
      pagina: "Información De Viaje",
      viaje,
    });
  } catch (e) {
    console.log(e);
  }
};

export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimoniales,
  paginaDetalleViaje,
};
