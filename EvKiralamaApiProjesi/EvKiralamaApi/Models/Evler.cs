//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EvKiralamaApi.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Evler
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
    
        public virtual Kategori Kategori { get; set; }
    }
}
