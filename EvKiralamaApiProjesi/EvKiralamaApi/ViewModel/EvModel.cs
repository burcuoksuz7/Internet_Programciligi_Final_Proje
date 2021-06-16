using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EvKiralamaApi.ViewModel
{
    public class EvModel
    {
        public int evId { get; set; }
        public decimal evFiyat { get; set; }
        public string evKat { get; set; }
        public string evMetrekare { get; set; }
        public string evOdaSayisi { get; set; }
        public string evIsinma { get; set; }
        public string evBanyoSayisi { get; set; }
        public string evAdres { get; set; }
        public string evEsya { get; set; }
        public string evYas { get; set; }
        public string evGorsel { get; set; }
        public int evKategoriId { get; set; }
        public string evKategoriAd { get; set; }
    }
}