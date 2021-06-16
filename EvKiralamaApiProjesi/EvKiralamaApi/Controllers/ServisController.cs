using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EvKiralamaApi.Models;
using EvKiralamaApi.ViewModel;

namespace EvKiralamaApi.Controllers
{
    public class ServisController : ApiController
    {
        Database1Entities db = new Database1Entities();
        SonucModel sonuc = new SonucModel();


        #region Kategori

        [HttpGet]
        [Route("api/kategoriliste")]
        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.Kategori.Select(x => new KategoriModel()
            {
                kategoriId = x.kategoriId,
                kategoriAd = x.kategoriAd
            }).ToList();
            return liste;
        }
        


        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {
            if (db.Kategori.Count(s => s.kategoriAd == model.kategoriAd) > 0)
            {
                sonuc.Islem = false;
                sonuc.Mesaj = "Kategori bilgileri sistemde mevcuttur";
                return sonuc;
            }
            Kategori yeni = new Kategori();
            yeni.kategoriAd = model.kategoriAd;
            db.Kategori.Add(yeni);
            db.SaveChanges();
            sonuc.Islem = true;
            sonuc.Mesaj = "Kategori bilgileri sisteme eklenmiştir.";
            return sonuc;
        }

        [HttpPut]
        [Route("api/kategoriduzenle")]

        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            Kategori kayit = db.Kategori.Where(s => s.kategoriId == model.kategoriId).FirstOrDefault(); 
            if (kayit == null)
            {
                sonuc.Islem = false;
                sonuc.Mesaj = "Kategori bilgileri bulunamadı. Lütfen geçerli bir kategori seçiniz.";
                return sonuc;
            }
            kayit.kategoriAd = model.kategoriAd;
            db.SaveChanges();
            sonuc.Islem = true;
            sonuc.Mesaj = "Kategori bilgileri başarılı bir şekilde düzenlenmiştir.";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kategorisil/{kategoriid}")]
        public SonucModel KategoriSil(int kategoriId)
        {
            Kategori kayit = db.Kategori.Where(s => s.kategoriId == kategoriId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.Islem = false;
                sonuc.Mesaj = "Kategori bilgileri bulunamadı.";
                return sonuc;
            }
            if (db.Evler.Count(s => s.evKategoriId == kategoriId) > 0)
            {
                sonuc.Islem = false;
                sonuc.Mesaj = "Ev kaydı bulunan kategori silinemez. Ev bilgilerini siliniz.";
                return sonuc;
            }
            db.Kategori.Remove(kayit);
            db.SaveChanges();
            sonuc.Islem = true;
            sonuc.Mesaj = "Kategori bilgileri başarılı bir şekilde silindi.";
            return sonuc;
        }

        #endregion

        #region Ev

        [HttpGet]
        [Route("api/evliste")]
        public List<EvModel> UrunListe()
        {
            List<EvModel> liste = db.Evler.Select(x => new EvModel()
            {
                evId = x.evId,
                evFiyat = x.evFiyat,
                evKat = x.evKat,
                evMetrekare = x.evMetrekare,
                evOdaSayisi = x.evOdaSayisi,
                evIsinma = x.evIsinma,
                evBanyoSayisi = x.evBanyoSayisi,
                evAdres = x.evAdres,
                evEsya = x.evEsya,
                evYas = x.evYas,
                evGorsel = x.evGorsel,
                evKategoriId = x.evKategoriId,
                evKategoriAd=x.Kategori.kategoriAd

            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/evlistebykatid/{kategoriId}")]
        public List<EvModel> EvListeByKatId(int kategoriId)
        {
            List<EvModel> liste = db.Evler.Where(s => s.evKategoriId == kategoriId).Select(x => new EvModel()
            {
                evId = x.evId,
                evFiyat = x.evFiyat,
                evKat = x.evKat,
                evMetrekare = x.evMetrekare,
                evOdaSayisi = x.evOdaSayisi,
                evIsinma = x.evIsinma,
                evBanyoSayisi = x.evBanyoSayisi,
                evAdres = x.evAdres,
                evEsya = x.evEsya,
                evYas = x.evYas,
                evGorsel = x.evGorsel,
                evKategoriId = x.evKategoriId
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/kategoribyid/{evId}")]
        public EvModel UrunById(int evId)
        {
            EvModel kayit = db.Evler.Where(s => s.evId == evId).Select(x => new EvModel()
            {
                evId = x.evId,
                evFiyat = x.evFiyat,
                evKat = x.evKat,
                evMetrekare = x.evMetrekare,
                evOdaSayisi = x.evOdaSayisi,
                evIsinma = x.evIsinma,
                evBanyoSayisi = x.evBanyoSayisi,
                evAdres = x.evAdres,
                evEsya = x.evEsya,
                evYas = x.evYas,
                evGorsel = x.evGorsel,
                evKategoriId = x.evKategoriId
            }
            ).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/evekle")]
        public SonucModel EvEkle(EvModel model)
        {
            if (db.Evler.Count(s => s.evAdres == model.evAdres) > 0)
            {
                sonuc.Islem = false;
                sonuc.Mesaj = "Ev ilgili kategoride mevcuttur.";
                return sonuc;
            }
            Evler yeni = new Evler();
            yeni.evFiyat = model.evFiyat;
            yeni.evKat = model.evKat;
            yeni.evMetrekare = model.evMetrekare;
            yeni.evOdaSayisi = model.evOdaSayisi;
            yeni.evIsinma = model.evIsinma;
            yeni.evBanyoSayisi = model.evBanyoSayisi;
            yeni.evAdres = model.evAdres;
            yeni.evEsya = model.evEsya;
            yeni.evYas = model.evYas;
            yeni.evGorsel = model.evGorsel;
            yeni.evKategoriId = model.evKategoriId;
            db.Evler.Add(yeni);
            db.SaveChanges();
            sonuc.Islem = true;
            sonuc.Mesaj = "Ev bilgileri başarılı bir şekilde sisteme eklenmiştir.";
            return sonuc;
        }


       


        [HttpPut]
        [Route("api/evduzenle")]
        public SonucModel EvDuzenle(EvModel model)
        {
            Evler kayit = db.Evler.Where(s => s.evId == model.evId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.Islem = false;
                sonuc.Mesaj = "Girdiğiniz bilgilere ait ev bulunamadı.";
                return sonuc;
            }
            kayit.evFiyat = model.evFiyat;
            kayit.evKat = model.evKat;
            kayit.evMetrekare = model.evMetrekare;
            kayit.evOdaSayisi = model.evOdaSayisi;
            kayit.evIsinma = model.evIsinma;
            kayit.evBanyoSayisi = model.evBanyoSayisi;
            kayit.evAdres = model.evAdres;
            kayit.evEsya = model.evEsya;
            kayit.evYas = model.evYas;
            kayit.evGorsel = model.evGorsel;
            kayit.evKategoriId = model.evKategoriId;
            db.SaveChanges();
            sonuc.Islem = true;
            sonuc.Mesaj = "Ev bilgileri başarılı bir şekilde güncellenmiştir.";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/evsil/{evId}")]
        public SonucModel EvSil(int evId)
        {
            Evler kayit = db.Evler.Where(s => s.evId == evId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.Islem = false;
                sonuc.Mesaj = "Ev bulunamadı.";
                return sonuc;
            }
            db.Evler.Remove(kayit);
            db.SaveChanges();
            sonuc.Islem = true;
            sonuc.Mesaj = "Ev bilgileri sistemden silinmiştir.";
            return sonuc;
        }


        [HttpPost]
        [Route("api/evfotoguncelle")]
        public SonucModel EvFotoGuncelle(EvFotoModel model)
        {
            Evler ev = db.Evler.Where(s => s.evId == model.evId).SingleOrDefault();
            if (ev == null)
            {
                sonuc.Islem = false;
                sonuc.Mesaj = "Kayıt bulunamadı.";
                return sonuc;
            }

            if (ev.evGorsel != "default.jpg")
            {
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + ev.evGorsel);
                if (File.Exists(yol))
                {
                    File.Delete(yol);
                }
            }
            string data = model.gorselData;
            string base64 = data.Substring(data.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgbyte = Convert.FromBase64String(base64);
            string dosyaAdi = ev.evId + model.gorselUzanti.Replace("image/", ".");

            using (var ms = new MemoryStream(imgbyte, 0, imgbyte.Length))
            {
                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + dosyaAdi));
            }
            ev.evGorsel = dosyaAdi;
            db.SaveChanges();
            sonuc.Islem = true;
            sonuc.Mesaj = "Fotoğraf güncellendi.";
            return sonuc;
        }

        #endregion

        #region Müşteri

        [HttpGet]
        [Route("api/uyeliste")]
        public List<UyeModel> UyeListe()
        {
            List<UyeModel> liste = db.Uye.Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                uyeAd = x.uyeAd,
                uyeSoyad = x.uyeSoyad,
                uyeTel = x.uyeTel,
                uyeMail = x.uyeMail,
                uyeParola = x.uyeParola,
                uyeYetki=x.uyeYetki
            }).ToList();
            return liste;
        }


        [HttpGet]
        [Route("api/uyebyid/{uyeId}")]
        public UyeModel UyeById(int uyeId)
        {
            UyeModel kayit = db.Uye.Where(s => s.uyeId == uyeId).Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                uyeAd = x.uyeAd,
                uyeSoyad = x.uyeSoyad,
                uyeTel = x.uyeTel,
                uyeMail = x.uyeMail,
                uyeParola = x.uyeParola,
                uyeYetki = x.uyeYetki
            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/uyeekle")]

        public SonucModel UyeEkle(UyeModel model)
        {
            if (db.Uye.Count(s => s.uyeMail == model.uyeMail) > 0)
            {
                sonuc.Islem = false;
                sonuc.Mesaj = "Üye bilgileri sistemde mevcuttur";
                return sonuc;
            }
            Uye yeni = new Uye();
            yeni.uyeAd = model.uyeAd;
            yeni.uyeSoyad = model.uyeSoyad;
            yeni.uyeTel = model.uyeTel;
            yeni.uyeMail = model.uyeMail;
            yeni.uyeParola = model.uyeParola;
            yeni.uyeYetki = model.uyeYetki;
            db.Uye.Add(yeni);
            db.SaveChanges();

            sonuc.Islem = true;
            sonuc.Mesaj = "Üye bilgileri sisteme eklenmiştir.";
            return sonuc;
        }

        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyeModel model)
        {
            Uye kayit = db.Uye.Where(s => s.uyeId == model.uyeId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.Islem = false;
                sonuc.Mesaj = "Girdiğiniz bilgilere ait üye bilgisi bulunamadı.";
                return sonuc;
            }
            kayit.uyeAd = model.uyeAd;
            kayit.uyeSoyad = model.uyeSoyad;
            kayit.uyeTel = model.uyeTel;
            kayit.uyeMail = model.uyeMail;
            kayit.uyeParola = model.uyeParola;
            kayit.uyeYetki = model.uyeYetki;
            db.SaveChanges();
            sonuc.Islem = true;
            sonuc.Mesaj = "Üye bilgileri başarılı bir şekilde güncellenmiştir.";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/uyesil/{uyeId}")]
        public SonucModel MusteriSil(int uyeId)
        {
            Uye kayit = db.Uye.Where(s => s.uyeId == uyeId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.Islem = false;
                sonuc.Mesaj = "Üye bilgisi bulunamadı.";
                return sonuc;
            }
            db.Uye.Remove(kayit);
            db.SaveChanges();
            sonuc.Islem = true;
            sonuc.Mesaj = "Üye bilgileri sistemden silinmiştir.";
            return sonuc;
        }
        #endregion

        [HttpGet]
        [Route("api/girisyap/{mail}/{sifre}")]
        public UyeModel GirisYap(string mail,string sifre)
        {
            UyeModel uyemodel = db.Uye.Where(s => s.uyeMail == mail && s.uyeParola == sifre).Select(x=>new UyeModel()
            {
                uyeAd=x.uyeAd,
                uyeSoyad=x.uyeSoyad,
                uyeYetki=x.uyeYetki,
                uyeId=x.uyeId
            }).SingleOrDefault();
            if (uyemodel!=null) 
            {
                return uyemodel;
            }

            return null;
        }

    }
}
