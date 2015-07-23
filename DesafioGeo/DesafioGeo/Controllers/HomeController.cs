using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace DesafioGeo.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult DetalheImagem(int imagemId)
        {
            Dribbble.Shots shot = new Dribbble.Shots();
            Dribbble dribbble = new Dribbble();
            shot = dribbble.GetById(imagemId);

            return Json(shot, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CarregaImagemPopular(int paginaId)
        {
            
            List<Dribbble> shot = new List<Dribbble>();
            Dribbble dribbble = new Dribbble();
            shot = dribbble.GetAll(paginaId);

            return Json(shot, JsonRequestBehavior.AllowGet);
        }

    }
}
